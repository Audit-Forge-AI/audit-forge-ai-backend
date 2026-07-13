import { fetchPage } from "./src/services/scraper.service.js";
import { parseHtml } from "./src/services/parser.service.js";
import { runSeoAudit } from "./src/engines/seo/seo.engine.js";

const page = await fetchPage("https://audit-forge-ai.github.io/");

const parsed = parseHtml(page.html);

const seo = runSeoAudit(parsed);

console.log(JSON.stringify(seo, null, 2));