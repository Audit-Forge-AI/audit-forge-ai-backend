import { getExpectedSchemas } from "./expectedSchemas.js";

export function detectSchemaTypes(schemaData, pageType) {

  const detectedTypes = [];

  schemaData.schemas.forEach((schema) => {

    const type = schema["@type"];

    if (!type) return;

    if (Array.isArray(type)) {

      type.forEach((t) => {

        if (!detectedTypes.includes(t)) {
          detectedTypes.push(t);
        }

      });

    } else {

      if (!detectedTypes.includes(type)) {
        detectedTypes.push(type);
      }

    }

  });

  const expectedSchemas =
    getExpectedSchemas(pageType);

  const missingSchemas =
    expectedSchemas.filter(
      (schema) => !detectedTypes.includes(schema)
    );

  const extraSchemas =
    detectedTypes.filter(
      (schema) => !expectedSchemas.includes(schema)
    );

  const recommendations = [];

  missingSchemas.forEach((schema) => {

    recommendations.push({

      priority: "Medium",

      category: "Schema",

      title: `Missing ${schema}`,

      description:
        `${schema} schema is recommended for ${pageType} pages.`

    });

  });

  // ---------------------------------
  // Professional Scoring
  // ---------------------------------

  const baseScore = 80;

  const penalty =
    missingSchemas.length * 10;

  const bonus =
    Math.min(
      extraSchemas.length * 5,
      15
    );

  const score =
    Math.max(
      0,
      Math.min(
        100,
        baseScore - penalty + bonus
      )
    );

  return {

    score,

    pageType,

    expectedSchemas,

    detectedSchemas: detectedTypes,

    missingSchemas,

    extraSchemas,

    totalSchemas: schemaData.schemas.length,

    recommendations,

    issues: []

  };

}