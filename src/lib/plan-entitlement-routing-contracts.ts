export const PLAN_ENTITLEMENT_ROUTING_CONTRACT = {
  id: "plan-entitlement-routing-contract",
  name: "Cendorq Plan Entitlement and Purchase Routing Contract",
  purpose:
    "Protect Cendorq plan value, customer trust, report entitlement, plan boundaries, document delivery, dashboard-message continuity, and revenue architecture across linear purchases, stopped journeys, direct purchases, late add-ons, and nonlinear purchase paths. Customers may purchase any public plan directly, but Cendorq must not deliver unpaid reports, unpaid implementation packages, unsafe PDFs, or unpaid recurring control under the disguise of fulfillment.",
  operatingStandard: [
    "Accept the customer's selected public plan when payment and access requirements are valid; do not block purchase merely because earlier plans were skipped.",
    "Fulfill the purchased plan at the highest quality possible within its paid scope and available evidence.",
    "When a skipped or next plan would materially improve accuracy, customer understanding, or outcome quality, explain the limitation and recommend the correct add-on rather than quietly giving away its deliverables.",
    "Use scoped internal orientation only when necessary to safely fulfill the purchased plan; internal orientation is not a substitute for the full skipped plan and must not create customer entitlement to the skipped plan's report or deliverables.",
    "If the customer stops at any plan, continue only with that plan's permitted scope and clearly label limitations, assumptions, available-evidence basis, and confidence boundaries.",
    "Every important entitlement, report, billing, support, or lifecycle email must mirror into the dashboard so the customer can recover the same safe message after verified login.",
    "Report PDFs, billing PDFs, and downloadable documents must remain vault-first, verified-access-first, provider/release-gated, no-leak checked, and never become a separate source of truth.",
  ],
  publicPlanMicroDisclosures: [
    {
      planKey: "free-scan",
      placement: "plan card, checkout review, report footer, dashboard handoff",
      microcopy:
        "Free Scan is a first-read report. AI Readiness Review, Signal Repair, and Readiness Control are separate plans if you want deeper help.",
      tone: "small, calm, factual, non-pressure",
    },
    {
      planKey: "deep-review",
      placement: "plan card, checkout review, report footer, dashboard recommendation block",
      microcopy:
        "AI Readiness Review explains what is likely weakening the business and why. Signal Repair and Readiness Control are separate scopes.",
      tone: "small, educational, category-defining, non-pressure",
    },
    {
      planKey: "build-fix",
      placement: "plan card, checkout review, intake screen, delivery report footer, dashboard alert",
      microcopy:
        "Signal Repair can proceed directly. For the clearest customer-facing review behind the work, add AI Readiness Review; otherwise Cendorq uses available evidence and internal orientation within the purchased repair scope.",
      tone: "small, clear, scope-protective, non-blocking",
    },
    {
      planKey: "ongoing-control",
      placement: "plan card, checkout review, onboarding screen, monthly report footer, dashboard alert",
      microcopy:
        "Readiness Control can start directly. If implementation gaps are found, Signal Repair is the proper plan for done-for-you improvement; AI Readiness Review is the proper plan for a standalone evidence-backed report.",
      tone: "small, clear, scope-protective, non-blocking",
    },
  ],
  linearPurchaseSequences: [
    {
      key: "free-scan-stops",
      customerPath: "Customer receives Free Scan and stops there.",
      completedScope: "Free first-read report, bounded educational findings, safe next-step recommendation, dashboard message mirror, and dashboard/report-vault handoff.",
      notIncluded: "AI Readiness Review report, implementation plan, done-for-you Signal Repair, and recurring Readiness Control.",
      nextBestPlan: "AI Readiness Review when the Free Scan evidence shows deeper review would materially improve decisions.",
      followUpCadence: "one report-ready email mirrored into the dashboard, one educational follow-up, then light suppression unless the customer re-engages or evidence-backed risk changes without pressure.",
      suppressionRules: ["suppress if customer dismisses the recommendation", "suppress if no evidence-backed next step exists", "suppress if support requested no reminders"],
    },
    {
      key: "deep-review-stops",
      customerPath: "Customer receives AI Readiness Review and stops there.",
      completedScope: "AI Readiness Review report, evidence/confidence summary, priority blocker map, plan-fit rationale, report-ready follow-up, dashboard message mirror, and vault-first PDF state when gates pass.",
      notIncluded: "Done-for-you Signal Repair, production changes, recurring monitoring, or monthly command.",
      nextBestPlan: "Signal Repair when the AI Readiness Review identifies concrete implementation work; Readiness Control when recurring monitoring is the clearer fit.",
      followUpCadence: "report-ready email mirrored into dashboard, report understanding follow-up, then evidence-led Signal Repair or Readiness Control recommendation only when the report supports it.",
      suppressionRules: ["suppress if customer says they will self-implement", "suppress if no concrete implementation blocker exists", "suppress non-essential reminders after plan-fit is dismissed"],
    },
    {
      key: "build-fix-stops",
      customerPath: "Customer receives Signal Repair and stops there.",
      completedScope: "Scoped repair work, implementation-ready artifacts, before-after delivery summary, approval checkpoints, dashboard message mirror, safe PDF delivery state, and support/correction path.",
      notIncluded: "Recurring monitoring, ongoing market adaptation, unlimited implementation, or monthly command summaries.",
      nextBestPlan: "Readiness Control when continued monitoring, periodic updates, or future adaptation would protect the work and help the business stay current.",
      followUpCadence: "delivery-ready email mirrored into dashboard, post-delivery review, one implementation confidence follow-up, then Readiness Control recommendation when recurring evidence supports it.",
      suppressionRules: ["suppress if customer declines recurring support", "suppress if repair is not yet delivered", "suppress if evidence does not support recurring control"],
    },
    {
      key: "ongoing-control-active",
      customerPath: "Customer is active on Readiness Control.",
      completedScope: "Monthly command summaries, monitoring inside approved scope, change forecasts when justified, approved recommendation queue, dashboard message mirrors, safe monthly PDF state, and value-proof summaries.",
      notIncluded: "Out-of-scope Signal Repair work, unapproved production changes, unlimited implementation, or standalone AI Readiness Review report unless purchased.",
      nextBestPlan: "Signal Repair for material implementation gaps; AI Readiness Review for standalone review clarity; expanded monthly scope only when usage and evidence support it.",
      followUpCadence: "monthly command summary mirrored into dashboard, evidence-backed change alert when appropriate, approval request when needed, and value-proof/renewal summary each active cycle.",
      suppressionRules: ["suppress upgrade reminders when no evidence-backed gap exists", "suppress if active change approval is pending", "suppress if customer has opted out of non-essential email"],
    },
  ],
  directPurchaseWarningEmails: [
    {
      key: "signal-repair-direct-scope-confirmation",
      planKey: "build-fix",
      trigger: "Signal Repair purchased directly without AI Readiness Review entitlement.",
      cadence:
        "send after purchase, mirror into dashboard, then every 5 business days while intake or approval remains incomplete; suppress after AI Readiness Review is purchased, Signal Repair delivery is approved, or the customer opts out of non-essential reminders",
      subject: "Your Signal Repair scope is moving forward",
      preheader: "A quick scope note so your Signal Repair work stays clear and protected.",
      bodyPurpose:
        "Confirm that the purchased repair work is moving forward, explain that AI Readiness Review is the separate evidence-backed report, and remind the customer that Cendorq will use available evidence plus scoped internal orientation without delivering unpaid review artifacts.",
      allowedCopy: [
        "Your Signal Repair work can continue from the scope you purchased.",
        "An AI Readiness Review report is a separate deliverable if you want the complete customer-facing explanation behind the work.",
        "Without that add-on, we will use available evidence and scoped internal orientation to support the repair, and your delivered artifacts will stay within Signal Repair scope.",
      ],
      blockedCopy: ["AI Readiness Review included", "free redo", "guaranteed result", "urgent before it is too late", "we completed AI Readiness Review for free"],
      primaryPath: "/dashboard/billing",
      secondaryPath: "/dashboard/reports",
      suppressionRules: ["suppress after AI Readiness Review entitlement is active", "suppress after Signal Repair delivery is approved", "suppress if customer has opted out of non-essential email", "suppress if support requested no reminders"],
    },
    {
      key: "readiness-control-direct-scope-confirmation",
      planKey: "ongoing-control",
      trigger: "Readiness Control purchased directly without Signal Repair or AI Readiness Review entitlement.",
      cadence:
        "send after subscription start, mirror into dashboard, then once per active monthly cycle while skipped-plan recommendation remains evidence-backed; suppress when Signal Repair/AI Readiness Review is purchased or the recommendation is no longer supported",
      subject: "Your Readiness Control scope is active",
      preheader: "A clear note on what monthly control includes and what separate plans unlock.",
      bodyPurpose:
        "Confirm that monthly control is active, explain that Signal Repair handles done-for-you improvement and AI Readiness Review handles standalone evidence-backed review, and remind the customer that monthly outputs will be based on approved scope and available evidence.",
      allowedCopy: [
        "Your Readiness Control plan can operate from the approved monthly scope.",
        "If we identify implementation gaps, Signal Repair is the separate plan for done-for-you improvement.",
        "If you want the full customer-facing review explanation, AI Readiness Review is the separate report deliverable.",
      ],
      blockedCopy: ["Signal Repair included", "AI Readiness Review included", "free implementation", "guaranteed monthly growth", "urgent upgrade required"],
      primaryPath: "/dashboard/billing",
      secondaryPath: "/dashboard/notifications",
      suppressionRules: ["suppress after Signal Repair entitlement is active when Signal Repair is the only missing recommendation", "suppress after AI Readiness Review entitlement is active when AI Readiness Review is the only missing recommendation", "suppress when recommendation is not evidence-backed", "suppress if customer has opted out of non-essential email"],
    },
  ],
  dashboardReminderRules: [
    "Dashboard reminders should be calm, small, contextual, and mirrored with related email state where applicable; they should not block payment or create fake urgency.",
    "If a customer buys Signal Repair without AI Readiness Review, the dashboard may show a small recommendation to add AI Readiness Review for the full customer-facing review while continuing the purchased repair workflow.",
    "If a customer buys Readiness Control without Signal Repair, the dashboard may show evidence-backed implementation gaps and recommend Signal Repair when repair is needed.",
    "If a customer buys Readiness Control without AI Readiness Review, the dashboard may recommend AI Readiness Review when a standalone evidence-backed report would materially improve monthly command clarity.",
    "If a customer stops at Free Scan, AI Readiness Review, or Signal Repair, dashboard reminders should show the next best plan only when the completed plan's evidence supports it.",
    "Dashboard reminders must distinguish included deliverables from recommended add-ons and must never imply an unpaid report or implementation package is included.",
  ],
  reportLimitationRules: [
    "Every report must match the purchased plan and explain only the deliverables included in that plan.",
    "Reports may include small limitation notes explaining that recommendations are based on available evidence when prerequisite paid discovery was skipped or declined.",
    "Signal Repair delivery records may explain what was repaired and why, but must not attach or recreate the full AI Readiness Review report unless AI Readiness Review is purchased.",
    "Readiness Control monthly reports may summarize monitored signals, recommendations, approved changes, and value proof, but must not deliver a full Signal Repair package or standalone AI Readiness Review report unless those plans are purchased.",
    "Report footers should educate customers on the next best plan without pressure, urgency claims, or unsupported outcome promises.",
    "Report vault display, downloadable PDFs, PDF attachments, and dashboard messages must match the entitlement state and must not create separate truth sources.",
  ],
  entitlementBoundaries: [
    {
      planKey: "free-scan",
      included: ["free first-read report", "bounded educational findings", "safe next-step recommendation", "dashboard message mirror", "dashboard/report-vault handoff"],
      notIncluded: ["AI Readiness Review report", "competitor teardown", "implementation plan", "done-for-you Signal Repair", "monthly monitoring"],
      internalOnlyAllowed: ["basic intake triage", "safe public signal check", "owned-surface first-read"],
    },
    {
      planKey: "deep-review",
      included: ["AI Readiness Review report", "evidence/confidence summary", "priority blocker map", "plan-fit rationale", "report-ready follow-up", "dashboard message mirror", "vault-first PDF state when gates pass"],
      notIncluded: ["done-for-you Signal Repair", "unlimited revisions", "monthly monitoring", "production changes", "recurring repair"],
      internalOnlyAllowed: ["implementation feasibility notes", "potential Signal Repair scope hints", "Readiness Control suitability notes"],
    },
    {
      planKey: "build-fix",
      included: ["scoped Signal Repair work", "implementation-ready tasks", "copy/layout/action-path recommendations", "before-after delivery record", "approval checkpoints", "dashboard message mirror", "safe PDF state when gates pass"],
      notIncluded: ["standalone AI Readiness Review report unless purchased", "unlimited implementation", "monthly monitoring", "recurring market adaptation", "out-of-scope rebuilds"],
      internalOnlyAllowed: ["minimal review orientation needed to repair safely", "internal blocker map", "internal evidence notes", "internal plan-fit review"],
    },
    {
      planKey: "ongoing-control",
      included: ["monthly command summary", "monitoring within approved scope", "change forecast when justified", "approved recommendation queue", "value-proof summary", "dashboard message mirror", "safe monthly PDF state when gates pass"],
      notIncluded: ["standalone AI Readiness Review report unless purchased", "Signal Repair implementation package unless purchased", "unlimited repair", "unapproved production changes", "out-of-scope build work"],
      internalOnlyAllowed: ["monthly review orientation", "internal Signal Repair opportunity notes", "internal risk and priority map", "internal skipped-plan recommendation basis"],
    },
  ],
  nonlinearPurchaseScenarios: [
    {
      key: "signal-repair-without-ai-readiness-review",
      customerAction: "Customer buys Signal Repair directly without AI Readiness Review.",
      fulfillmentRule:
        "Collect repair intake and use only the minimum internal review orientation needed to perform scoped repair safely. Do not perform or deliver the full AI Readiness Review report unless AI Readiness Review is purchased.",
      customerMessage:
        "We can begin the Signal Repair scope you purchased. An AI Readiness Review report is a separate deliverable; adding it can help you understand the complete reasoning behind the work, but it is not required for us to perform the scoped repair.",
      conversionBackPath: "Recommend AI Readiness Review as an add-on when customer-facing review clarity would materially improve understanding, approvals, or future decisions.",
      entitlementLock: "Signal Repair artifacts only; internal review orientation remains internal.",
    },
    {
      key: "readiness-control-without-signal-repair",
      customerAction: "Customer buys Readiness Control directly without Signal Repair.",
      fulfillmentRule:
        "Collect monitoring scope and use only internal monthly orientation needed for recurring command. Do not deliver a Signal Repair implementation package or perform out-of-scope repair unless Signal Repair is purchased.",
      customerMessage:
        "We can run the monthly command scope you selected. If the evidence shows the business needs concrete implementation work, Signal Repair is the proper add-on for that work.",
      conversionBackPath: "Recommend Signal Repair when recurring monitoring repeatedly finds implementation gaps that cannot be resolved inside monthly advisory scope.",
      entitlementLock: "Monthly outputs only; Signal Repair package requires Signal Repair purchase.",
    },
    {
      key: "readiness-control-without-ai-readiness-review",
      customerAction: "Customer buys Readiness Control directly without AI Readiness Review.",
      fulfillmentRule:
        "Use available evidence and internal orientation to operate monthly control, but do not deliver a standalone AI Readiness Review report unless AI Readiness Review is purchased.",
      customerMessage:
        "We can operate monthly control from the evidence available. An AI Readiness Review report is recommended when you want the complete customer-facing explanation of the business gaps and priority reasoning.",
      conversionBackPath: "Recommend AI Readiness Review when monthly command quality would benefit from a deeper customer-facing review foundation.",
      entitlementLock: "Monthly command summaries only; AI Readiness Review report requires AI Readiness Review purchase.",
    },
    {
      key: "ai-readiness-review-without-signal-repair",
      customerAction: "Customer buys AI Readiness Review but declines Signal Repair.",
      fulfillmentRule:
        "Deliver the AI Readiness Review report and implementation recommendations, but do not perform done-for-you Signal Repair work.",
      customerMessage:
        "The report can show what should change and why. Signal Repair is the separate plan for doing the scoped improvement work with approval checkpoints.",
      conversionBackPath: "Recommend Signal Repair only when the AI Readiness Review identifies concrete implementation work that the customer wants handled for them.",
      entitlementLock: "Review artifacts only; done-for-you implementation requires Signal Repair purchase.",
    },
    {
      key: "free-scan-only",
      customerAction: "Customer uses Free Scan and declines paid plans.",
      fulfillmentRule:
        "Deliver the bounded free first-read report and helpful education. Do not provide AI Readiness Review depth, Signal Repair package, or Readiness Control.",
      customerMessage:
        "The free report gives a useful first read. Deeper review, implementation, and recurring control are separate paid scopes if you want more complete help.",
      conversionBackPath: "Recommend AI Readiness Review only when the first-read evidence supports deeper analysis.",
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
    "No AI Readiness Review report from Signal Repair unless AI Readiness Review entitlement exists.",
    "No Signal Repair implementation package from Readiness Control unless Signal Repair entitlement exists.",
    "No recurring monitoring from AI Readiness Review or Signal Repair unless Readiness Control entitlement exists.",
    "No full competitor teardown, complete funnel strategy, or implementation plan from Free Scan.",
    "No unpaid internal analysis becomes downloadable, emailed, report-vault-visible, dashboard-message-visible, PDF-attached, or customer-facing as a standalone artifact.",
    "No customer-facing output may imply a skipped plan was fully performed when only scoped internal orientation was used.",
    "No plan may use skipped-plan internal orientation to satisfy paid deliverables that belong to another plan.",
    "No warning email may imply a missing prerequisite is required for the purchased plan to begin if payment has already been accepted.",
  ],
  releaseRules: [
    "Every direct-purchase path must show purchased entitlement, skipped recommended plan, customer-facing limitation, internal-only orientation allowance, conversion-back path, dashboard-message mirror state, and safe-document delivery state.",
    "Every linear stop point must show completed entitlement, not-included scope, next best plan, follow-up cadence, and suppression rules.",
    "Report vault, dashboard, email, mirrored dashboard messages, downloadable PDFs, and notification surfaces must only expose artifacts included in the purchased plan entitlement.",
    "Release-captain review must reject outputs that give away unpaid reports, implementation packages, recurring control, unsafe PDFs, or out-of-scope analysis.",
    "Direct-purchase warning emails for Signal Repair and Readiness Control must be periodic, suppressible, evidence-backed, mirrored into the dashboard, and non-essential; they must not block fulfillment or create pressure.",
  ],
} as const;

export function getPlanEntitlementRoutingContract() {
  return PLAN_ENTITLEMENT_ROUTING_CONTRACT;
}
