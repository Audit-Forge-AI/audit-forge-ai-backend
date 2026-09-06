export function buildSchemaChecks(report) {

  return [

    {

      name: "Schema.org markup detected",

      passed: report.types.totalSchemas > 0,

      score: report.types.score

    },

    {

      name: "Schema validation",

      passed: report.validation.score >= 80,

      score: report.validation.score

    }

  ];

}