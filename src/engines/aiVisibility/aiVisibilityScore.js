export function calculateAIVisibilityScore(report) {
  const scores = [
    report.llmReadability.score,
    report.answerability.score,
    report.entities.score,
    report.semanticStructure.score,
    report.citationReadiness.score
  ];

  const overall = Math.round(
    scores.reduce(
      (sum, value) => sum + value,
      0
    ) / scores.length
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
      llmReadability:
        report.llmReadability.score,

      answerability:
        report.answerability.score,

      entities:
        report.entities.score,

      semanticStructure:
        report.semanticStructure.score,

      citationReadiness:
        report.citationReadiness.score
    }
  };
}