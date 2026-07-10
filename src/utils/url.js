export function normalizeUrl(input) {
  try {
    let url = input.trim();

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    const parsed = new URL(url);

    parsed.hash = "";

    return parsed.toString();
  } catch {
    return null;
  }
}

export function isValidHttpUrl(url) {
  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:"
    );
  } catch {
    return false;
  }
}