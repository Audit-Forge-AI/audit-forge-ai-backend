export function detectKeywordStuffing(keywords) {
  return keywords.map((keyword) => {
    let status = "Good";

    if (keyword.density >= 5) {
      status = "Keyword Stuffing";
    } else if (keyword.density >= 3) {
      status = "High";
    }

    return {
      ...keyword,
      status
    };
  });
}