export function calculateContentScore(report) {
  let score = 100;

  // Content Length
  if (report.wordCount < 300) {
    score -= 20;
  } else if (report.wordCount < 600) {
    score -= 10;
  }

  // Readability
  if (report.readabilityScore < 30) {
    score -= 20;
  } else if (report.readabilityScore < 50) {
    score -= 10;
  }

  // Image Optimization
  if (
    report.imageCount > 0 &&
    report.imagesWithoutAlt > 0
  ) {
    score -= 10;
  }

  // Duplicate Content
  score -= Math.round(
    (100 - report.duplicateContent.score) * 0.20
  );

  // Link Analysis
  score -= Math.round(
    (100 - report.links.score) * 0.20
  );

  score = Math.max(0, Math.min(100, score));

  let grade = "A";
  let status = "Excellent";

  if (score < 90) {
    grade = "B";
    status = "Good";
  }

  if (score < 75) {
    grade = "C";
    status = "Average";
  }

  if (score < 60) {
    grade = "D";
    status = "Poor";
  }

  if (score < 40) {
    grade = "F";
    status = "Critical";
  }

  return {
    overall: score,
    grade,
    status,
    breakdown: {
      readability: report.readabilityScore,
      duplicateContent:
        report.duplicateContent.score,
      links: report.links.score,
      wordCount: report.wordCount
    }
  };
}