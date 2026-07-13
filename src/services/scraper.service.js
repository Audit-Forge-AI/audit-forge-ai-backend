import axios from "axios";
import { env } from "../config/env.js";

export async function fetchPage(url) {
  const response = await axios.get(url, {
    timeout: env.REQUEST_TIMEOUT,
    maxContentLength: env.MAX_PAGE_SIZE,
    headers: {
      "User-Agent": env.USER_AGENT,
      Accept: "text/html,application/xhtml+xml"
    },
    validateStatus: status => status < 400
  });

  return {
    url: response.request?.res?.responseUrl || url,
    status: response.status,
    headers: response.headers,
    html: response.data
  };
}