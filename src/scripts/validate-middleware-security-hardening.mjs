import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const middlewarePath = "src/middleware.ts";
const failures = [];

if (!existsSync(join(root, middlewarePath))) {
  failures.push(`Missing middleware file: ${middlewarePath}`);
} else {
  const text = readFileSync(join(root, middlewarePath), "utf8");

  for (const phrase of [
    "safeEqual(currentSessionToken, expectedSessionToken)",
    "safeEqual(accessParam, accessKey)",
    "return safeEqual(token, accessKey);",
    "safeEqual(username, credentials.username) && safeEqual(password, credentials.password)",
    "if (!left || !right || left.length !== right.length) return false;",
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet",
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Vary",
    "Authorization",
    "Cookie",
    "Strict-Transport-Security",
    "sameSite: \"lax\"",
    "httpOnly: true",
  ]) {
    if (!text.includes(phrase)) failures.push(`${middlewarePath} missing required middleware hardening phrase: ${phrase}`);
  }

  for (const phrase of [
    "currentSessionToken === expectedSessionToken",
    "accessParam === accessKey",
    "token === accessKey",
    "username === credentials.username",
    "password === credentials.password",
    "sameSite: \"none\"",
    "httpOnly: false",
    "localStorage",
    "sessionStorage",
  ]) {
    if (text.includes(phrase)) failures.push(`${middlewarePath} contains forbidden middleware hardening phrase: ${phrase}`);
  }
}

if (failures.length) {
  console.error("Middleware security hardening validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Middleware security hardening validation passed with safe secret comparisons, protected noindex/no-store headers, and secure cookie posture.");
