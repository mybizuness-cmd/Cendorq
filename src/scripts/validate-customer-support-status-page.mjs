import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";

expect("src/lib/customer-platform-route-map.ts", [
  "dashboardSupportStatus",
  "/dashboard/support/status",
  "Support status",
  "support status access requires authenticated customer ownership, session authorization, and customer-safe projection",
]);

expect("src/app/dashboard/support/status/page.tsx", [
  "Support status",
  "noIndex: true",
  "Track support without exposing internal risk.",
  "SupportStatusList",
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
]);

expect("src/components/customer-support/support-status-list.tsx", [
  "SupportStatusList",
  "/api/customer/support/status",
  "Refresh status",
  "customerVisibleStatus",
  "customerSafeStatus",
  "communicationPlan",
  "CustomerSupportCommunicationPlan",
  "Next communication path",
  "CommunicationPlanPanel",
  "Communication decision",
  "Safe channels",
  "Required guards",
  "Open communication path",
  "buildSafeSupportUpdatePath",
  "customerVisibleStatus === \"waiting-on-customer\"",
  "communicationPlan.status === \"waiting-on-customer\"",
  "/dashboard/support/request?update=",
  "Use the safe update path for this request. Cendorq will not ask you to paste rejected raw content again.",
  "Ready to communicate",
  "Protected hold",
  "Suppressed by safety controls",
]);

expect("src/components/customer-support/support-request-update-form.tsx", [
  "SupportRequestUpdateForm",
  "new URL(window.location.href).searchParams.get(\"update\")",
  "/api/customer/support/request/update",
  "Cendorq does not show rejected raw content here and does not ask you to paste sensitive records again.",
]);

expect("src/app/api/customer/support/status/route.ts", [
  "requireCustomerSession",
  "projectSupportStatus",
  "customerVisibleStatus",
  "communicationPlan",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);
expect(ownerMaximumProtectionValidatorPath, ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]);
expect("package.json", ["validate:routes", "validate-customer-support-status-page.mjs", "validate-owner-maximum-protection-posture.mjs"]);

forbidden("src/app/dashboard/support/status/page.tsx", unsafePhrases());
forbidden("src/components/customer-support/support-status-list.tsx", unsafePhrases());

if (failures.length) {
  console.error("Customer support status page validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support status page validation passed with owner posture and package wiring coverage.");

function unsafePhrases() {
  return [
    "dangerouslySetInnerHTML",
    "localStorage",
    "sessionStorage",
    "x-support-admin-key",
    "x-cendorq-customer-context",
    "CUSTOMER_SUPPORT_CONTEXT_KEY",
    "SUPPORT_CONSOLE_READ_KEY",
    "rawPayload=",
    "rawEvidence=",
    "rawSecurityPayload=",
    "rawBillingData=",
    "internalNotes=",
    "operatorId=",
    "operatorIdHash=",
    "riskScoringInternals=",
    "attackerDetails=",
    "adminReadKey=",
    "supportContextKey=",
    "sessionToken=",
    "csrfToken=",
    "console.log",
    "rawRejectedContent",
    "rejectedRawContent",
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
