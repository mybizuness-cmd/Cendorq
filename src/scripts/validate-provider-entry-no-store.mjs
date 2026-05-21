import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const file = "src/app/api/auth/provider/[provider]/route.ts";
const failures = [];

expect(file, [
  "redirectNoStore",
  "NO_STORE_HEADERS",
  "X-Robots-Tag",
  "status: 303",
  "provider-not-ready",
  "unknown-provider",
]);

if (failures.length) {
  console.error("Provider entry no-store validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Provider entry no-store validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
