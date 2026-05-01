import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/plan-post-delivery-reconciliation-contracts.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(contractPath, [
  "PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT",
  "Cendorq Post-Delivery Plan Reconciliation Contract",
  "getPlanPostDeliveryReconciliationContract",
  "A second purchase after delivery creates a new entitlement; it does not automatically convert the already-delivered work into an unlimited redo.",
  "scoped reconciliation addendum",
  "protecting the business from unpaid rework",
]);

expect(contractPath, [
  "no-change-needed",
  "minor-alignment-addendum",
  "cendorq-error-correction",
  "material-rework-change-order",
  "future-cycle-application",
  "No change needed",
  "Minor alignment addendum",
  "Cendorq error correction",
  "Material rework / change order",
  "Apply to future cycle",
]);

expect(contractPath, [
  "build-fix-then-deep-review",
  "ongoing-control-then-build-fix",
  "ongoing-control-then-deep-review",
  "deep-review-then-build-fix-after-delay",
  "alignment review against completed Build Fix",
  "future monthly integration guidance",
  "future-cycle application note",
  "freshness check",
]);

expect(contractPath, [
  "Deliver Deep Review fully. Compare it to the completed Build Fix. Provide an alignment addendum if the direction is consistent or minor. If the Deep Review reveals material changes, offer a scoped Build Fix alignment/change order instead of free redo.",
  "Do not redo previously completed monthly cycles unless there was a Cendorq error or the customer buys a retroactive alignment scope.",
  "Prior monthly summaries stand as based on the evidence available at the time unless there was a Cendorq error.",
  "If the business has changed, perform a scoped freshness check before Build Fix",
]);

expect(contractPath, [
  "Never make the customer feel punished for buying the recommended plan later.",
  "Never promise that buying the skipped plan later automatically reopens every previously delivered scope.",
  "Offer a focused alignment scope when new findings materially change previously delivered work.",
  "Use credit or discount language only when strategically approved; do not create automatic discount entitlement.",
]);

expect(contractPath, [
  "Second purchase unlocks the purchased plan, not unlimited re-performance of earlier paid work.",
  "Material redo, reimplementation, or retroactive monthly reconstruction requires a new paid scope unless caused by Cendorq error.",
  "Corrections caused by Cendorq error are handled as corrections, not new revenue opportunities.",
  "A reconciliation addendum may be included to preserve trust, but it must not become a substitute for Build Fix, Deep Review, or Ongoing Control deliverables.",
]);

expect(contractPath, [
  "Every post-delivery second-purchase request must be classified into no-change, minor alignment, Cendorq error correction, material rework, or future-cycle application.",
  "Customer-facing reconciliation must identify what was previously delivered, what the new purchase unlocks, what is included now, what is not included, and the recommended next action.",
  "Release-captain review is required before promising a redo, correction, discount, credit, change order, or retroactive monthly update.",
  "Report vault and dashboard must show entitlements accurately and must not imply a full redo is included unless a new scope or correction record allows it.",
]);

expect(planValidatorPath, [
  "src/lib/plan-post-delivery-reconciliation-contracts.ts",
  "PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT",
  "material-rework-change-order",
  "Release-captain review is required before promising a redo",
]);

forbidden(contractPath, [
  "automatic full redo",
  "unlimited redo is included",
  "free redo",
  "redo everything for free",
  "retroactive monthly redo included",
  "discount entitlement",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "passwords requested",
  "tokens requested",
  "private keys requested",
  "card numbers requested",
  "bank details requested",
  "raw payloads are exposed",
  "customer claims are verified facts",
  "uncontrolled production mutation",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Plan post-delivery reconciliation contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan post-delivery reconciliation contracts validation passed.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
