const STOP_WORDS = new Set([
  "the","a","an","and","or","but","if","then","than","that","this","these","those",
  "is","are","was","were","be","been","being",
  "of","to","in","on","at","for","from","with","by","as","it","its","into",
  "you","your","we","our","they","their","he","she","his","her",
  "can","will","would","should","could","may","might","do","does","did",
  "have","has","had","not","no","yes","about","over","under","up","down"
]);

export function extractKeywords(text, limit = 10) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter(word => word.length > 2)
    .filter(word => !STOP_WORDS.has(word));

  const totalWords = words.length;

  const frequency = {};

  for (const word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: Number(((count / totalWords) * 100).toFixed(2))
    }));
}