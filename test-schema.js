import axios from "axios";

import { parseHtml } from "./src/services/parser.service.js";

import { analyzeSchema } from "./src/engines/schema/schema.engine.js";

const url = "https://audit-forge-ai.github.io/";

const { data } = await axios.get(url);

const parsed = parseHtml(data);

const report = analyzeSchema(parsed);

console.log(
  JSON.stringify(report, null, 2)
);