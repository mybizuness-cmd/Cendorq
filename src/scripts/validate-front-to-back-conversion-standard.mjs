import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/front-to-back-conversion-standard.ts";
const packagePath = "package.json";

validateTextFile(standardPath, [
  "FRONT_TO_BACK_CONVERSION_RULES",
  "CONVERSION_SURFACE_PASSES",
  "FRONT_TO_BACK_CONVERSION_GUARDS",
  "getFrontToBackConversionStandard",
  "One obvious next step",
  "Value before friction",
  "Free Scan momentum",
  "Dashboard conversion command",
  "Proof-first report selling",
  "Frictionless trustworthy checkout",
  "Email sequence that sells by helping",
  "Strategic conversation conversion",
  "Trust and legal conversion boundary",
  "Measurement without manipulation",
  "Speed is conversion",
  "Front-end conversion pass",
  "Back-end conversion pass",
  "Ethical conversion pass",
  "Optimization feedback pass",
  "primary CTA",
  "secondary proof path",
  "provider signups",
  "dashboard landing",
  "mission-control hero",
  "proof grid",
  "evidence summary",
  "confidence label",
  "clear price",
  "billing portal",
  "Cendorq Support sender",
  "dashboard deep link",
  "objection handling",
  "claim substantiation",
  "visible pricing",
  "privacy-safe payload",
  "experiment owner",
  "fast first action",
  "no quality downgrade",
  "no conversion surface without one clear next step",
  "no CTA without proof, value, or plan-stage logic",
  "no signup friction without explaining the customer benefit",
  "no checkout without transparent entitlement and support path",
  "no email sequence without sender authentication, suppression, and preference controls",
  "no report upsell without evidence, confidence, limitation, and business tie-back",
  "no experiment that tests false claims, hidden terms, fake urgency, or dark patterns",
  "no analytics payload containing private evidence, raw reports, secrets, or sensitive report text",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-front-to-back-conversion-standard.mjs",
]);

validateForbidden(standardPath, [
  "dark pattern allowed",
  "fake urgency allowed",
  "guaranteed outcome allowed",
  "hidden cost allowed",
  "private evidence in analytics allowed",
  "raw report in event allowed",
  "unreviewed legal claim test allowed",
  "lower-quality high-volume mode allowed",
]);

if (failures.length) {
  console.error("Front-to-back conversion standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Front-to-back conversion standard validation passed. Homepage, signup, Free Scan, dashboard, reports, billing, email, conversation, legal trust, measurement, and performance conversion requirements remain proof-first, low-friction, ethical, measurable, and legally controlled.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required front-to-back conversion dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required front-to-back conversion phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden front-to-back conversion phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
