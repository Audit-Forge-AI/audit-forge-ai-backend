function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");

  if (word.length <= 3) return 1;

  let syllables = word.match(/[aeiouy]{1,2}/g)?.length || 1;

  // Remove silent "e"
  if (word.endsWith("e")) {
    syllables--;
  }

  return Math.max(1, syllables);
}

export function calculateFlesch(text) {
  const sentences = text
    .split(/[.!?]+/)
    .filter(Boolean);

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length || !sentences.length) {
    return 0;
  }

  const syllables = words.reduce(
    (sum, word) => sum + countSyllables(word),
    0
  );

  const score =
    206.835 -
    1.015 * (words.length / sentences.length) -
    84.6 * (syllables / words.length);

  return Number(score.toFixed(1));
}

export function getReadabilityLevel(score) {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Difficult";
}