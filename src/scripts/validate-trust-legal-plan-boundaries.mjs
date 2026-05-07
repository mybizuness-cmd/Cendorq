import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const privacyPath = "src/app/privacy/page.tsx";
const termsPath = "src/app/terms/page.tsx";
const disclaimerPath = "src/app/disclaimer/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-trust-legal-plan-boundaries.mjs";

expect(privacyPath, [
  "Market trust privacy",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "dashboard support",
  "/connect",
  "Do not submit passwords, card numbers, private keys, tokens, or unrelated private evidence.",
  "reasonable safeguards",
  "no online system can honestly guarantee absolute security",
  "Command-specific data boundaries",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(termsPath, [
  "Market command terms",
  "Clear rules keep the command path impossible to confuse.",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "dashboard support",
  "/connect",
  "One command depth does not silently include another command depth's work.",
  "Cendorq does not guarantee revenue, rankings, AI placement, leads, or sales.",
  "Free Scan is the first signal.",
  "Build Fix is scoped implementation",
  "Ongoing Control provides recurring monitoring and monthly decision support.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(disclaimerPath, [
  "AI market command disclaimer",
  "Strong guidance works best when the limits are clear.",
  "AI/search visibility is bounded",
  "No guaranteed rankings, AI placement, leads, revenue, sales, or platform treatment.",
  "Use each command for the decision it was built to support.",
  "Use Free Scan as a first signal, not a full diagnosis.",
  "Use Deep Review when the cause matters enough to prove before fixing.",
  "Use Build Fix when a scoped improvement is approved and ready to execute.",
  "Use Ongoing Control when the business needs recurring monitoring, adjustment, and monthly decision support.",
  "/dashboard/support",
  "/connect",
  "No Search Presence OS",
  "No /contact route",
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

forbidden(disclaimerPath, [
  "Search Presence OS",
  "search-presence",
  "Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "/contact",
  "guaranteed ranking.",
  "guaranteed AI placement.",
  "guaranteed leads.",
  "guaranteed revenue.",
  "algorithm control.",
]);

boundedLength(privacyPath, 17000);
boundedLength(termsPath, 17500);
boundedLength(disclaimerPath, 15000);

if (failures.length) {
  console.error("Trust legal AI command boundary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Trust legal AI command boundary validation passed with current plan names, safe routes, no stale trust links, and AI/search no-guarantee posture.");

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
