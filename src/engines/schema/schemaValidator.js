const REQUIRED_FIELDS = {

  Organization: [
    "name",
    "url",
    "logo"
  ],

  WebSite: [
    "name",
    "url"
  ],

  WebPage: [
    "name",
    "url"
  ],

  Article: [
    "headline",
    "author",
    "datePublished"
  ],

  BlogPosting: [
    "headline",
    "author",
    "datePublished"
  ],

  FAQPage: [
    "mainEntity"
  ],

  BreadcrumbList: [
    "itemListElement"
  ],

  Product: [
    "name",
    "image",
    "offers"
  ],

  Person: [
    "name"
  ],

  LocalBusiness: [
    "name",
    "address"
  ]
};

export function validateSchemas(schemaData) {

  const { schemas, errors } = schemaData;

  let score = 100;

  const issues = [];

  const recommendations = [];

  const validation = [];

  // Invalid JSON-LD
  errors.forEach(error => {

    score -= 20;

    issues.push(
      `Invalid JSON-LD block #${error.index}.`
    );

  });

  schemas.forEach((schema, index) => {

    const type = schema["@type"];

    if (!type) {

      score -= 10;

      issues.push(
        `Schema #${index + 1} is missing @type.`
      );

      return;

    }

    const required =
      REQUIRED_FIELDS[type] || [];

    const missing = [];

    required.forEach(field => {

      if (
        schema[field] === undefined ||
        schema[field] === null
      ) {

        missing.push(field);

      }

    });

    if (missing.length) {

      score -= missing.length * 5;

      issues.push(
        `${type} schema is missing: ${missing.join(", ")}`
      );

      recommendations.push(
        `Complete the ${type} schema by adding: ${missing.join(", ")}.`
      );

    }

    validation.push({

      type,

      required,

      missing,

      valid: missing.length === 0

    });

  });

  score = Math.max(score, 0);

  return {

    score,

    validation,

    issues,

    recommendations

  };

}