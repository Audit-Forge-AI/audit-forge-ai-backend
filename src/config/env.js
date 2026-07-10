import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,

  NODE_ENV: process.env.NODE_ENV || "development",

  USER_AGENT:
    process.env.USER_AGENT ||
    "AuditForge AI Bot (+https://audit-forge-ai.github.io/)",

  REQUEST_TIMEOUT: Number(process.env.REQUEST_TIMEOUT) || 15000,

  MAX_PAGE_SIZE: Number(process.env.MAX_PAGE_SIZE) || 5 * 1024 * 1024,

  RATE_LIMIT_WINDOW: Number(process.env.RATE_LIMIT_WINDOW) || 15,

  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 100,
};