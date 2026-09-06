export function classifyPage(parsed) {
  const $ = parsed.$;

  const title = ($("title").text() || "").toLowerCase();

  const h1 = ($("h1").first().text() || "").toLowerCase();

  const description = (
    $('meta[name="description"]').attr("content") || ""
  ).toLowerCase();

  const canonical =
    ($('link[rel="canonical"]').attr("href") || "").toLowerCase();

  const url =
    (
      parsed.finalUrl ||
      parsed.url ||
      canonical
    ).toLowerCase();

  const text =
    `${title} ${h1} ${description}`;

  // Homepage

  if (
    url === "" ||
    url.endsWith("/") ||
    url.match(/^https?:\/\/[^/]+\/?$/)
  ) {
    if (
      text.includes("seo audit") ||
      text.includes("auditforge") ||
      text.includes("free tool") ||
      text.includes("ai visibility")
    ) {
      return "saas";
    }

    return "homepage";
  }

  // FAQ

  if (
    url.includes("/faq") ||
    text.includes("frequently asked questions") ||
    text.includes("faq")
  ) {
    return "faq";
  }

  // Blog

  if (
    url.includes("/blog")
  ) {
    return "blog";
  }

  // Article

  if (
    text.includes("guide") ||
    text.includes("tutorial") ||
    text.includes("learn") ||
    text.includes("what is")
  ) {
    return "article";
  }

  // Product

  if (
    url.includes("/product") ||
    text.includes("buy now") ||
    text.includes("pricing")
  ) {
    return "product";
  }

  // Pricing

  if (
    url.includes("/pricing")
  ) {
    return "pricing";
  }

  // Contact

  if (
    url.includes("/contact")
  ) {
    return "contact";
  }

  // About

  if (
    url.includes("/about")
  ) {
    return "about";
  }

  // Documentation

  if (
    url.includes("/docs") ||
    url.includes("/documentation")
  ) {
    return "documentation";
  }

  // Services

  if (
    url.includes("/service") ||
    url.includes("/services")
  ) {
    return "service";
  }

  return "webpage";
}