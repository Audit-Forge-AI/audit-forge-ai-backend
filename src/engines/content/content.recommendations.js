export function generateContentRecommendations(report) {
  const recommendations = [];

  // Readability
  if (report.readabilityScore < 60) {
    recommendations.push({
      priority: "High",
      category: "Readability",
      title: "Improve readability",
      description:
        "Use shorter sentences, simpler words, and break long paragraphs into smaller sections."
    });
  }

  // Thin content
  if (report.wordCount < 800) {
    recommendations.push({
      priority: "High",
      category: "Content",
      title: "Increase content length",
      description:
        "Pages with at least 800 words generally provide more comprehensive information."
    });
  }

  // Images
  if (report.imageCount === 0) {
    recommendations.push({
      priority: "Medium",
      category: "Media",
      title: "Add images",
      description:
        "Relevant images improve engagement and can increase time spent on the page."
    });
  }

  // Missing ALT text
  if (report.imagesWithoutAlt > 0) {
    recommendations.push({
      priority: "High",
      category: "Accessibility",
      title: "Add image alt text",
      description:
        "Every image should include descriptive alt text for accessibility and SEO."
    });
  }

  // Long paragraphs
  if (report.longParagraphs.length > 0) {
    recommendations.push({
      priority: "Medium",
      category: "Content",
      title: "Break long paragraphs",
      description:
        "Large blocks of text reduce readability. Split them into smaller paragraphs."
    });
  }

  // Low text-to-HTML ratio
  if (report.textToHtmlRatio < 20) {
    recommendations.push({
      priority: "Medium",
      category: "SEO",
      title: "Increase text-to-HTML ratio",
      description:
        "Consider reducing unnecessary HTML or adding more meaningful textual content."
    });
  }

  // Keyword stuffing
  const stuffedKeywords = report.topKeywords.filter(
    (keyword) => keyword.status === "Keyword Stuffing"
  );

  if (stuffedKeywords.length > 0) {
    recommendations.push({
      priority: "High",
      category: "SEO",
      title: "Reduce keyword repetition",
      description: `Avoid overusing keywords such as ${stuffedKeywords
        .map((k) => `"${k.keyword}"`)
        .join(", ")}.`
    });
  }

  return recommendations;
}