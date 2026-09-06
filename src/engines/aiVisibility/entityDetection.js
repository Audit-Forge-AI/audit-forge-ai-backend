const ENTITY_PATTERNS = {
  organization: [
    "company",
    "organization",
    "agency",
    "business"
  ],

  product: [
    "product",
    "tool",
    "software",
    "platform"
  ],

  technology: [
    "javascript",
    "node",
    "react",
    "api",
    "seo",
    "ai"
  ]
};

export function detectEntities(parsed) {
  const body =
    parsed.$("body")
      .text()
      .toLowerCase();

  const entities = {};

  let score = 100;

  const issues = [];

  const recommendations = [];

  Object.entries(ENTITY_PATTERNS)
    .forEach(([type, keywords]) => {

      entities[type] =
        keywords.filter(keyword =>
          body.includes(keyword)
        );

      if (!entities[type].length) {

        score -= 10;

        issues.push(
          `No ${type} entities detected.`
        );
      }
    });

  if (score < 100) {
    recommendations.push(
      "Use clear entity names for brands, products and technologies."
    );
  }

  return {
    score,

    entities,

    issues,

    recommendations
  };
}