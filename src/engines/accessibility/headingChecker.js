export function checkHeadingStructure($) {
  const headings = [];

  $("h1, h2, h3, h4, h5, h6").each((_, element) => {
    const tag = element.tagName.toLowerCase();

    headings.push({
      level: Number(tag.substring(1)),
      tag,
      text: $(element).text().trim()
    });
  });

  const h1Count = headings.filter(
    h => h.level === 1
  ).length;

  const issues = [];
  const recommendations = [];

  let skippedLevels = [];

  for (let i = 1; i < headings.length; i++) {
    const previous = headings[i - 1].level;
    const current = headings[i].level;

    if (current > previous + 1) {
      skippedLevels.push({
        from: previous,
        to: current
      });
    }
  }

  if (h1Count === 0) {
    issues.push("No H1 heading found.");

    recommendations.push(
      "Add one descriptive H1 heading to the page."
    );
  }

  if (h1Count > 1) {
    issues.push(`${h1Count} H1 headings detected.`);

    recommendations.push(
      "Use only one H1 heading per page."
    );
  }

  if (skippedLevels.length > 0) {
    issues.push(
      `${skippedLevels.length} skipped heading level(s) detected.`
    );

    recommendations.push(
      "Maintain a logical heading hierarchy without skipping levels."
    );
  }

  let score = 100;

  if (h1Count === 0) {
    score -= 40;
  }

  if (h1Count > 1) {
    score -= 20;
  }

  score -= skippedLevels.length * 10;

  score = Math.max(0, score);

  return {
    score,

    totalHeadings: headings.length,

    h1Count,

    skippedLevels,

    headings,

    issues,

    recommendations
  };
}