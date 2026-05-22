import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const targetPath = "src/lib/visual-command-device-review-targets.ts";
const protocolPath = "docs/visual-command-device-width-review-protocol.md";
const registerPath = "docs/visual-command-surface-review-register.md";
const failures = [];

expect(targetPath, [
  "VISUAL_COMMAND_DEVICE_WIDTHS",
  "VISUAL_COMMAND_DEVICE_REVIEW_TARGETS",
  "getVisualCommandDeviceReviewTargets",
  "getVisualCommandDeviceReviewWidths",
  "390",
  "430",
  "768",
  "1024",
  "1440",
  "homepage",
  "plans",
  "faq",
  "sample-report",
  "protected-free-scan-report",
  "dashboard-presence-snapshot",
  "Run Free Scan remains the clearest first command.",
  "Free Scan remains the safest starting command when the buyer is unsure.",
  "Start Free Scan remains first in quick links.",
  "Read Free Scan report first remains the dominant mobile hero action.",
  "The protected report preview appears before the paid Review CTA and proof-before-paid-pressure section.",
  "confirm paid CTA does not overpower proof",
]);

expect(protocolPath, [
  "Visual Command Device-Width Review Protocol",
  "390px mobile portrait",
  "430px large mobile portrait",
  "768px tablet portrait",
  "1024px tablet landscape",
  "1440px desktop",
  "proof appears before high-commitment paid action pressure",
  "Protected Free Scan Presence Report `/dashboard/reports/free-scan`",
]);

expect(registerPath, [
  "Visual Command Surface Review Register",
  "Protected Free Scan Presence Report `/dashboard/reports/free-scan`",
  "The hero now points to Read Free Scan report first instead of opening paid Review immediately.",
  "The protected report preview appears before the Proof before paid pressure Review CTA section.",
  "Live screenshots were not captured in this pass.",
  "Do not treat this as final screenshot approval.",
]);

const text = read(targetPath);
const pathMatches = [...text.matchAll(/path: "([^"]+)"/g)].map((match) => match[1]);
for (const requiredPath of ["/", "/plans", "/faq", "/sample-report", "/dashboard/reports/free-scan", "/dashboard"]) {
  if (!pathMatches.includes(requiredPath)) failures.push(`${targetPath} missing route path: ${requiredPath}`);
}

const widthMatches = [...text.matchAll(/requiredWidths: VISUAL_COMMAND_DEVICE_WIDTHS/g)];
if (widthMatches.length !== 6) failures.push(`${targetPath} must assign VISUAL_COMMAND_DEVICE_WIDTHS to all 6 review targets.`);

const keyMatches = [...text.matchAll(/key: "([^"]+)"/g)].map((match) => match[1]);
if (new Set(keyMatches).size !== 6) failures.push(`${targetPath} must contain 6 unique review target keys.`);

if (failures.length) {
  console.error("Visual command device review target validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Visual command device review target validation passed with required widths, routes, capture bands, dominant commands, proof-before-pressure checks, and live review decisions.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
