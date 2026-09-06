export function analyzeSemanticStructure(parsed) {
  const $ = parsed.$;

  const headings = $("h1,h2,h3,h4,h5,h6").length;
  const paragraphs = $("p").length;
  const lists = $("ul,ol").length;
  const listItems = $("li").length;
  const tables = $("table").length;
  const blockquotes = $("blockquote").length;

  let score = 100;

  const issues = [];
  const recommendations = [];

  if (headings < 3) {
    score -= 15;

    issues.push(
      "Very few headings detected."
    );

    recommendations.push(
      "Use descriptive headings to organize content."
    );
  }

  if (lists === 0) {
    score -= 10;

    issues.push(
      "No bullet or numbered lists detected."
    );

    recommendations.push(
      "Use lists for steps, features and key points."
    );
  }

  if (paragraphs < 5) {
    score -= 10;

    issues.push(
      "Very little structured content."
    );

    recommendations.push(
      "Break content into multiple paragraphs."
    );
  }

  score = Math.max(score, 0);

  return {
    score,

    headings,

    paragraphs,

    lists,

    listItems,

    tables,

    blockquotes,

    issues,

    recommendations
  };
}