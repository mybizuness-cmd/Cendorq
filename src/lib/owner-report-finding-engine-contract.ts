import type { OwnerPublicPageAcquisitionProjection } from "./owner-public-page-acquisition-contract";
import type { OwnerReportTestPlanKey } from "./owner-report-test-mode-standard";

export type OwnerReportFindingClass =
  | "visibility-signal"
  | "trust-signal"
  | "conversion-signal"
  | "technical-readiness"
  | "content-clarity"
  | "risk-limitation"
  | "next-command";

export type OwnerReportFinding = {
  id: string;
  planKey: OwnerReportTestPlanKey;
  findingClass: OwnerReportFindingClass;
  title: string;
  summary: string;
  evidenceClass: "public-url" | "public-page-summary" | "public-screenshot-summary" | "owner-test-sample";
  confidence: "low" | "medium" | "high";
  confidenceReason: string;
  observed: readonly string[];
  inferred: readonly string[];
  limitations: readonly string[];
  nextCommand: string;
  customerSafe: true;
  ownerTestOnly: true;
  rawEvidenceReturned: false;
};

export type OwnerReportFindingEngineProjection = {
  ok: boolean;
  status: "ready" | "blocked";
  reason: string;
  findings: readonly OwnerReportFinding[];
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  rawEvidenceReturned: false;
  privateDataReturned: false;
};

const FINDING_CLASSES: readonly OwnerReportFindingClass[] = [
  "visibility-signal",
  "trust-signal",
  "conversion-signal",
  "technical-readiness",
  "content-clarity",
  "risk-limitation",
  "next-command",
];

export const OWNER_REPORT_FINDING_ENGINE_STANDARD = [
  "Findings must separate observed public signals, inferred business meaning, limitations, confidence, and next command.",
  "Findings must be customer-safe but owner-test-only until release gates approve a real report.",
  "Findings must never return raw HTML, raw screenshots, credentials, private customer data, or unsupported guarantees.",
  "Every plan preview must receive findings shaped to its plan boundary and value promise.",
] as const;

export function buildOwnerReportFindingEngineProjection(input: {
  acquisition: OwnerPublicPageAcquisitionProjection;
  companyName: string;
  companyUrl: string;
  planKeys: readonly OwnerReportTestPlanKey[];
}): OwnerReportFindingEngineProjection {
  if (!input.acquisition.ok || !input.acquisition.target) {
    return blocked(input.acquisition.reason || "acquisition-blocked");
  }

  const safeCompanyName = clean(input.companyName) || "Public company";
  const findings = input.planKeys.flatMap((planKey) => buildFindingsForPlan(planKey, safeCompanyName, input.acquisition.target.normalizedUrl));

  return {
    ok: findings.length > 0,
    status: findings.length > 0 ? "ready" : "blocked",
    reason: findings.length > 0 ? "owner-report-findings-ready" : "no-findings-generated",
    findings,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    rawEvidenceReturned: false,
    privateDataReturned: false,
  };
}

function buildFindingsForPlan(planKey: OwnerReportTestPlanKey, companyName: string, companyUrl: string): OwnerReportFinding[] {
  return FINDING_CLASSES.map((findingClass, index) => ({
    id: `owner-test-${planKey}-${findingClass}`,
    planKey,
    findingClass,
    title: titleFor(findingClass, companyName),
    summary: summaryFor(planKey, findingClass),
    evidenceClass: evidenceClassFor(index),
    confidence: index < 2 ? "high" : index < 5 ? "medium" : "low",
    confidenceReason: "Confidence is based on safe public acquisition readiness and owner-test sample structure, not private systems or guaranteed outcomes.",
    observed: [`${companyName} public URL accepted for owner-test preview.`, `Plan boundary: ${planKey}.`, `Public acquisition target: ${companyUrl}.`],
    inferred: [summaryFor(planKey, findingClass)],
    limitations: ["Owner test mode uses public evidence projections only.", "No private customer systems, credentials, analytics, ad accounts, or search-console data are inspected.", "This is not customer delivery and does not guarantee ranking, revenue, AI placement, security, or accuracy."],
    nextCommand: nextCommandFor(planKey, findingClass),
    customerSafe: true,
    ownerTestOnly: true,
    rawEvidenceReturned: false,
  }));
}

function titleFor(findingClass: OwnerReportFindingClass, companyName: string) {
  const label = findingClass.replace(/-/g, " ");
  return `${companyName} ${label}`;
}

function summaryFor(planKey: OwnerReportTestPlanKey, findingClass: OwnerReportFindingClass) {
  return `For ${planKey}, this ${findingClass.replace(/-/g, " ")} finding tells the owner what the public surface appears to communicate and what should be reviewed next.`;
}

function nextCommandFor(planKey: OwnerReportTestPlanKey, findingClass: OwnerReportFindingClass) {
  if (planKey === "free-scan") return `Use the ${findingClass.replace(/-/g, " ")} signal to decide whether a deeper review is worth running.`;
  if (planKey === "deep-review") return `Turn the ${findingClass.replace(/-/g, " ")} finding into a prioritized evidence-backed review item.`;
  if (planKey === "build-fix") return `Scope a safe fix for the ${findingClass.replace(/-/g, " ")} gap before implementation approval.`;
  return `Monitor the ${findingClass.replace(/-/g, " ")} trend and carry it into the next control cycle.`;
}

function evidenceClassFor(index: number): OwnerReportFinding["evidenceClass"] {
  if (index === 0) return "public-url";
  if (index <= 2) return "public-page-summary";
  if (index <= 4) return "public-screenshot-summary";
  return "owner-test-sample";
}

function blocked(reason: string): OwnerReportFindingEngineProjection {
  return {
    ok: false,
    status: "blocked",
    reason,
    findings: [],
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    rawEvidenceReturned: false,
    privateDataReturned: false,
  };
}

function clean(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
}
