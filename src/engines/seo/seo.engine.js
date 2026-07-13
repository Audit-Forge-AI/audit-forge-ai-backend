export function runSeoAudit(data) {
  const checks = [];

  // Title
  checks.push({
    id: "title",
    name: "Title Tag",
    passed: data.title.length > 0,
    score: data.title.length > 0 ? 10 : 0,
    value: data.title
  });

  // Title Length
  checks.push({
    id: "title-length",
    name: "Title Length",
    passed: data.title.length >= 30 && data.title.length <= 60,
    score:
      data.title.length >= 30 && data.title.length <= 60 ? 10 : 5,
    value: data.title.length
  });

  // Meta Description
  checks.push({
    id: "meta-description",
    name: "Meta Description",
    passed: data.metaDescription.length > 0,
    score: data.metaDescription.length > 0 ? 10 : 0,
    value: data.metaDescription
  });

  // Description Length
  checks.push({
    id: "meta-description-length",
    name: "Meta Description Length",
    passed:
      data.metaDescription.length >= 120 &&
      data.metaDescription.length <= 160,
    score:
      data.metaDescription.length >= 120 &&
      data.metaDescription.length <= 160
        ? 10
        : 5,
    value: data.metaDescription.length
  });

  // H1
  checks.push({
    id: "h1",
    name: "H1 Tag",
    passed: data.headings.h1 === 1,
    score: data.headings.h1 === 1 ? 10 : 0,
    value: data.headings.h1
  });

  // Canonical
  checks.push({
    id: "canonical",
    name: "Canonical Tag",
    passed: data.canonical.length > 0,
    score: data.canonical.length > 0 ? 10 : 0,
    value: data.canonical
  });

  // HTML Language
  checks.push({
    id: "language",
    name: "HTML Lang",
    passed: data.language.length > 0,
    score: data.language.length > 0 ? 10 : 0,
    value: data.language
  });

  // Internal Links
  checks.push({
    id: "links",
    name: "Links",
    passed: data.links > 0,
    score: data.links > 0 ? 10 : 0,
    value: data.links
  });

  const total = checks.reduce((sum, check) => sum + check.score, 0);

  return {
    score: Math.round(total / checks.length),
    checks
  };
}