export function checkAria($) {
  const interactive = $(
    "button, a, input, select, textarea"
  );

  let totalInteractive = 0;
  let accessibleNames = 0;
  let missingAccessibleNames = 0;

  const issues = [];
  const recommendations = [];

  interactive.each((_, element) => {
    totalInteractive++;

    const tag = element.tagName.toLowerCase();

    const text = $(element).text().trim();

    const value = ($(element).val() || "").toString().trim();

    const ariaLabel =
      ($(element).attr("aria-label") || "").trim();

    const ariaLabelledby =
      ($(element).attr("aria-labelledby") || "").trim();

    if (
      text ||
      value ||
      ariaLabel ||
      ariaLabelledby
    ) {
      accessibleNames++;
    } else {
      missingAccessibleNames++;
    }
  });

  if (missingAccessibleNames > 0) {
    issues.push(
      `${missingAccessibleNames} interactive element(s) lack an accessible name.`
    );

    recommendations.push(
      "Provide visible text, aria-label, or aria-labelledby for interactive elements."
    );
  }

  const score =
    totalInteractive === 0
      ? 100
      : Math.round(
          (accessibleNames / totalInteractive) * 100
        );

  return {
    score,
    totalInteractive,
    accessibleNames,
    missingAccessibleNames,
    issues,
    recommendations
  };
}