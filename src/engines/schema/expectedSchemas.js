const SCHEMA_MAP = {
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

  webpage: [
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

  faq: [
    "FAQPage",
    "WebPage"
  ],

  product: [
    "Product",
    "Offer",
    "AggregateRating"
  ],

  pricing: [
    "WebPage"
  ],

  about: [
    "AboutPage",
    "Organization"
  ],

  contact: [
    "ContactPage",
    "Organization"
  ],

  documentation: [
    "TechArticle",
    "BreadcrumbList"
  ],

  service: [
    "Service",
    "Organization"
  ]
};

export function getExpectedSchemas(pageType) {
  return SCHEMA_MAP[pageType] || ["WebPage"];
}