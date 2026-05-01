export const PLAN_ENTITLEMENT_ROUTING_CONTRACT = {
  id: "plan-entitlement-routing-contract",
  name: "Cendorq Plan Entitlement and Nonlinear Purchase Routing Contract",
  purpose:
    "Protect Cendorq plan value, customer trust, report entitlement, plan boundaries, and revenue architecture when customers buy plans out of order. Customers may purchase any public plan directly, but Cendorq must not deliver unpaid reports, unpaid implementation packages, or unpaid recurring control under the disguise of fulfillment.",
  operatingStandard: [
    "Accept the customer's selected public plan when payment and access requirements are valid; do not block purchase merely because earlier plans were skipped.",
    "Fulfill the purchased plan at the highest quality possible within its paid scope and available evidence.",
    "When a skipped plan would materially improve accuracy, customer understanding, or outcome quality, explain the limitation and recommend the skipped plan as the correct add-on rather than quietly giving away its deliverables.",
    "Use scoped internal orientation only when necessary to safely fulfill the purchased plan; internal orientation is not a substitute for the full skipped plan and must not create customer entitlement to the skipped plan's report or deliverables.",
    "If the customer declines a recommended prerequisite or add-on plan, continue only with the purchased plan's permitted scope and clearly label limitations, assumptions, available-evidence basis, and confidence boundaries.",
  ],
  publicPlanMicroDisclosures: [
    {
      planKey: "free-scan",
      placement: "plan card, checkout review, report footer, dashboard handoff",
      microcopy:
        "Free Scan is a first-read report. Full diagnosis, implementation, and recurring monitoring are separate plans if you want deeper help.",
      tone: "small, calm, factual, non-pressure",
    },
    {
      planKey: "deep-review",
      placement: "plan card, checkout review, report footer, dashboard recommendation block",
      microcopy:
        "Deep Review explains what is likely weakening the business and why. Done-for-you optimization and monthly control are separate scopes.",
      tone: "small, educational, premium, non-pressure",
    },
    {
      planKey: "build-fix",
      placement: "plan card, checkout review, intake screen, delivery report footer, dashboard alert",
      microcopy:
        "Build Fix can proceed directly. For the clearest customer-facing diagnosis behind the work, add Deep Review; otherwise Cendorq uses available evidence and internal orientation within the purchased optimization scope.",
      tone: "small, clear, scope-protective, non-blocking",
    },
    {
      planKey: "ongoing-control",
      placement: "plan card, checkout review, onboarding screen, monthly report footer, dashboard alert",
      microcopy:
        "Ongoing Control can start directly. If implementation gaps are found, Build Fix is the proper plan for done-for-you optimization; Deep Review is the proper plan for a standalone full diagnosis.",
      tone: "small, clear, scope-protective, non-blocking",
    },
  ],
  dashboardReminderRules: [
    "Dashboard reminders should be calm, small, and contextual; they should not block payment or create fake urgency.",
    "If a customer buys Build Fix without Deep Review, the dashboard may show a small recommendation to add Deep Review for the full customer-facing diagnosis while continuing the purchased optimization workflow.",
    "If a customer buys Ongoing Control without Build Fix, the dashboard may show evidence-backed implementation gaps and recommend Build Fix when optimization is needed.",
    "If a customer buys Ongoing Control without Deep Review, the dashboard may recommend Deep Review when a standalone full diagnosis would materially improve monthly command clarity.",
    "Dashboard reminders must distinguish included deliverables from recommended add-ons and must never imply an unpaid report or implementation package is included.",
  ],
  reportLimitationRules: [
    "Every report must match the purchased plan and explain only the deliverables included in that plan.",
    "Reports may include small limitation notes explaining that recommendations are based on available evidence when prerequisite paid discovery was skipped or declined.",
    "Build Fix delivery reports may explain what was optimized and why, but must not attach or recreate the full Deep Review report unless Deep Review is purchased.",
    "Ongoing Control monthly reports may summarize monitored signals, recommendations, approved changes, and value proof, but must not deliver a full Build Fix package or standalone Deep Review report unless those plans are purchased.",
    "Report footers should educate customers on the next best plan without pressure, fake urgency, or unsupported outcome promises.",
  ],
  entitlementBoundaries: [
    {
      planKey: "free-scan",
      included: ["free first-read report", "bounded educational findings", "safe next-step recommendation", "dashboard/report-vault handoff"],
      notIncluded: ["full diagnostic report", "competitor teardown", "implementation plan", "done-for-you optimization", "monthly monitoring"],
      internalOnlyAllowed: ["basic intake triage", "safe public signal check", "owned-surface first-read"],
    },
    {
      planKey: "deep-review",
      included: ["full diagnostic report", "evidence/confidence summary", "priority blocker map", "plan-fit rationale", "report-ready follow-up"],
      notIncluded: ["done-for-you implementation", "unlimited revisions", "monthly monitoring", "production changes", "recurring optimization"],
      internalOnlyAllowed: ["implementation feasibility notes", "potential Build Fix scope hints", "monthly-control suitability notes"],
    },
    {
      planKey: "build-fix",
      included: ["scoped optimization work", "implementation-ready tasks", "copy/layout/action-path recommendations", "before-after delivery report", "approval checkpoints"],
      notIncluded: ["standalone Deep Review report unless purchased", "unlimited implementation", "monthly monitoring", "recurring market adaptation", "out-of-scope rebuilds"],
      internalOnlyAllowed: ["minimal diagnostic orientation needed to optimize safely", "internal blocker map", "internal evidence notes", "internal plan-fit review"],
    },
    {
      planKey: "ongoing-control",
      included: ["monthly command summary", "monitoring within approved scope", "change forecast", "approved recommendation queue", "value-proof summary"],
      notIncluded: ["standalone Deep Review report unless purchased", "Build Fix implementation package unless purchased", "unlimited optimization", "unapproved production changes", "out-of-scope build work"],
      internalOnlyAllowed: ["monthly diagnostic orientation", "internal optimization opportunity notes", "internal risk and priority map", "internal skipped-plan recommendation basis"],
    },
  ],
  nonlinearPurchaseScenarios: [
    {
      key: "build-fix-without-deep-review",
      customerAction: "Customer buys Build Fix directly without Deep Review.",
      fulfillmentRule:
        "Collect optimization intake and use only the minimum internal diagnostic orientation needed to perform scoped optimization safely. Do not perform or deliver the full diagnostic report unless Deep Review is purchased.",
      customerMessage:
        "We can begin the optimization scope you purchased. A full diagnostic report is a separate deliverable; adding it can help you understand the complete reasoning behind the work, but it is not required for us to perform the scoped optimization.",
      conversionBackPath: "Recommend Deep Review as an add-on when customer-facing diagnostic clarity would materially improve understanding, approvals, or future decisions.",
      entitlementLock: "Build Fix artifacts only; internal diagnostic orientation remains internal.",
    },
    {
      key: "ongoing-control-without-build-fix",
      customerAction: "Customer buys Ongoing Control directly without Build Fix.",
      fulfillmentRule:
        "Collect monitoring scope and use only internal monthly orientation needed for recurring command. Do not deliver a Build Fix implementation package or perform out-of-scope optimization unless Build Fix is purchased.",
      customerMessage:
        "We can run the monthly command scope you selected. If the evidence shows the business needs concrete implementation work, Build Fix is the proper add-on for that work.",
      conversionBackPath: "Recommend Build Fix when recurring monitoring repeatedly finds implementation gaps that cannot be resolved inside monthly advisory scope.",
      entitlementLock: "Monthly outputs only; Build Fix package requires Build Fix purchase.",
    },
    {
      key: "ongoing-control-without-deep-review",
      customerAction: "Customer buys Ongoing Control directly without Deep Review.",
      fulfillmentRule:
        "Use available evidence and internal orientation to operate monthly control, but do not deliver a standalone full diagnostic report unless Deep Review is purchased.",
      customerMessage:
        "We can operate monthly control from the evidence available. A full diagnostic report is recommended when you want the complete customer-facing explanation of the business gaps and priority reasoning.",
      conversionBackPath: "Recommend Deep Review when monthly command quality would benefit from a deeper customer-facing diagnostic foundation.",
      entitlementLock: "Monthly command summaries only; full diagnostic report requires Deep Review purchase.",
    },
    {
      key: "deep-review-without-build-fix",
      customerAction: "Customer buys Deep Review but declines Build Fix.",
      fulfillmentRule:
        "Deliver the diagnostic report and implementation recommendations, but do not perform done-for-you optimization work.",
      customerMessage:
        "The report can show what should change and why. Build Fix is the separate plan for doing the scoped optimization work with approval checkpoints.",
      conversionBackPath: "Recommend Build Fix only when the diagnostic report identifies concrete implementation work that the customer wants handled for them.",
      entitlementLock: "Diagnostic artifacts only; done-for-you implementation requires Build Fix purchase.",
    },
    {
      key: "free-scan-only",
      customerAction: "Customer uses Free Scan and declines paid plans.",
      fulfillmentRule:
        "Deliver the bounded free first-read report and helpful education. Do not provide full diagnostic depth, implementation package, or monthly control.",
      customerMessage:
        "The free report gives a useful first read. Deeper diagnosis, implementation, and recurring control are separate paid scopes if you want more complete help.",
      conversionBackPath: "Recommend Deep Review only when the first-read evidence supports deeper analysis.",
      entitlementLock: "Free report only.",
    },
  ],
  limitationLanguageRules: [
    "When a customer skips a recommended plan, explain what Cendorq can still do, what will be less complete, and what paid add-on would unlock the missing deliverable.",
    "Do not tell the customer the work will be as complete as if the skipped plan had been purchased.",
    "Do not shame, pressure, or create fake urgency; use calm educational language about scope and accuracy boundaries.",
    "Customer-facing summaries must say 'based on available evidence' when prerequisite discovery was declined or not purchased.",
    "Internal notes may identify skipped-plan value, but customer-facing copy must focus on clarity, scope, and the next best paid option.",
  ],
  loopholeProtections: [
    "No full diagnostic report from Build Fix unless Deep Review entitlement exists.",
    "No Build Fix implementation package from Ongoing Control unless Build Fix entitlement exists.",
    "No recurring monitoring from Deep Review or Build Fix unless Ongoing Control entitlement exists.",
    "No full competitor teardown, complete funnel strategy, or implementation plan from Free Scan.",
    "No unpaid internal analysis becomes downloadable, emailed, report-vault-visible, or customer-facing as a standalone artifact.",
    "No customer-facing output may imply a skipped plan was fully performed when only scoped internal orientation was used.",
    "No plan may use skipped-plan internal orientation to satisfy paid deliverables that belong to another plan.",
  ],
  releaseRules: [
    "Every direct-purchase path must show purchased entitlement, skipped recommended plan, customer-facing limitation, internal-only orientation allowance, and conversion-back path.",
    "Report vault, dashboard, email, and notification surfaces must only expose artifacts included in the purchased plan entitlement.",
    "Release-captain review must reject outputs that give away unpaid reports, implementation packages, recurring control, or out-of-scope analysis.",
  ],
} as const;

export function getPlanEntitlementRoutingContract() {
  return PLAN_ENTITLEMENT_ROUTING_CONTRACT;
}
