import type { PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export type PlanIntelligenceAcquisitionContract = {
  planKey: PlanValueKey;
  planName: string;
  customerQuestion: string;
  acquisitionGoal: string;
  minimumInputs: readonly string[];
  bestInputs: readonly string[];
  evidenceToCollect: readonly string[];
  contextToClarify: readonly string[];
  informationToReject: readonly string[];
  analysisMethod: readonly string[];
  outputStructure: readonly string[];
  deliveryStandard: string;
  valueMaximizer: readonly string[];
  planSpecificFailureMode: string;
  escalationPath: string;
};

export const PLAN_INTELLIGENCE_ACQUISITION_SYSTEM = [
  {
    planKey: "free-scan",
    planName: "Free Scan",
    customerQuestion: "What is the first visible signal that may be costing customer choices?",
    acquisitionGoal: "Collect only enough public and customer-provided context to produce a useful first signal without pretending to diagnose the full cause.",
    minimumInputs: ["business name", "business URL", "customer email", "primary offer", "target customer", "main goal or concern", "desired customer action"],
    bestInputs: ["market or location", "known competitor", "current traffic source", "best customer type", "what has already been tried"],
    evidenceToCollect: ["first-screen clarity", "public proof signals", "CTA path", "visible contact path", "offer explanation", "local/search/AI discoverability clues"],
    contextToClarify: ["who the customer wants more of", "what action matters most", "what page or offer is being judged", "whether the customer wants diagnosis or implementation"],
    informationToReject: ["passwords", "card data", "private keys", "raw analytics exports", "private customer lists", "unsupported revenue claims", "full-site rebuild requests"],
    analysisMethod: ["inspect visible customer-facing evidence", "separate observed from inferred", "choose one highest-leverage signal", "label confidence and limitations", "route to the right next plan"],
    outputStructure: ["first signal", "visible evidence boundary", "customer impact", "confidence label", "limitation", "best next action"],
    deliveryStandard: "Dashboard-only protected result at /dashboard/reports/free-scan unless a separate export is approved later.",
    valueMaximizer: ["be useful in the first minute", "avoid overwhelming the customer", "show why paid diagnosis may or may not be worth it", "make the next action obvious"],
    planSpecificFailureMode: "Free Scan fails when it becomes a shallow teaser, a full diagnosis, or a generic checklist instead of a sharp first signal.",
    escalationPath: "Escalate to Deep Review when the first signal matters enough that the exact cause needs evidence-backed diagnosis.",
  },
  {
    planKey: "deep-review",
    planName: "Deep Review",
    customerQuestion: "What is the real cause behind customer hesitation, and what should be fixed first?",
    acquisitionGoal: "Collect enough public, customer-provided, comparative, and journey evidence to produce cause-level diagnosis and priority without doing implementation work.",
    minimumInputs: ["active Deep Review entitlement", "verified customer ownership", "business URL", "primary offer", "target customer", "main conversion action", "known concern", "Free Scan result when available"],
    bestInputs: ["top landing pages", "competitor references", "customer objections", "recent changes", "sales or lead quality notes", "review examples", "analytics summary without raw secrets"],
    evidenceToCollect: ["message hierarchy", "offer specificity", "proof strength", "decision friction", "mobile action path", "competitor positioning gap", "trust gaps", "visibility/search intent mismatch"],
    contextToClarify: ["what the business wants more of", "which customer segment matters most", "which offer has highest priority", "what has already been attempted", "what decision the owner needs to make after the report"],
    informationToReject: ["unverified absolute claims", "guaranteed revenue promises", "private credentials", "payment data", "raw customer PII", "implementation requests disguised as diagnosis", "ad management requests"],
    analysisMethod: ["map symptoms to probable causes", "separate evidence, inference, and uncertainty", "compare customer promise against proof and action path", "prioritize by customer-decision impact", "mark Build Fix fit or not fit"],
    outputStructure: ["executive diagnosis", "cause map", "evidence-backed findings", "priority order", "confidence and limits", "fix direction", "Build Fix fit", "correction/support path"],
    deliveryStandard: "Dashboard report copy at /dashboard/reports plus approved customer-safe PDF attachment in the delivery email after deep-review-report-release.",
    valueMaximizer: ["make the customer feel the cause is finally clear", "prevent expensive wrong fixes", "rank what matters first", "explain what not to do yet", "turn diagnosis into a safe decision"],
    planSpecificFailureMode: "Deep Review fails when it becomes generic advice, implementation work, or a long audit without cause-level priority.",
    escalationPath: "Escalate to Build Fix only when the diagnosis identifies a scoped improvement ready for implementation.",
  },
  {
    planKey: "build-fix",
    planName: "Build Fix",
    customerQuestion: "What specific weak point can be improved now, and what must stay in scope?",
    acquisitionGoal: "Collect implementation-ready context, approved business details, constraints, and baseline evidence so Cendorq can fix a defined weakness without turning into unlimited work.",
    minimumInputs: ["active Build Fix entitlement", "verified customer ownership", "approved fix target", "business URL or destination", "primary CTA", "approved business details", "scope confirmation"],
    bestInputs: ["Deep Review diagnosis", "before-state screenshot or description", "brand/voice constraints", "proof assets", "offer details", "technical access boundary", "approval contact", "must-not-change list"],
    evidenceToCollect: ["current weak page/message/action path", "customer promise", "proof assets", "CTA friction", "mobile layout problem", "scope boundary", "before-state baseline", "approval requirements"],
    contextToClarify: ["what exactly is being changed", "what is not being changed", "who approves customer-facing output", "where implementation happens", "what risk or dependency could block delivery"],
    informationToReject: ["unbounded redesign requests", "full-site rebuild expectations", "monthly monitoring requests", "unclear root-cause speculation", "private credentials in chat", "ad account management", "guaranteed performance claims"],
    analysisMethod: ["confirm scope before work", "turn diagnosis into implementation target", "align copy/proof/action path to customer decision", "preserve before-after evidence", "prepare customer-safe delivery summary"],
    outputStructure: ["approved scope", "work completed", "why it changed", "before-after summary", "remaining risks", "what stayed out of scope", "Ongoing Control fit", "support path"],
    deliveryStandard: "Dashboard report copy at /dashboard/reports plus approved customer-safe PDF attachment in the delivery email after build-fix-customer-output-approval.",
    valueMaximizer: ["change the highest-leverage scoped weakness", "avoid guesswork implementation", "make the improvement obvious", "document remaining risks", "protect the customer from scope creep"],
    planSpecificFailureMode: "Build Fix fails when it becomes unlimited implementation, starts before scope clarity, or fixes symptoms without a clear target.",
    escalationPath: "Escalate to Ongoing Control when the customer needs recurring watch, trend review, and monthly decision support after the fix.",
  },
  {
    planKey: "ongoing-control",
    planName: "Ongoing Control",
    customerQuestion: "What changed this month, what matters now, and what should be watched or acted on next?",
    acquisitionGoal: "Collect recurring, comparable monthly evidence and decision context so the customer gets control, trend awareness, alerts, and next-priority guidance without confusing it with unlimited implementation.",
    minimumInputs: ["active Ongoing Control subscription", "verified customer ownership", "monitoring scope", "monthly priority", "business URL", "notification preference", "review cadence"],
    bestInputs: ["previous report history", "monthly business priority", "known risk list", "recent site/content changes", "customer feedback", "competitor movement", "search/local/AI visibility notes", "Build Fix history"],
    evidenceToCollect: ["monthly priority status", "visible website changes", "proof/trust changes", "CTA or page friction changes", "visibility/search posture changes", "new risks", "regressions", "trend comparison against prior month"],
    contextToClarify: ["what changed since last review", "which priority matters this month", "whether any alert needs action", "whether a scoped Build Fix is warranted", "which issue should not distract this month"],
    informationToReject: ["unlimited implementation asks", "full Deep Review expectation every month", "ad management requests", "ranking guarantees", "AI placement guarantees", "raw private datasets", "unsupported performance attribution"],
    analysisMethod: ["compare against prior month", "separate signal from noise", "label trend confidence", "surface regressions early", "choose one next monthly priority", "mark Build Fix escalation fit or not fit"],
    outputStructure: ["monthly summary", "what changed", "what stayed stable", "priority risk", "trend confidence", "next-month decision", "Build Fix escalation if needed", "support path"],
    deliveryStandard: "Dashboard report copy at /dashboard/reports plus approved customer-safe PDF attachment in the monthly email after ongoing-control-monthly-review-gate.",
    valueMaximizer: ["give the owner calm control", "make changes comparable over time", "prevent small regressions from becoming expensive", "choose one clear monthly priority", "separate monitoring from implementation"],
    planSpecificFailureMode: "Ongoing Control fails when it becomes generic monthly noise, unlimited Build Fix, repeated full diagnosis, or unsupported performance attribution.",
    escalationPath: "Escalate to Build Fix when monitoring identifies a concrete scoped improvement that needs implementation.",
  },
] as const satisfies readonly PlanIntelligenceAcquisitionContract[];

export const PLAN_INTELLIGENCE_ACQUISITION_RULES = [
  "Every plan must collect only the information required for that plan's outcome and reject information that would blur the plan boundary.",
  "The same customer input must be interpreted differently by plan: first signal for Free Scan, cause diagnosis for Deep Review, implementation scope for Build Fix, and monthly trend control for Ongoing Control.",
  "Information gathering must start with customer value, not internal checklist completion.",
  "Every plan must separate minimum inputs from best inputs so the customer can start without friction but Cendorq can still request higher-confidence context.",
  "Every plan must explicitly reject secrets, private credentials, payment data, raw customer PII, unsupported claims, fake urgency, and guaranteed outcomes.",
  "Every plan must produce a structured customer output that matches the plan value, delivery standard, approval gate, and escalation path.",
  "Build Fix must not start production work until the fix target, approved business details, scope boundary, and approval contact are clear.",
  "Ongoing Control must compare current evidence against history and choose a monthly priority instead of creating generic status noise.",
] as const;

export function getPlanIntelligenceAcquisitionContract(planKey: PlanValueKey) {
  return PLAN_INTELLIGENCE_ACQUISITION_SYSTEM.find((contract) => contract.planKey === planKey) || PLAN_INTELLIGENCE_ACQUISITION_SYSTEM[0];
}

export function projectPlanIntelligenceAcquisition(planKey: PlanValueKey) {
  const contract = getPlanIntelligenceAcquisitionContract(planKey);
  return {
    planKey: contract.planKey,
    planName: contract.planName,
    customerQuestion: contract.customerQuestion,
    acquisitionGoal: contract.acquisitionGoal,
    requiredStart: contract.minimumInputs,
    bestContext: contract.bestInputs,
    evidenceToCollect: contract.evidenceToCollect,
    reject: contract.informationToReject,
    method: contract.analysisMethod,
    output: contract.outputStructure,
    deliveryStandard: contract.deliveryStandard,
    valueMaximizer: contract.valueMaximizer,
    failureMode: contract.planSpecificFailureMode,
    escalationPath: contract.escalationPath,
  } as const;
}
