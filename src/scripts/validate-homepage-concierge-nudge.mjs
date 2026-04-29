import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const componentPath = "src/components/public/free-scan-concierge-nudge.tsx";
const homePath = "src/app/page.tsx";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(componentPath, [
  "use client",
  "FreeScanConciergeNudge",
  "cendorq_concierge_dismissed",
  "cendorq_free_scan_started",
  "cendorq_free_scan_completed",
  "DISMISS_SECONDS = 60 * 60 * 24 * 14",
  "STANDARD_DELAY_MS = 18_000",
  "RESUME_DELAY_MS = 6_000",
  "SCROLL_TRIGGER_RATIO = 0.45",
  "NudgeMode = \"start\" | \"resume\" | \"exit\"",
  "Free Scan concierge prompt",
  "aria-live=\"polite\"",
  "Dismiss Free Scan prompt",
  "Want the first read before you spend more?",
  "No full-form popup, no fake urgency, just a focused scan room.",
  "Resume your scan",
  "Start Free Scan",
  "Resume Free Scan",
  "Not now",
  "href=\"/free-check\"",
  "SameSite=Lax",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(homePath, [
  "FreeScanConciergeNudge",
  "@/components/public/free-scan-concierge-nudge",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(componentPath, [
  "localStorage",
  "sessionStorage",
  "setTimeout(() => show(\"start\"), 0",
  "STANDARD_DELAY_MS = 0",
  "dialog",
  "role=\"dialog\"",
  "modal",
  "iframe",
  "form",
  "input",
  "textarea",
  "last chance",
  "limited time",
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "sessionToken",
  "csrfToken",
]);

if (failures.length) {
  console.error("Homepage concierge nudge validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Homepage concierge nudge validation passed.");

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
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
