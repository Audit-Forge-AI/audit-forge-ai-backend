export function getAIVisibilityChecks(report) {
  return [
    {
      name: "LLM readability",
      passed:
        report.llmReadability.issues.length === 0
    },

    {
      name: "Answerability",
      passed:
        report.answerability.issues.length === 0
    },

    {
      name: "Entity detection",
      passed:
        report.entities.issues.length === 0
    },

    {
      name: "Semantic structure",
      passed:
        report.semanticStructure.issues.length === 0
    },

    {
      name: "Citation readiness",
      passed:
        report.citationReadiness.issues.length === 0
    }
  ];
}