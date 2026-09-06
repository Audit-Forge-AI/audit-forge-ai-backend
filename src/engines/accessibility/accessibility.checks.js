export function getAccessibilityChecks(report) {
  return [
    {
      name: "Images have alternative text",
      passed:
        report.altText.issues.length === 0
    },

    {
      name: "Heading hierarchy is valid",
      passed:
        report.headings.issues.length === 0
    },

    {
      name: "Interactive elements have accessible names",
      passed:
        report.aria.issues.length === 0
    },

    {
      name: "Form controls are labelled",
      passed:
        report.forms.issues.length === 0
    },

    {
      name: "Semantic landmarks are present",
      passed:
        report.landmarks.issues.length === 0
    }
  ];
}