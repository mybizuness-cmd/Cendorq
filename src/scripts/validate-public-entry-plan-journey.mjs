import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const legacyPlanLabels = ["AI" + " Readiness Review", "Signal" + " Repair", "Readiness" + " Control"];

const homepagePath = "src/app/page.tsx";
const plansPath = "src/app/plans/page.tsx";
const headerPath = "src/layout/site-header-conversion.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-entry-plan-journey.mjs";

expect(homepagePath, [
  "If AI engines cannot see or understand your business",
  "AI Visibility and Readiness",
  "Visibility shows the gap. Readiness explains the cause.",
  "Start Free Scan",
  "View Plans",
  "AI is becoming the place customers meet you first.",
  "Scan. Review. Repair. Control.",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "focus:outline-none",
]);

expect(headerPath, [
  "Plans",
  "FAQ",
  "Sign in",
  "Start Free Scan",
  "Header keeps Plans, FAQ, Sign in, and Start Free Scan visible.",
]);

expect(plansPath, [
  "Choose the right visibility and readiness depth.",
  "Free Scan shows the first signal.",
  "Deep Review explains the cause.",
  "Build Fix improves the weak point.",
  "Ongoing Control keeps visibility and readiness from drifting.",
  "One path. Four depths.",
  "Cendorq does not guarantee rankings, leads, revenue, or AI placement.",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(homepagePath, [
  ...legacyPlanLabels,
  "$300",
  "$750+",
  "$300 mo",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "free full diagnosis",
  "free implementation",
  "free monthly monitoring",
  "First read",
  "Cause proof",
  "Focused change",
  "Monthly watch",
]);

forbidden(headerPath, [
  ...legacyPlanLabels,
  "AI Readiness\", href: \"/#ai-readiness",
  "/#ai-readiness",
  "Customer journey",
]);

forbidden(plansPath, [
  ...legacyPlanLabels,
  "$750+",
  "$300/mo",
  "starting at",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "unlimited build fix included",
  "Unlock Build Fix",
  "Compare pricing",
  "Diagnose",
]);

boundedLength(homepagePath, 18000);
boundedLength(headerPath, 6500);
boundedLength(plansPath, 18500);

if (failures.length) {
  console.error("Public entry plan journey validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public entry plan journey validation passed with clean homepage, simplified header nav, Free Scan CTA, and current plan names.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for public entry plan journey standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
