export const PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT = {
  id: "plan-post-delivery-reconciliation-contract",
  name: "Cendorq Post-Delivery Plan Reconciliation Contract",
  purpose:
    "Define the safest and highest-value way to handle customers who buy a previously recommended plan after Cendorq has already delivered the plan they originally purchased, including requests to redo prior work using the newly purchased prerequisite.",
  operatingStandard: [
    "A second purchase after delivery creates a new entitlement; it does not automatically convert the already-delivered work into an unlimited redo.",
    "Cendorq should honor the second purchase fully by delivering the newly purchased plan's included artifacts and by reviewing how the new findings relate to previously delivered work.",
    "Cendorq may provide a scoped reconciliation addendum that explains what changes, what still stands, what is newly clarified, and whether prior delivery needs no change, minor alignment, correction, or new paid scope.",
    "Cendorq must preserve customer trust by acknowledging the second purchase while protecting the business from unpaid rework, duplicate fulfillment, and plan-boundary loopholes.",
    "Customer-facing language must be calm, educational, premium, and clear: the prior delivery was completed under the prior entitlement and available evidence; the new purchase unlocks deeper context going forward.",
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
      rule: "The new purchase clarifies wording, priority, or explanation without requiring material rework. Provide a small addendum or dashboard note when appropriate.",
      included: true,
      customerMessage: "The new analysis adds useful context. We can align the explanation without reopening the entire completed scope.",
    },
    {
      key: "cendorq-error-correction",
      name: "Cendorq error correction",
      rule: "If Cendorq made a factual, projection, entitlement, or delivery error, correct the affected customer-facing output without using the correction as an upsell.",
      included: true,
      customerMessage: "We found a correction that should be made. We will correct the affected output and preserve the audit record.",
    },
    {
      key: "material-rework-change-order",
      name: "Material rework / change order",
      rule: "If the newly purchased plan reveals materially different direction requiring redoing delivered optimization, implementation, monthly scope, or production work, create a new approved scope, discounted alignment offer, or paid change order rather than free rework.",
      included: false,
      customerMessage: "The new analysis changes the recommended direction enough that it becomes a new work scope. We can prepare a focused alignment scope instead of reopening the completed work for free.",
    },
    {
      key: "future-cycle-application",
      name: "Apply to future cycle",
      rule: "For Ongoing Control, new findings may be applied to the next monthly cycle when they fit the active monthly scope, without retroactively redoing previously completed cycles.",
      included: true,
      customerMessage: "We will apply the new findings to the next monthly command cycle where they fit the active scope.",
    },
  ],
  planPairRules: [
    {
      key: "build-fix-then-deep-review",
      customerPath: "Customer bought Build Fix, received delivery, then buys Deep Review and asks to redo Build Fix.",
      rule: "Deliver Deep Review fully. Compare it to the completed Build Fix. Provide an alignment addendum if the direction is consistent or minor. If the Deep Review reveals material changes, offer a scoped Build Fix alignment/change order instead of free redo.",
      includedWithSecondPurchase: ["Deep Review report", "alignment review against completed Build Fix", "minor explanation addendum when appropriate"],
      notIncludedWithSecondPurchase: ["full Build Fix redo", "new implementation package", "unlimited revisions", "new production changes"],
    },
    {
      key: "ongoing-control-then-build-fix",
      customerPath: "Customer bought Ongoing Control, received monthly outputs, then buys Build Fix and asks to redo prior monthly recommendations.",
      rule: "Deliver Build Fix scope. Use new implementation work to improve future monthly cycles. Do not redo previously completed monthly cycles unless there was a Cendorq error or the customer buys a retroactive alignment scope.",
      includedWithSecondPurchase: ["Build Fix artifacts", "future monthly integration guidance", "minor active-cycle alignment when in scope"],
      notIncludedWithSecondPurchase: ["retroactive monthly cycle redo", "unlimited monitoring rewrite", "unpaid historical reporting changes"],
    },
    {
      key: "ongoing-control-then-deep-review",
      customerPath: "Customer bought Ongoing Control, received monthly outputs, then buys Deep Review and asks to redo monthly command using the full diagnosis.",
      rule: "Deliver Deep Review and apply findings to future Ongoing Control cycles. Prior monthly summaries stand as based on the evidence available at the time unless there was a Cendorq error.",
      includedWithSecondPurchase: ["Deep Review report", "future-cycle application note", "active-scope alignment guidance"],
      notIncludedWithSecondPurchase: ["retroactive monthly redo", "free Build Fix work", "unpaid implementation package"],
    },
    {
      key: "deep-review-then-build-fix-after-delay",
      customerPath: "Customer bought Deep Review, received report, later buys Build Fix and wants implementation based on the report.",
      rule: "Use the existing Deep Review as the foundation if still current. If the business has changed, perform a scoped freshness check before Build Fix; major new discovery becomes updated diagnostic scope or monthly control opportunity.",
      includedWithSecondPurchase: ["Build Fix intake", "scope confirmation", "freshness check", "implementation-ready plan"],
      notIncludedWithSecondPurchase: ["new full diagnostic report unless purchased", "unlimited updated research", "out-of-scope implementation"],
    },
  ],
  customerExperienceRules: [
    "Never make the customer feel punished for buying the recommended plan later.",
    "Never promise that buying the skipped plan later automatically reopens every previously delivered scope.",
    "Explain that earlier work was delivered under the original plan and available evidence, and the new plan improves clarity from this point forward.",
    "Where feasible, include a small alignment note to make the second purchase feel connected and premium without giving away full rework.",
    "Offer a focused alignment scope when new findings materially change previously delivered work.",
    "Use credit or discount language only when strategically approved; do not create automatic discount entitlement.",
  ],
  revenueProtectionRules: [
    "Second purchase unlocks the purchased plan, not unlimited re-performance of earlier paid work.",
    "Material redo, reimplementation, or retroactive monthly reconstruction requires a new paid scope unless caused by Cendorq error.",
    "Corrections caused by Cendorq error are handled as corrections, not new revenue opportunities.",
    "Prior internal orientation should not be double-sold as new work, but previously delivered customer-facing work should not be reopened without scope.",
    "A reconciliation addendum may be included to preserve trust, but it must not become a substitute for Build Fix, Deep Review, or Ongoing Control deliverables.",
  ],
  releaseRules: [
    "Every post-delivery second-purchase request must be classified into no-change, minor alignment, Cendorq error correction, material rework, or future-cycle application.",
    "Customer-facing reconciliation must identify what was previously delivered, what the new purchase unlocks, what is included now, what is not included, and the recommended next action.",
    "Release-captain review is required before promising a redo, correction, discount, credit, change order, or retroactive monthly update.",
    "Report vault and dashboard must show entitlements accurately and must not imply a full redo is included unless a new scope or correction record allows it.",
  ],
} as const;

export function getPlanPostDeliveryReconciliationContract() {
  return PLAN_POST_DELIVERY_RECONCILIATION_CONTRACT;
}
