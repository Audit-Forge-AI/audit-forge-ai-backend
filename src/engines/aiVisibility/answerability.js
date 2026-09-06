export function analyzeAnswerability(parsed) {
  const body = parsed.$("body")
    .text()
    .toLowerCase();

  const questions =
    body.match(/\?/g) || [];

  const headings =
    parsed.$("h1,h2,h3,h4,h5,h6").length;

  const faq =
    parsed.$('[itemtype*="FAQPage"]').length;

  const definitionWords = [
    "what is",
    "how",
    "why",
    "when",
    "where",
    "benefits",
    "advantages"
  ];

  let matches = 0;

  definitionWords.forEach(word => {
    if (body.includes(word)) {
      matches++;
    }
  });

  const issues = [];

  const recommendations = [];

  let score = 100;

  if (matches < 3) {
    score -= 20;

    issues.push(
      "Content answers very few common user questions."
    );

    recommendations.push(
      "Add sections answering What, Why and How questions."
    );
  }

  if (!faq) {
    score -= 10;

    recommendations.push(
      "Consider adding FAQ structured content."
    );
  }

  return {
    score,

    detectedQuestionPatterns: matches,

    questionMarks: questions.length,

    headings,

    faqDetected: faq > 0,

    issues,

    recommendations
  };
}