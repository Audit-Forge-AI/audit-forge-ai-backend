export function calculateSchemaScore(report) {

  // ----------------------------
  // Weight Configuration
  // ----------------------------

  const weights = {

    schemaTypes: 75,

    validation: 25

  };

  // ----------------------------
  // Overall Score
  // ----------------------------

  const overall = Math.round(

    (report.types.score * weights.schemaTypes +

      report.validation.score * weights.validation) /

      100

  );

  // ----------------------------
  // Grade
  // ----------------------------

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

      schemaTypes: report.types.score,

      validation: report.validation.score

    }

  };

}