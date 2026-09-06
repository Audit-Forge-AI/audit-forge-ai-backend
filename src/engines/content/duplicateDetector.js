export function detectDuplicateContent(text = "") {
  if (!text || typeof text !== "string") {
    return {
      score: 100,
      duplicateSentences: 0,
      duplicatePercentage: 0,
      repeated: [],
      issues: []
    };
  }

  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 20);

  const counts = new Map();

  for (const sentence of sentences) {
    counts.set(sentence, (counts.get(sentence) || 0) + 1);
  }

  const repeated = [];
  let duplicateCount = 0;

  for (const [sentence, count] of counts.entries()) {
    if (count > 1) {
      duplicateCount += count - 1;

      repeated.push({
        sentence,
        occurrences: count
      });
    }
  }

  const duplicatePercentage =
    sentences.length === 0
      ? 0
      : Number(((duplicateCount / sentences.length) * 100).toFixed(1));

  let score = 100 - duplicatePercentage * 2;

  score = Math.max(0, Math.round(score));

  const issues = [];

  if (duplicatePercentage > 30) {
    issues.push("High amount of duplicate content detected.");
  } else if (duplicatePercentage > 10) {
    issues.push("Some duplicate content detected.");
  }

  return {
    score,
    duplicateSentences: duplicateCount,
    duplicatePercentage,
    repeated,
    issues
  };
}