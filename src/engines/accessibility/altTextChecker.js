export function checkAltText($) {
  const images = $("img");

  const totalImages = images.length;

  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;
  let emptyAlt = 0;

  const issues = [];
  const recommendations = [];

  images.each((_, image) => {
    const alt = ($(image).attr("alt") || "").trim();

    if (!$(image).attr("alt")) {
      imagesWithoutAlt++;
      return;
    }

    if (alt === "") {
      emptyAlt++;
      return;
    }

    imagesWithAlt++;
  });

  if (imagesWithoutAlt > 0) {
    issues.push(
      `${imagesWithoutAlt} image(s) missing alt attributes.`
    );

    recommendations.push(
      "Add descriptive alt text to all informative images."
    );
  }

  if (emptyAlt > 0) {
    issues.push(
      `${emptyAlt} image(s) contain empty alt attributes.`
    );

    recommendations.push(
      "Use empty alt only for decorative images."
    );
  }

  let score = 100;

  if (totalImages > 0) {
    score = Math.round(
      (imagesWithAlt / totalImages) * 100
    );
  }

  return {
    score,

    totalImages,

    imagesWithAlt,

    imagesWithoutAlt,

    emptyAlt,

    issues,

    recommendations
  };
}