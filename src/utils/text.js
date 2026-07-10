export function cleanText(text = "") {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

export function wordCount(text = "") {
  return cleanText(text)
    .split(" ")
    .filter(Boolean).length;
}

export function truncate(text = "", length = 160) {
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
}