import axios from "axios";

import { parseHtml } from "./src/services/parser.service.js";

import { analyzeContent } from "./src/engines/content/content.engine.js";

import { generateContentRecommendations } from "./src/engines/content/content.recommendations.js";

const url = "https://audit-forge-ai.github.io/";

const { data } = await axios.get(url);

const parsed = parseHtml(data);

const report = analyzeContent(parsed, url);

const recommendations = generateContentRecommendations(report);

console.log(
  JSON.stringify(
    {
      report,
      recommendations
    },
    null,
    2
  )
);