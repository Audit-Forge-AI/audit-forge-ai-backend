import * as cheerio from "cheerio";

export function parseHtml(html) {
  const $ = cheerio.load(html);

  return {
    $,

    title: $("title").first().text().trim(),

    metaDescription:
      $('meta[name="description"]').attr("content")?.trim() || "",

    h1:
      $("h1").first().text().trim(),

    canonical:
      $('link[rel="canonical"]').attr("href") || "",

    robots:
      $('meta[name="robots"]').attr("content") || "",

    language:
      $("html").attr("lang") || "",

    images: $("img").length,

    links: $("a[href]").length,

    headings: {
      h1: $("h1").length,
      h2: $("h2").length,
      h3: $("h3").length,
      h4: $("h4").length,
      h5: $("h5").length,
      h6: $("h6").length
    }
  };
}