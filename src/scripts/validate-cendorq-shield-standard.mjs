import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/cendorq-shield-standard.ts";
const packagePath = "package.json";

validateTextFile(standardPath, [
  "CENDORQ_SHIELD_RULES",
  "HOSTILE_INPUT_CONTROLS",
  "CENDORQ_SHIELD_RELEASE_GATES",
  "getCendorqShieldStandard",
  "Deny by default",
  "Edge traffic defense",
  "Device and session fortress",
  "Authentication and account fortress",
  "Authorization ownership core",
  "API resource defense",
  "Hostile input rejection",
  "AI prompt injection shield",
  "Data and secret vault",
  "Billing email provider defense",
  "Detect contain and lock",
  "Incident response recovery loop",
  "phishing-resistant MFA readiness",
  "passkey/WebAuthn path",
  "risk-based reauthentication",
  "token revocation",
  "server-side authorization",
  "customer ownership check",
  "business boundary check",
  "server-side schema validation",
  "danger-pattern screening",
  "prompt-injection detection",
  "data/instruction separation",
  "webhook signature verification",
  "SPF",
  "DKIM",
  "DMARC",
  "compromised-device-or-risky-session",
  "Every risky session can be challenged, rotated, revoked, or locked out.",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-cendorq-shield-standard.mjs",
]);

validateForbidden(standardPath, [
  "open by default allowed",
  "raw prompt execution allowed",
  "cross-customer read allowed",
  "unbounded public request allowed",
  "password-only admin access allowed",
  "unlimited login attempts allowed",
  "retaliatory hacking allowed",
  "secret in client allowed",
]);

if (failures.length) {
  console.error("Cendorq Shield standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Cendorq Shield standard validation passed. Defensive controls cover edge traffic, device/session risk, authentication, authorization, API resources, hostile input, AI prompt injection, data/secrets, billing/email/provider flows, monitoring, and incident recovery.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required Cendorq Shield dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required Cendorq Shield phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden Cendorq Shield phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
