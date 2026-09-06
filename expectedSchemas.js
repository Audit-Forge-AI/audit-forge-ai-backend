const SCHEMAS = {

  homepage: [
    "Organization",
    "WebSite",
    "WebPage"
  ],

  saas: [
    "WebApplication",
    "Organization",
    "WebSite",
    "WebPage"
  ],

  faq: [
    "FAQPage",
    "WebPage"
  ],

  blog: [
    "BlogPosting",
    "Person",
    "BreadcrumbList"
  ],

  article: [
    "Article",
    "Person",
    "BreadcrumbList"
  ],

  product: [
    "Product",
    "Offer",
    "AggregateRating"
  ],

  pricing: [
    "WebPage"
  ],

  contact: [
    "ContactPage",
    "Organization"
  ],

  about: [
    "AboutPage",
    "Organization"
  ],

  documentation: [
    "TechArticle",
    "BreadcrumbList"
  ],

  service: [
    "Service",
    "Organization"
  ],

  webpage: [
    "WebPage"
  ]

};

export function getExpectedSchemas(pageType) {
  return (
    SCHEMAS[pageType] ??
    SCHEMAS.webpage
  );
}