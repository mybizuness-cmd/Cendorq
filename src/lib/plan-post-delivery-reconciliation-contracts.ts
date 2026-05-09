export const PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT = {
  id: "plan-post-delivery-reconciliation-contract",
  name: "Cendorq Post-Delivery Plan Reconciliation Contract",
  purpose:
    "Define the safest and highest-value way to handle customers who buy a previously recommended plan after Cendorq has already delivered the plan they originally purchased, including requests to redo prior work using the newly purchased prerequisite, while preserving entitlement boundaries, dashboard-message continuity, report-vault truth, safe PDF delivery, and release-captain review.",
  operatingStandard: [
    "A second purchase after delivery creates a new entitlement; it does not automatically convert the already-delivered work into an unlimited redo.",
    "Cendorq should honor the second purchase fully by delivering the newly purchased plan's included artifacts and by reviewing how the new findings relate to previously delivered work.",
    "Cendorq may provide a scoped reconciliation addendum that explains what changes, what still stands, what is newly clarified, and whether prior delivery needs no change, minor alignment, correction, or new paid scope.",
    "Cendorq must preserve customer trust by acknowledging the second purchase while protecting the business from unpaid rework, duplicate fulfillment, unsafe PDF delivery, and plan-boundary loopholes.",
    "Customer-facing language must be calm, educational, category-defining, and clear: the prior delivery was completed under the prior entitlement and available evidence; the new purchase unlocks deeper context going forward.",
    "Every reconciliation email must mirror into the dashboard and every reconciliation document or PDF must match report-vault state without becoming a separate source of truth.",
  ],
  reconciliationOutcomes: [
    {
      key: "no-change-needed",
      name: "No change needed",
      rule: "The newly purchased report confirms or does not materially alter the earlier delivery. Provide a concise alignment note and continue the next best path.",
      included: true,
      customerMessage: "The new analysis supports the original direction, so no redo is needed. We will use the new report to guide future decisions.",
    },
    {
      key: "minor-alignment-addendum",
      name: "Minor alignment addendum",
      rule: "The new purchase clarifies wording, priority, or explanation without requiring material rework. Provide a small addendum, dashboard message, or report-vault note when appropriate.",
      included: true,
      customerMessage: "The new analysis adds useful context. We can align the explanation without reopening the entire completed scope.",
    },
    {
      key: "cendorq-error-correction",
      name: "Cendorq error correction",
      rule: "If Cendorq made a factual, projection, entitlement, document-delivery, or delivery error, correct the affected customer-facing output without using the correction as an upsell.",
      included: true,
      customerMessage: "We found a correction that should be made. We will correct the affected output and preserve the audit record.",
    },
    {
      key: "material-rework-change-order",
      name: "Material rework / change order",
      rule: "If the newly purchased plan reveals materially different direction requiring redoing delivered repair, implementation, monthly scope, or production work, create a new approved scope, discounted alignment offer, or paid change order rather than free rework.",
      included: false,
      customerMessage: "The new analysis changes the recommended direction enough that it becomes a new work scope. We can prepare a focused alignment scope instead of reopening the completed work for free.",
    },
    {
      key: "future-cycle-application",
      name: "Apply to future cycle",
      rule: "For Readiness Control, new findings may be applied to the next monthly cycle when they fit the active monthly scope, without retroactively redoing previously completed cycles.",
      included: true,
      customerMessage: "We will apply the new findings to the next monthly command cycle where they fit the active scope.",
    },
  ],
  planPairRules: [
    {
      key: "signal-repair-then-ai-readiness-review",
      customerPath: "Customer bought Signal Repair, received delivery, then buys AI Readiness Review and asks to redo Signal Repair.",
      rule: "Deliver AI Readiness Review fully. Compare it to the completed Signal Repair. Provide an alignment addendum if the direction is consistent or minor. If the AI Readiness Review reveals material changes, offer a scoped Signal Repair alignment/change order instead of free redo.",
      includedWithSecondPurchase: ["AI Readiness Review report", "alignment review against completed Signal Repair", "dashboard-message mirror", "minor explanation addendum when appropriate"],
      notIncludedWithSecondPurchase: ["full Signal Repair redo", "new implementation package", "unlimited revisions", "new production changes"],
    },
    {
      key: "readiness-control-then-signal-repair",
      customerPath: "Customer bought Readiness Control, received monthly outputs, then buys Signal Repair and asks to redo prior monthly recommendations.",
      rule: "Deliver Signal Repair scope. Use new implementation work to improve future monthly cycles. Do not redo previously completed monthly cycles unless there was a Cendorq error or the customer buys a retroactive alignment scope.",
      includedWithSecondPurchase: ["Signal Repair artifacts", "future monthly integration guidance", "dashboard-message mirror", "minor active-cycle alignment when in scope"],
      notIncludedWithSecondPurchase: ["retroactive monthly cycle redo", "unlimited monitoring rewrite", "unpaid historical reporting changes"],
    },
    {
      key: "readiness-control-then-ai-readiness-review",
      customerPath: "Customer bought Readiness Control, received monthly outputs, then buys AI Readiness Review and asks to redo monthly command using the deeper review.",
      rule: "Deliver AI Readiness Review and apply findings to future Readiness Control cycles. Prior monthly summaries stand as based on the evidence available at the time unless there was a Cendorq error.",
      includedWithSecondPurchase: ["AI Readiness Review report", "future-cycle application note", "dashboard-message mirror", "active-scope alignment guidance"],
      notIncludedWithSecondPurchase: ["retroactive monthly redo", "free Signal Repair work", "unpaid implementation package"],
    },
    {
      key: "ai-readiness-review-then-signal-repair-after-delay",
      customerPath: "Customer bought AI Readiness Review, received report, later buys Signal Repair and wants implementation based on the report.",
      rule: "Use the existing AI Readiness Review as the foundation if still current. If the business has changed, perform a scoped freshness check before Signal Repair; major new discovery becomes updated review scope or Readiness Control opportunity.",
      includedWithSecondPurchase: ["Signal Repair intake", "scope confirmation", "freshness check", "implementation-ready plan", "dashboard-message mirror"],
      notIncludedWithSecondPurchase: ["new full AI Readiness Review report unless purchased", "unlimited updated research", "out-of-scope implementation"],
    },
  ],
  customerExperienceRules: [
    "Never make the customer feel punished for buying the recommended plan later.",
    "Never promise that buying the skipped plan later automatically reopens every previously delivered scope.",
    "Explain that earlier work was delivered under the original plan and available evidence, and the new plan improves clarity from this point forward.",
    "Where feasible, include a small alignment note to make the second purchase feel connected and category-defining without giving away full rework.",
    "Offer a focused alignment scope when new findings materially change previously delivered work.",
    "Use credit or discount language only when strategically approved; do not create automatic discount entitlement.",
    "Mirror reconciliation messages into the dashboard and link to report-vault or billing-center documents when safe.",
  ],
  revenueProtectionRules: [
    "Second purchase unlocks the purchased plan, not unlimited re-performance of earlier paid work.",
    "Material redo, reimplementation, or retroactive monthly reconstruction requires a new paid scope unless caused by Cendorq error.",
    "Corrections caused by Cendorq error are handled as corrections, not new revenue opportunities.",
    "Prior internal orientation should not be double-sold as new work, but previously delivered customer-facing work should not be reopened without scope.",
    "A reconciliation addendum may be included to preserve trust, but it must not become a substitute for Signal Repair, AI Readiness Review, or Readiness Control deliverables.",
    "A reconciliation PDF may be attached or made downloadable only when it is vault-matched, verified-access-safe, release-approved, and document-safety checked.",
  ],
  releaseRules: [
    "Every post-delivery second-purchase request must be classified into no-change, minor alignment, Cendorq error correction, material rework, or future-cycle application.",
    "Customer-facing reconciliation must identify what was previously delivered, what the new purchase unlocks, what is included now, what is not included, and the recommended next action.",
    "Release-captain review is required before promising a redo, correction, discount, credit, change order, retroactive monthly update, or reconciliation PDF delivery.",
    "Report vault and dashboard must show entitlements accurately and must not imply a full redo is included unless a new scope or correction record allows it.",
    "Every reconciliation email must mirror into the dashboard and every reconciliation document must remain vault-first, no-leak checked, and safe to access after verified login.",
  ],
} as const;

export function getPlanPostDeliveryReconciliationContract() {
  return PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT;
}
