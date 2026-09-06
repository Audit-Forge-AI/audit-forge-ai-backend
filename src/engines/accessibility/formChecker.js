export function checkForms($) {
  const forms = $("form");

  let totalForms = forms.length;

  let totalInputs = 0;
  let labelledInputs = 0;
  let unlabelledInputs = 0;

  const issues = [];
  const recommendations = [];

  forms.each((_, form) => {
    $(form)
      .find("input, select, textarea")
      .each((_, input) => {
        totalInputs++;

        const id = $(input).attr("id");

        const aria =
          $(input).attr("aria-label") ||
          $(input).attr("aria-labelledby");

        const label =
          id &&
          $(`label[for="${id}"]`).length > 0;

        if (label || aria) {
          labelledInputs++;
        } else {
          unlabelledInputs++;
        }
      });
  });

  if (unlabelledInputs > 0) {
    issues.push(
      `${unlabelledInputs} form control(s) missing labels.`
    );

    recommendations.push(
      "Associate every form control with a label or ARIA label."
    );
  }

  const score =
    totalInputs === 0
      ? 100
      : Math.round(
          (labelledInputs / totalInputs) * 100
        );

  return {
    score,
    totalForms,
    totalInputs,
    labelledInputs,
    unlabelledInputs,
    issues,
    recommendations
  };
}