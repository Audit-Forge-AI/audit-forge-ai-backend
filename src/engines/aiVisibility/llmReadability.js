import {
  calculateFlesch,
  getReadabilityLevel
} from "../../utils/readability.js";

export function analyzeLLMReadability(parsed) {
  const body = parsed.$("body")
    .text()
    .replace(/\s+/g, " ")
    .trim();

  const words = body.length
    ? body.split(/\s+/).filter(Boolean)
    : [];

  const sentences = body
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const paragraphs = parsed.$("p");

  const readabilityScore =
    calculateFlesch(body);

  const readabilityLevel =
    getReadabilityLevel(readabilityScore);

  const averageSentenceLength =
    sentences.length
      ? Math.round(words.length / sentences.length)
      : 0;

  const averageParagraphLength =
    paragraphs.length
      ? Math.round(words.length / paragraphs.length)
      : 0;

  const issues = [];

  const recommendations = [];

  let score = 100;

  if (readabilityScore < 50) {
    score -= 20;

    issues.push(
      "Content is difficult for language models to summarize."
    );

    recommendations.push(
      "Use shorter sentences and simpler language."
    );
  }

  if (averageSentenceLength > 25) {
    score -= 10;

    issues.push(
      "Sentences are too long."
    );

    recommendations.push(
      "Keep most sentences below 25 words."
    );
  }

  if (averageParagraphLength > 120) {
    score -= 10;

    issues.push(
      "Paragraphs are too long."
    );

    recommendations.push(
      "Break large paragraphs into smaller sections."
    );
  }

  score = Math.max(0, score);

  return {
    score,

    readabilityScore,

    readabilityLevel,

    averageSentenceLength,

    averageParagraphLength,

    issues,

    recommendations
  };
}