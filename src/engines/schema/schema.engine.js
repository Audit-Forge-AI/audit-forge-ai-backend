import { parseSchemas } from "./schemaParser.js";
import { classifyPage } from "./pageClassifier.js";
import { detectSchemaTypes } from "./schemaTypes.js";
import { validateSchemas } from "./schemaValidator.js";
import { calculateSchemaScore } from "./schemaScore.js";
import { buildSchemaChecks } from "./schema.checks.js";
import { generateSchemaRecommendations } from "./schema.recommendations.js";

export function analyzeSchema(parsed) {

  // ----------------------------
  // Parse Schemas
  // ----------------------------

  const schemaData = parseSchemas(parsed);

  // ----------------------------
  // Detect Page Type
  // ----------------------------

  const pageType =
    classifyPage(parsed);

  // ----------------------------
  // Build Report
  // ----------------------------

  const report = {};

  report.rawSchemas =
    schemaData.schemas;

  report.parser = {

    totalSchemas:
      schemaData.totalSchemas,

    invalidSchemas:
      schemaData.invalidSchemas,

    errors:
      schemaData.errors

  };

  report.pageType =
    pageType;

  report.types =
    detectSchemaTypes(
      schemaData,
      pageType
    );

  report.validation =
    validateSchemas(
      schemaData
    );

  report.schemaScore =
    calculateSchemaScore(
      report
    );

  report.checks =
    buildSchemaChecks(
      report
    );

  report.recommendations =
    generateSchemaRecommendations(
      report
    );

  return report;

}