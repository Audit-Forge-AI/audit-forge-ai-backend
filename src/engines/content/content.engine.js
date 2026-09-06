import {
  calculateFlesch,
  getReadabilityLevel
} from "../../utils/readability.js";

import {
  extractKeywords
} from "../../utils/keywords.js";

import {
  detectKeywordStuffing
} from "../../utils/keywordStuffing.js";

import {
  detectDuplicateContent
} from "./duplicateDetector.js";

import {
  analyzeLinks
} from "./linkAnalyzer.js";

import {
  calculateContentScore
} from "./contentScore.js";

export function analyzeContent(parsed, pageUrl = "") {
  const bodyText = parsed.$("body").text().replace(/\s+/g, " ").trim();

  // HTML metrics
  const html = parsed.$.html();

  const htmlSize = html.length;

  const textSize = bodyText.length;

  const textToHtmlRatio =
    htmlSize > 0
      ? Number(((textSize / htmlSize) * 100).toFixed(2))
      : 0;

  const words = bodyText.length
    ? bodyText.split(/\s+/).filter(Boolean)
    : [];

  const sentences = bodyText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const paragraphs = parsed.$("p");

  const images = parsed.$("img");

  const imagesWithAlt = images.filter((_, el) => {
    return parsed.$(el).attr("alt")?.trim();
  }).length;

  const readingTime = Math.max(
    1,
    Math.ceil(words.length / 200)
  );

  // Readability
  const readabilityScore =
    calculateFlesch(bodyText);

  const readabilityLevel =
    getReadabilityLevel(readabilityScore);

  // Keywords
  const topKeywords = detectKeywordStuffing(
    extractKeywords(bodyText)
  );

  // Duplicate Content
  const duplicateContent =
    detectDuplicateContent(bodyText);

  // Link Analysis
  const links =
    analyzeLinks(parsed.$, pageUrl);

  const averageWordsPerSentence =
    sentences.length > 0
      ? Math.round(words.length / sentences.length)
      : 0;

  const averageWordsPerParagraph =
    paragraphs.length > 0
      ? Math.round(words.length / paragraphs.length)
      : 0;

  const longParagraphs = [];

  paragraphs.each((i, el) => {
    const count = parsed.$(el)
      .text()
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    if (count > 120) {
      longParagraphs.push({
        paragraph: i + 1,
        words: count
      });
    }
  });

  const report = {
    wordCount: words.length,

    characterCount: bodyText.length,

    htmlSize,

    textSize,

    textToHtmlRatio,

    readingTime: `${readingTime} min`,

    paragraphCount: paragraphs.length,

    sentenceCount: sentences.length,

    averageWordsPerSentence,

    averageWordsPerParagraph,

    longParagraphs,

    readabilityScore,

    readabilityLevel,

    topKeywords,

    imageCount: images.length,

    imagesWithAlt,

    imagesWithoutAlt:
      images.length - imagesWithAlt,

    duplicateContent,

    links
  };

  report.contentScore =
    calculateContentScore(report);

  return report;
}