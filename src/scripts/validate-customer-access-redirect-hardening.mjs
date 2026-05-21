import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const validatorPath = "src/scripts/validate-customer-access-redirect-hardening.mjs";

expect("src/app/signup/page.tsx", [
  "SAFE_DASHBOARD_PATHS",
  "Signup return paths use the same dashboard allowlist as customer access.",
]);

expect("src/app/api/auth/email/route.ts", [
  "NO_STORE_HEADERS",
  "redirectNoStore",
  "NextResponse.redirect(url, { status: 303 })",
  "X-Robots-Tag",
]);

expect("src/scripts/validate-routes-chain.mjs", [validatorPath]);

if (failures.length) {
  console.error("Customer access redirect hardening validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer access redirect hardening validation passed.");

function expect(path, phrases) {
  const fullPath = join(root, path);
  if (!existsSync(fullPath)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(fullPath, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
