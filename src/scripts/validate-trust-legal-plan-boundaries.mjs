import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const privacyPath = "src/app/privacy/page.tsx";
const termsPath = "src/app/terms/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-trust-legal-plan-boundaries.mjs";

expect(privacyPath, [
  "Privacy should make the customer journey safer and easier to trust.",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "dashboard support",
  "/connect",
  "Do not submit passwords, card numbers, private keys, tokens, or unrelated private evidence.",
  "reasonable safeguards",
  "no online system can honestly guarantee absolute security",
  "Plan-specific data boundaries",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(termsPath, [
  "Clear rules keep the plan path impossible to confuse.",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "dashboard support",
  "/connect",
  "One plan does not silently include another plan's work.",
  "Cendorq does not guarantee revenue, rankings, AI placement, leads, or sales.",
  "Free Scan is the first signal.",
  "Build Fix is scoped implementation",
  "Ongoing Control provides recurring monitoring and monthly decision support.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(privacyPath, [
  "Search Presence OS",
  "Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "/contact",
  "/disclaimer",
  "guarantee absolute security",
  "guaranteed revenue",
  "guaranteed ranking",
  "guaranteed ai placement",
]);

forbidden(termsPath, [
  "Search Presence OS",
  "Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "/contact",
  "/disclaimer",
  "guaranteed revenue",
  "guaranteed ranking",
  "guaranteed ai placement",
  "unlimited build fix included",
  "free full diagnosis",
]);

boundedLength(privacyPath, 17000);
boundedLength(termsPath, 17500);

if (failures.length) {
  console.error("Trust legal plan boundary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Trust legal plan boundary validation passed with current plan names, safe routes, and no stale trust links.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for trust/legal utility standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
