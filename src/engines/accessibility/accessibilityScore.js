export function calculateAccessibilityScore(report) {
  const scores = [
    report.altText.score,
    report.headings.score,
    report.aria.score,
    report.forms.score,
    report.landmarks.score
  ];

  const overall = Math.round(
    scores.reduce((sum, score) => sum + score, 0) /
    scores.length
  );

  let grade = "A";
  let status = "Excellent";

  if (overall < 90) {
    grade = "B";
    status = "Good";
  }

  if (overall < 75) {
    grade = "C";
    status = "Average";
  }

  if (overall < 60) {
    grade = "D";
    status = "Poor";
  }

  if (overall < 40) {
    grade = "F";
    status = "Critical";
  }

  return {
    overall,
    grade,
    status,
    breakdown: {
      altText: report.altText.score,
      headings: report.headings.score,
      aria: report.aria.score,
      forms: report.forms.score,
      landmarks: report.landmarks.score
    }
  };
}