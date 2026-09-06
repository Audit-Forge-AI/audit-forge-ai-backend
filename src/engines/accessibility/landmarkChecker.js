export function checkLandmarks($) {
  const landmarks = {
    header: $("header").length,
    nav: $("nav").length,
    main: $("main").length,
    footer: $("footer").length,
    aside: $("aside").length
  };

  const issues = [];
  const recommendations = [];

  let score = 100;

  if (!landmarks.main) {
    score -= 30;

    issues.push("Missing <main> landmark.");

    recommendations.push(
      "Add a <main> element to identify the primary page content."
    );
  }

  if (!landmarks.nav) {
    score -= 10;

    issues.push("Missing <nav> landmark.");

    recommendations.push(
      "Wrap navigation menus inside a <nav> element."
    );
  }

  if (!landmarks.header) {
    score -= 10;

    issues.push("Missing <header> landmark.");

    recommendations.push(
      "Use a <header> element for the page header."
    );
  }

  if (!landmarks.footer) {
    score -= 10;

    issues.push("Missing <footer> landmark.");

    recommendations.push(
      "Use a <footer> element for page footer information."
    );
  }

  score = Math.max(0, score);

  return {
    score,
    landmarks,
    issues,
    recommendations
  };
}