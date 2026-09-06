export function analyzeLinks($, pageUrl) {
  const anchors = $("a[href]");

  let total = 0;
  let internal = 0;
  let external = 0;
  let nofollow = 0;
  let emptyAnchors = 0;

  const pageHost = (() => {
    try {
      return new URL(pageUrl).hostname;
    } catch {
      return "";
    }
  })();

  anchors.each((_, element) => {
    total++;

    const href = ($(element).attr("href") || "").trim();
    const rel = ($(element).attr("rel") || "").toLowerCase();
    const anchorText = $(element).text().trim();

    if (!anchorText) {
      emptyAnchors++;
    }

    if (rel.includes("nofollow")) {
      nofollow++;
    }

    try {
      let url;

      if (href.startsWith("http://") || href.startsWith("https://")) {
        url = new URL(href);
      } else {
        url = new URL(href, pageUrl);
      }

      if (url.hostname === pageHost) {
        internal++;
      } else {
        external++;
      }
    } catch {
      // Ignore invalid URLs
    }
  });

  const internalRatio =
    total > 0 ? ((internal / total) * 100).toFixed(1) : "0.0";

  const externalRatio =
    total > 0 ? ((external / total) * 100).toFixed(1) : "0.0";

  let score = 100;

  const issues = [];
  const recommendations = [];

  if (internal === 0) {
    score -= 25;
    issues.push("No internal links found.");
    recommendations.push("Add internal links to improve crawlability and user navigation.");
  }

  if (external > internal && total > 5) {
    score -= 10;
    issues.push("More external links than internal links.");
    recommendations.push("Increase internal linking between relevant pages.");
  }

  if (emptyAnchors > 0) {
    score -= 5;
    issues.push(`${emptyAnchors} empty anchor(s) detected.`);
    recommendations.push("Use descriptive anchor text for all links.");
  }

  score = Math.max(0, Math.round(score));

  return {
    score,
    totalLinks: total,
    internalLinks: internal,
    externalLinks: external,
    nofollowLinks: nofollow,
    emptyAnchors,
    internalRatio: `${internalRatio}%`,
    externalRatio: `${externalRatio}%`,
    issues,
    recommendations
  };
}