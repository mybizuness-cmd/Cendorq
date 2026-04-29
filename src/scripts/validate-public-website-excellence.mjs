import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const homePath = "src/app/page.tsx";
const freeCheckPath = "src/app/free-check/page.tsx";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(homePath, [
  "Business Decision Intelligence",
  "Proof before pressure",
  "FRONT_DOOR_SNAPSHOT",
  "Public website operating snapshot",
  "Starting point",
  "Core question",
  "Output posture",
  "Next path",
  "Truthful and bounded",
  "CENDORQ_SYSTEM_LAYERS",
  "Cendorq system layers",
  "Clarity layer",
  "Trust layer",
  "Choice layer",
  "Action layer",
  "BUSINESS_MODEL_COVERAGE",
  "Built for more than one revenue path.",
  "Creator and social channels",
  "Marketplaces and platform revenue",
  "TRUST_RULES",
  "Trust rules stay visible.",
  "No fake urgency",
  "No unsupported ROI claims",
  "No promise of guaranteed business results",
  "No pressure to buy before the first direction is clear",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(freeCheckPath, [
  "Dedicated scan room",
  "DEDICATED_SCAN_ROOM_DECISION",
  "Free Scan page decision",
  "Primary pattern",
  "Dedicated page",
  "Popup role",
  "Entry only",
  "Focused flow",
  "Proof-led",
  "SCAN_ROOM_STANDARDS",
  "Why this is not a full popup",
  "The scan is important enough to deserve focus.",
  "A small popup can invite someone into the scan, but the actual form should live on this dedicated page.",
  "Visible labels and clear field purpose",
  "Step-by-step progress and recovery",
  "Mobile-friendly spacing and large controls",
  "Customer-safe copy with no fake urgency",
  "No browser-exposed protected secrets",
  "Routeable page that can be resumed or linked from dashboard",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(homePath, blockedPatterns());
forbidden(freeCheckPath, blockedPatterns());

if (failures.length) {
  console.error("Public website excellence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public website excellence validation passed.");

function blockedPatterns() {
  return [
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
    "localStorage",
    "sessionStorage",
  ];
}

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
