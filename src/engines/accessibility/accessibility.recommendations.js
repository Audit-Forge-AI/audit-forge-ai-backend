export function generateAccessibilityRecommendations(report) {
  return [
    ...report.altText.recommendations,
    ...report.headings.recommendations,
    ...report.aria.recommendations,
    ...report.forms.recommendations,
    ...report.landmarks.recommendations
  ];
}