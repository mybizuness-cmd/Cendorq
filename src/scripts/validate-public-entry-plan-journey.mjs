import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const homepagePath = "src/app/page.tsx";
const plansPath = "src/app/plans/page.tsx";
const bestStandardPath = "src/lib/best-of-best-operating-standard.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-entry-plan-journey.mjs";

expect(homepagePath, [
  "AI Engine Readiness",
  "If AI engines cannot understand your business, customers may never get the chance to.",
  "AI-readiness starts with business clarity.",
  "Free Scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
  "Internal keys preserved: deep-review, build-fix, ongoing-control",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Business clarity",
  "Clear facts",
  "Trusted proof",
  "Consistent signals",
  "Reason to choose",
  "Action path",
  "No AI placement promises",
  "Cendorq finds what is weak first without promising rankings, leads, revenue, or AI placement.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(plansPath, [
  "AI readiness plans",
  "AI Readiness Plans",
  "Choose the level of readiness your business is ready for.",
  "Cendorq does not sell random packages.",
  "find the signal, prove the cause, repair the weakness, then keep readiness under control.",
  "Start with the safest evidence path. Move deeper only when the stage fits.",
  "Start Free Scan",
  "See Review",
  "The readiness path",
  "Scan. Review. Repair. Control.",
  "Each plan buys a different depth.",
  "No stage pretends to be another stage.",
  "No guaranteed rankings, leads, revenue, or AI placement.",
  "Every stronger recommendation must be tied to evidence.",
  "Free Scan $0",
  "AI Readiness Review $497",
  "Signal Repair $1,497",
  "Readiness Control $597/mo",
  "Internal keys preserved: deep-review, build-fix, ongoing-control",
  "After purchase access standard",
  "Vault first",
  "Messages mirrored",
  "PDFs gated",
  "After purchase access: vault first, dashboard message mirror, safe PDF delivery gates, verified access, entitlement, release, and document-safety checks.",
  "The right plan is the one the evidence can support.",
  "PLAN_VALUE_SEPARATION_RULES",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(bestStandardPath, [
  "Every customer-facing surface must have one strongest next move",
  "Every plan surface must preserve plan value separation",
  "Every document path must be vault-first or provider-authoritative first",
  "The strongest companies make high-value decisions feel simple without making the system shallow.",
]);

expect(routesChainPath, [validatorPath]);

forbidden(homepagePath, [
  "$300",
  "$750+",
  "$300 mo",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "free full diagnosis",
  "free implementation",
  "free monthly monitoring",
  "Scan. Diagnose. Fix. Control.",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
]);

forbidden(plansPath, [
  "$750+",
  "$300/mo",
  "starting at",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
  "unlimited build fix included",
  "Choose the depth that matches the evidence.",
  "Start with the signal. Pay for deeper work only when the stage fits: Review, Repair, then Control.",
  "The command path",
  "Choose the level of command your business is ready for.",
  "Deep Review / Full Scan",
  "Build Fix / Optimization",
  "Ongoing Control / Monthly",
]);

boundedLength(homepagePath, 18000);
boundedLength(plansPath, 23000);

if (failures.length) {
  console.error("Public entry plan journey validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public entry plan journey validation passed with current AI Engine Readiness homepage, current Plans buyer path, best-of-best plan separation, vault-first after-purchase access, dashboard message mirror, safe PDF gates, and preserved internal plan keys.");

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
