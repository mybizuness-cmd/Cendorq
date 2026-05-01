export const PLAN_ENTITLEMENT_ROUTING_CONTRACT = {
  id: "plan-entitlement-routing-contract",
  name: "Cendorq Plan Entitlement and Purchase Routing Contract",
  purpose:
    "Protect Cendorq plan value, customer trust, report entitlement, plan boundaries, and revenue architecture across linear purchases, stopped journeys, direct purchases, late add-ons, and nonlinear purchase paths. Customers may purchase any public plan directly, but Cendorq must not deliver unpaid reports, unpaid implementation packages, or unpaid recurring control under the disguise of fulfillment.",
  operatingStandard: [
    "Accept the customer's selected public plan when payment and access requirements are valid; do not block purchase merely because earlier plans were skipped.",
    "Fulfill the purchased plan at the highest quality possible within its paid scope and available evidence.",
    "When a skipped or next plan would materially improve accuracy, customer understanding, or outcome quality, explain the limitation and recommend the correct add-on rather than quietly giving away its deliverables.",
    "Use scoped internal orientation only when necessary to safely fulfill the purchased plan; internal orientation is not a substitute for the full skipped plan and must not create customer entitlement to the skipped plan's report or deliverables.",
    "If the customer stops at any plan, continue only with that plan's permitted scope and clearly label limitations, assumptions, available-evidence basis, and confidence boundaries.",
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
  linearPurchaseSequences: [
    {
      key: "free-scan-stops",
      customerPath: "Customer receives Free Scan and stops there.",
      completedScope: "Free first-read report, bounded educational findings, safe next-step recommendation, and dashboard/report-vault handoff.",
      notIncluded: "Full diagnostic report, implementation plan, done-for-you optimization, and recurring monitoring.",
      nextBestPlan: "Deep Review when the Free Scan evidence shows deeper diagnosis would materially improve decisions.",
      followUpCadence: "one report-ready email, one educational follow-up, then light suppression unless the customer re-engages or evidence-backed urgency changes without fake urgency.",
      suppressionRules: ["suppress if customer dismisses the recommendation", "suppress if no evidence-backed next step exists", "suppress if support requested no reminders"],
    },
    {
      key: "deep-review-stops",
      customerPath: "Customer receives Deep Review and stops there.",
      completedScope: "Full diagnostic report, evidence/confidence summary, priority blocker map, plan-fit rationale, and report-ready follow-up.",
      notIncluded: "Done-for-you optimization, production changes, recurring monitoring, or monthly command.",
      nextBestPlan: "Build Fix when the diagnostic report identifies concrete implementation work; Ongoing Control when recurring monitoring is the clearer fit.",
      followUpCadence: "report-ready email, report understanding follow-up, then evidence-led Build Fix or Ongoing Control recommendation only when the report supports it.",
      suppressionRules: ["suppress if customer says they will self-implement", "suppress if no concrete implementation blocker exists", "suppress non-essential reminders after plan-fit is dismissed"],
    },
    {
      key: "build-fix-stops",
      customerPath: "Customer receives Build Fix and stops there.",
      completedScope: "Scoped optimization work, implementation-ready artifacts, before-after delivery summary, approval checkpoints, and support/correction path.",
      notIncluded: "Recurring monitoring, ongoing market adaptation, unlimited implementation, or monthly command summaries.",
      nextBestPlan: "Ongoing Control when continued monitoring, periodic updates, or future adaptation would protect the work and help the business stay current.",
      followUpCadence: "delivery-ready email, post-delivery review, one implementation confidence follow-up, then Ongoing Control recommendation when recurring evidence supports it.",
      suppressionRules: ["suppress if customer declines recurring support", "suppress if optimization is not yet delivered", "suppress if evidence does not support recurring control"],
    },
    {
      key: "ongoing-control-active",
      customerPath: "Customer is active on Ongoing Control.",
      completedScope: "Monthly command summaries, monitoring inside approved scope, change forecasts, approved recommendation queue, and value-proof summaries.",
      notIncluded: "Out-of-scope Build Fix work, unapproved production changes, unlimited implementation, or standalone Deep Review report unless purchased.",
      nextBestPlan: "Build Fix for material implementation gaps; Deep Review for standalone diagnostic clarity; expanded monthly scope only when usage and evidence support it.",
      followUpCadence: "monthly command summary, evidence-backed change alert when appropriate, approval request when needed, and value-proof/renewal summary each active cycle.",
      suppressionRules: ["suppress upgrade reminders when no evidence-backed gap exists", "suppress if active change approval is pending", "suppress if customer has opted out of non-essential email"],
    },
  ],
  directPurchaseWarningEmails: [
    {
      key: "build-fix-direct-scope-confirmation",
      planKey: "build-fix",
      trigger: "Build Fix purchased directly without Deep Review entitlement.",
      cadence:
        "send after purchase, then every 5 business days while intake or approval remains incomplete; suppress after Deep Review is purchased, Build Fix delivery is approved, or the customer opts out of non-essential reminders",
      subject: "Your optimization scope is moving forward",
      preheader: "A quick scope note so your Build Fix work stays clear and protected.",
      bodyPurpose:
        "Confirm that the purchased optimization work is moving forward, explain that Deep Review is the separate full diagnostic report, and remind the customer that Cendorq will use available evidence plus scoped internal orientation without delivering unpaid diagnostic artifacts.",
      allowedCopy: [
        "Your Build Fix work can continue from the scope you purchased.",
        "A full Deep Review report is a separate deliverable if you want the complete customer-facing diagnosis behind the work.",
        "Without that add-on, we will use available evidence and scoped internal orientation to support the optimization, and your delivered artifacts will stay within Build Fix scope.",
      ],
      blockedCopy: ["full diagnostic report included", "free redo", "guaranteed result", "urgent before it is too late", "we completed Deep Review for free"],
      primaryPath: "/dashboard/billing",
      secondaryPath: "/dashboard/report-vault",
      suppressionRules: ["suppress after Deep Review entitlement is active", "suppress after Build Fix delivery is approved", "suppress if customer has opted out of non-essential email", "suppress if support requested no reminders"],
    },
    {
      key: "ongoing-control-direct-scope-confirmation",
      planKey: "ongoing-control",
      trigger: "Ongoing Control purchased directly without Build Fix or Deep Review entitlement.",
      cadence:
        "send after subscription start, then once per active monthly cycle while skipped-plan recommendation remains evidence-backed; suppress when Build Fix/Deep Review is purchased or the recommendation is no longer supported",
      subject: "Your monthly control scope is active",
      preheader: "A clear note on what monthly control includes and what separate plans unlock.",
      bodyPurpose:
        "Confirm that monthly control is active, explain that Build Fix handles done-for-you optimization and Deep Review handles standalone full diagnosis, and remind the customer that monthly outputs will be based on approved scope and available evidence.",
      allowedCopy: [
        "Your Ongoing Control plan can operate from the approved monthly scope.",
        "If we identify implementation gaps, Build Fix is the separate plan for done-for-you optimization.",
        "If you want the full customer-facing diagnostic explanation, Deep Review is the separate report deliverable.",
      ],
      blockedCopy: ["Build Fix included", "Deep Review included", "free implementation", "guaranteed monthly growth", "urgent upgrade required"],
      primaryPath: "/dashboard/billing",
      secondaryPath: "/dashboard/notifications",
      suppressionRules: ["suppress after Build Fix entitlement is active when Build Fix is the only missing recommendation", "suppress after Deep Review entitlement is active when Deep Review is the only missing recommendation", "suppress when recommendation is not evidence-backed", "suppress if customer has opted out of non-essential email"],
    },
  ],
  dashboardReminderRules: [
    "Dashboard reminders should be calm, small, and contextual; they should not block payment or create fake urgency.",
    "If a customer buys Build Fix without Deep Review, the dashboard may show a small recommendation to add Deep Review for the full customer-facing diagnosis while continuing the purchased optimization workflow.",
    "If a customer buys Ongoing Control without Build Fix, the dashboard may show evidence-backed implementation gaps and recommend Build Fix when optimization is needed.",
    "If a customer buys Ongoing Control without Deep Review, the dashboard may recommend Deep Review when a standalone full diagnosis would materially improve monthly command clarity.",
    "If a customer stops at Free Scan, Deep Review, or Build Fix, dashboard reminders should show the next best plan only when the completed plan's evidence supports it.",
    "Dashboard reminders must distinguish included deliverables from recommended add-ons and must never imply an unpaid report or implementation package is included.",
  ],
  reportLimitationRules: [
    "Every report must match the purchased plan and explain only the deliverables included in that plan.",
    "Reports may include small limitation notes explaining that recommendations are based on available evidence when prerequisite paid discovery was skipped or declined.",
    "Build Fix delivery reports may explain what was optimized and why, but must not attach or recreate the full Deep Review report unless Deep Review is purchased.",
    "Ongoing Control monthly reports may summarize monitored signals, recommendations, approved changes, and value proof, but must not deliver a full Build Fix package or standalone Deep Review report unless those plans are purchased.",
    "Report footers should educate customers on the next best plan without pressure, urgency claims, or unsupported outcome promises.",
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
    "When a customer skips or stops before a recommended plan, explain what Cendorq can still do, what will be less complete, and what paid add-on would unlock the missing deliverable.",
    "Do not tell the customer the work will be as complete as if the skipped or next plan had been purchased.",
    "Do not shame, pressure, or create urgency claims; use calm educational language about scope and accuracy boundaries.",
    "Customer-facing summaries must say 'based on available evidence' when prerequisite discovery was declined, skipped, stopped, or not purchased.",
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
    "No warning email may imply a missing prerequisite is required for the purchased plan to begin if payment has already been accepted.",
  ],
  releaseRules: [
    "Every direct-purchase path must show purchased entitlement, skipped recommended plan, customer-facing limitation, internal-only orientation allowance, and conversion-back path.",
    "Every linear stop point must show completed entitlement, not-included scope, next best plan, follow-up cadence, and suppression rules.",
    "Report vault, dashboard, email, and notification surfaces must only expose artifacts included in the purchased plan entitlement.",
    "Release-captain review must reject outputs that give away unpaid reports, implementation packages, recurring control, or out-of-scope analysis.",
    "Direct-purchase warning emails for Build Fix and Ongoing Control must be periodic, suppressible, evidence-backed, and non-essential; they must not block fulfillment or create pressure.",
  ],
} as const;

export function getPlanEntitlementRoutingContract() {
  return PLAN_ENTITLEMENT_ROUTING_CONTRACT;
}
