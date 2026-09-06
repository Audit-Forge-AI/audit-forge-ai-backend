export function parseSchemas(parsed) {
  const $ = parsed.$;

  const schemas = [];

  const errors = [];

  $('script[type="application/ld+json"]').each((index, element) => {
    const raw = $(element).html();

    if (!raw) {
      return;
    }

    try {
      const json = JSON.parse(raw);

      processSchema(json);

    } catch (error) {

      errors.push({
        index: index + 1,
        message: error.message
      });

    }
  });

  function processSchema(schema) {

    if (!schema) {
      return;
    }

    // Array of schemas
    if (Array.isArray(schema)) {

      schema.forEach(processSchema);

      return;

    }

    // Google @graph support
    if (
      schema["@graph"] &&
      Array.isArray(schema["@graph"])
    ) {

      schema["@graph"].forEach(processSchema);

      return;

    }

    schemas.push(schema);

  }

  return {

    schemas,

    errors,

    totalSchemas: schemas.length,

    invalidSchemas: errors.length

  };
}