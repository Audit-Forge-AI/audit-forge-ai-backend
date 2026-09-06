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
    (parsed.url || parsed.finalUrl || canonical || "").toLowerCase();

  const text =
    `${title} ${h1} ${description}`.toLowerCase();

  // Homepage

  if (
    url.endsWith("/") &&
    !url.includes("/blog") &&
    !url.includes("/product") &&
    !url.includes("/docs")
  ) {
    return "homepage";
  }

  // SaaS Landing

  if (
    text.includes("free tool") ||
    text.includes("seo audit") ||
    text.includes("audit") ||
    text.includes("platform") ||
    text.includes("software") ||
    text.includes("web application")
  ) {
    return "saas";
  }

  // Blog

  if (
    url.includes("/blog") ||
    text.includes("blog")
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

  // FAQ

  if (
    text.includes("frequently asked questions") ||
    text.includes("faq")
  ) {
    return "faq";
  }

  // Product

  if (
    url.includes("/product") ||
    text.includes("buy now") ||
    text.includes("price")
  ) {
    return "product";
  }

  // Pricing

  if (
    url.includes("/pricing") ||
    text.includes("pricing")
  ) {
    return "pricing";
  }

  // Contact

  if (
    url.includes("/contact") ||
    text.includes("contact us")
  ) {
    return "contact";
  }

  // About

  if (
    url.includes("/about") ||
    text.includes("about us")
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

  // Service

  if (
    url.includes("/service") ||
    url.includes("/services")
  ) {
    return "service";
  }

  return "webpage";
}