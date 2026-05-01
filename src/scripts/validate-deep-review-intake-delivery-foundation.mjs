import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const foundationPath = "src/lib/deep-review-intake-delivery-foundation.ts";
const planValidatorPath = "src/scripts/validate-plan-delivery-orchestration-contracts.mjs";
const failures = [];

expect(foundationPath, [
  "DeepReviewIntakeStage",
  "DeepReviewIntakeDeliveryInput",
  "DeepReviewIntakeDeliveryProjection",
  "projectDeepReviewIntakeDeliveryFoundation",
  "getDeepReviewIntakeDeliveryRules",
  "DEEP_REVIEW_INTAKE_DELIVERY_RULES",
  "payment-required",
  "intake-needed",
  "research-in-progress",
  "report-pending-approval",
  "ready-for-delivery",
]);

expect(foundationPath, [
  "deep-review",
  "Deep Review / Full Scan",
  "deep-review-report",
  "expanded diagnostic questionnaire",
  "full diagnostic report",
  "priority blocker map",
  "confidence-labeled findings",
  "limitations and assumptions section",
  "plan-fit next actions",
]);

expect(foundationPath, [
  "active entitlement",
  "verified email",
  "completed paid intake",
  "research review",
  "release approval",
  "must not request passwords, tokens, private keys, payment details, raw security payloads, or unrestricted private evidence",
  "must not be presented as final before research review and release approval",
  "must not leak through Free Scan, Build Fix, or Ongoing Control without entitlement",
]);

expect(foundationPath, [
  "verified facts",
  "customer-provided context",
  "observed evidence",
  "assumptions",
  "inferences",
  "limitations",
  "recommendations",
  "next actions",
  "unpaidDeliverableLeaked: false",
  "freeScanSubstitute: false",
  "pendingReportPresentedAsFinal: false",
  "customerClaimTreatedAsVerifiedFact: false",
]);

expect(foundationPath, [
  "rawPayloadExposed: false",
  "rawEvidenceExposed: false",
  "rawSecurityPayloadExposed: false",
  "rawBillingDataExposed: false",
  "internalNotesExposed: false",
  "operatorIdentityExposed: false",
  "riskInternalsExposed: false",
  "promptExposed: false",
  "secretExposed: false",
  "tokenExposed: false",
  "unsupportedOutcomePromise: false",
]);

expect(planValidatorPath, [
  "src/lib/deep-review-intake-delivery-foundation.ts",
  "validate-deep-review-intake-delivery-foundation.mjs",
  "projectDeepReviewIntakeDeliveryFoundation",
]);

forbidden(foundationPath, [
  "unpaidDeliverableLeaked: true",
  "freeScanSubstitute: true",
  "pendingReportPresentedAsFinal: true",
  "customerClaimTreatedAsVerifiedFact: true",
  "rawPayloadExposed: true",
  "rawEvidenceExposed: true",
  "rawSecurityPayloadExposed: true",
  "rawBillingDataExposed: true",
  "internalNotesExposed: true",
  "operatorIdentityExposed: true",
  "riskInternalsExposed: true",
  "promptExposed: true",
  "secretExposed: true",
  "tokenExposed: true",
  "unsupportedOutcomePromise: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Deep Review intake delivery foundation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Deep Review intake delivery foundation validation passed.");

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
