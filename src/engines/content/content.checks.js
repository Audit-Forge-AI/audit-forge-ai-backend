export function runContentChecks(report) {
  const checks = [];

  // 1. Content Length
  checks.push({
    id: "word-count",
    name: "Content Length",
    passed: report.wordCount >= 800,
    score: report.wordCount >= 800 ? 10 : 0,
    value: report.wordCount
  });

  // 2. Reading Time
  checks.push({
    id: "reading-time",
    name: "Reading Time",
    passed: report.wordCount >= 400,
    score: report.wordCount >= 400 ? 10 : 5,
    value: report.readingTime
  });

  // 3. Paragraph Count
  checks.push({
    id: "paragraphs",
    name: "Paragraph Count",
    passed: report.paragraphCount >= 5,
    score: report.paragraphCount >= 5 ? 10 : 5,
    value: report.paragraphCount
  });

  // 4. Image Alt Coverage
  checks.push({
    id: "images-alt",
    name: "Image Alt Coverage",
    passed: report.imagesWithoutAlt === 0,
    score: report.imagesWithoutAlt === 0 ? 10 : 0,
    value: {
      total: report.imageCount,
      missing: report.imagesWithoutAlt
    }
  });

  // 5. Long Paragraphs
  checks.push({
    id: "paragraph-length",
    name: "Long Paragraphs",
    passed: report.longParagraphs.length === 0,
    score: report.longParagraphs.length === 0 ? 10 : 5,
    value: report.longParagraphs.length
  });

  // 6. Readability
  checks.push({
    id: "readability",
    name: "Readability",
    passed: report.readabilityScore >= 60,
    score: report.readabilityScore >= 60 ? 10 : 5,
    value: {
      score: report.readabilityScore,
      level: report.readabilityLevel
    }
  });

  // 7. Sentence Length
  checks.push({
    id: "sentence-length",
    name: "Average Sentence Length",
    passed: report.averageWordsPerSentence <= 20,
    score: report.averageWordsPerSentence <= 20 ? 10 : 5,
    value: report.averageWordsPerSentence
  });

  // 8. Thin Content
  checks.push({
    id: "thin-content",
    name: "Thin Content",
    passed: report.wordCount >= 800,
    score: report.wordCount >= 800 ? 10 : 0,
    value: report.wordCount
  });

  // Placeholder for future checks
  checks.push({
    id: "keyword-diversity",
    name: "Keyword Diversity",
    passed: true,
    score: 10,
    value: "Coming Soon"
  });

  checks.push({
    id: "text-html-ratio",
    name: "Text-to-HTML Ratio",
    passed: true,
    score: 10,
    value: "Coming Soon"
  });

  const totalScore = checks.reduce(
    (sum, check) => sum + check.score,
    0
  );

  return {
    score: totalScore,
    checks
  };
}