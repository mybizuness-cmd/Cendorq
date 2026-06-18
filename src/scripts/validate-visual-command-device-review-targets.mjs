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
  "protected-free-scan-report",
  "dashboard-presence-snapshot",
  "Run Free Scan remains the clearest first command.",
  "Free Scan remains the safest starting command when the buyer is unsure.",
  "Run Free Scan remains the first action after answers are clear.",
  "Read Free Scan report first remains the dominant mobile hero action.",
  "The protected report preview appears before the paid Review CTA and proof-before-paid-pressure section.",
  "confirm paid CTA does not overpower proof",
  "Decision Gap, Repair Queue, and Control Snapshot remain distinct.",
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

forbidden(targetPath, ["sample-report", "/sample-report", "Sample Report", "Sample Presence Report"]);

const text = read(targetPath);
const pathMatches = [...text.matchAll(/path: "([^"]+)"/g)].map((match) => match[1]);
for (const requiredPath of ["/", "/plans", "/faq", "/dashboard/reports/free-scan", "/dashboard"]) {
  if (!pathMatches.includes(requiredPath)) failures.push(`${targetPath} missing route path: ${requiredPath}`);
}

const widthMatches = [...text.matchAll(/requiredWidths: VISUAL_COMMAND_DEVICE_WIDTHS/g)];
if (widthMatches.length !== 5) failures.push(`${targetPath} must assign VISUAL_COMMAND_DEVICE_WIDTHS to all 5 review targets.`);

const keyMatches = [...text.matchAll(/key: "([^"]+)"/g)].map((match) => match[1]);
if (new Set(keyMatches).size !== 5) failures.push(`${targetPath} must contain 5 unique review target keys.`);

if (failures.length) {
  console.error("Visual command device review target validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Visual command device review target validation passed with required widths, current public routes, protected report route, and retired sample-report target.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
