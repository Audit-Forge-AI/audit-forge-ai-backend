export function generateSchemaRecommendations(report) {

  const recommendations = [];

  recommendations.push(...report.types.recommendations);

  report.validation.recommendations.forEach((item) => {

    recommendations.push({

      priority: "Medium",

      category: "Schema",

      title: "Schema Validation",

      description: item,

      applicable: true

    });

  });

  return recommendations;

}