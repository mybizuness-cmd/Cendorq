import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/app/dashboard/notifications/page.tsx", ["projectCustomerPlatformHandoff", "NOTIFICATION_HANDOFFS", "AI Visibility signal feed", "This feed stays useful by pointing each alert to the safest next surface: proof, access, support status, or secure sign-in.", "Every signal should point to proof, access, status, or safe recovery before it sends the customer deeper.", "Signals should create confidence, not noise.", "handoff.decision", "handoff.surfaceKey", "dashboard-to-notifications", "free-scan-to-notifications", "notifications-to-status", "customerOwned: true", "verifiedAccess: true", "safeProjectionReady: true", "Proof signal", "Access signal", "Support signal", "Security signal"]],
  ["package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-notification-center-handoff-runtime-integration.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Notification center handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification center handoff runtime integration validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
