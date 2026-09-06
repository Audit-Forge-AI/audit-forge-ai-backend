import {
  analyzeLLMReadability
} from "./llmReadability.js";

import {
  analyzeAnswerability
} from "./answerability.js";

import {
  detectEntities
} from "./entityDetection.js";

import {
  analyzeSemanticStructure
} from "./semanticStructure.js";

import {
  analyzeCitationReadiness
} from "./citationReadiness.js";

import {
  calculateAIVisibilityScore
} from "./aiVisibilityScore.js";

import {
  getAIVisibilityChecks
} from "./aiVisibility.checks.js";

import {
  generateAIVisibilityRecommendations
} from "./aiVisibility.recommendations.js";

export function analyzeAIVisibility(parsed) {

  const report = {

    llmReadability:
      analyzeLLMReadability(parsed),

    answerability:
      analyzeAnswerability(parsed),

    entities:
      detectEntities(parsed),

    semanticStructure:
      analyzeSemanticStructure(parsed),

    citationReadiness:
      analyzeCitationReadiness(parsed)

  };

  report.aiVisibilityScore =
    calculateAIVisibilityScore(report);

  report.checks =
    getAIVisibilityChecks(report);

  report.recommendations =
    generateAIVisibilityRecommendations(report);

  return report;
}