import { checkAltText } from "./altTextChecker.js";
import { checkHeadingStructure } from "./headingChecker.js";
import { checkAria } from "./ariaChecker.js";
import { checkForms } from "./formChecker.js";
import { checkLandmarks } from "./landmarkChecker.js";

import { calculateAccessibilityScore } from "./accessibilityScore.js";
import { getAccessibilityChecks } from "./accessibility.checks.js";
import { generateAccessibilityRecommendations } from "./accessibility.recommendations.js";

export function analyzeAccessibility(parsed) {
  const report = {
    altText: checkAltText(parsed.$),
    headings: checkHeadingStructure(parsed.$),
    aria: checkAria(parsed.$),
    forms: checkForms(parsed.$),
    landmarks: checkLandmarks(parsed.$)
  };

  report.accessibilityScore =
    calculateAccessibilityScore(report);

  report.checks =
    getAccessibilityChecks(report);

  report.recommendations =
    generateAccessibilityRecommendations(report);

  return report;
}