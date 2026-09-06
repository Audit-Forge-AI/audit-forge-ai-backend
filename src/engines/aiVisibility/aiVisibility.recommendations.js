export function generateAIVisibilityRecommendations(
  report
) {
  return [
    ...report.llmReadability.recommendations,

    ...report.answerability.recommendations,

    ...report.entities.recommendations,

    ...report.semanticStructure.recommendations,

    ...report.citationReadiness.recommendations
  ];
}