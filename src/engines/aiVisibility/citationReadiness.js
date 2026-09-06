export function analyzeCitationReadiness(parsed) {
  const $ = parsed.$;

  const body =
    $("body").text().toLowerCase();

  const externalLinks =
    $('a[href^="http"]').length;

  const hasAuthor =
    body.includes("author");

  const hasAbout =
    body.includes("about");

  const hasContact =
    body.includes("contact");

  const hasPrivacy =
    body.includes("privacy");

  const hasTerms =
    body.includes("terms");

  let score = 100;

  const issues = [];
  const recommendations = [];

  if (externalLinks < 2) {
    score -= 20;

    issues.push(
      "Very few external references."
    );

    recommendations.push(
      "Reference authoritative sources where appropriate."
    );
  }

  if (!hasAuthor) {
    score -= 10;

    recommendations.push(
      "Include author information."
    );
  }

  if (!hasAbout) {
    score -= 5;

    recommendations.push(
      "Provide an About section."
    );
  }

  if (!hasContact) {
    score -= 5;

    recommendations.push(
      "Provide contact information."
    );
  }

  return {
    score,

    externalLinks,

    hasAuthor,

    hasAbout,

    hasContact,

    hasPrivacy,

    hasTerms,

    issues,

    recommendations
  };
}