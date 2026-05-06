import {
  getPlanIntelligenceAcquisitionContract,
  PLAN_INTELLIGENCE_ACQUISITION_RULES,
  type PlanIntelligenceAcquisitionContract,
} from "@/lib/plan-intelligence-acquisition-system";
import type { PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export type PlanIntelligenceInputState = "captured" | "missing" | "optional" | "blocked";

export type PlanIntelligenceIntakeFieldRecord = {
  label: string;
  state: PlanIntelligenceInputState;
  customerReason: string;
};

export type PlanIntelligenceIntakeRecord = {
  planKey: PlanValueKey;
  planName: string;
  recordKey: string;
  acquisitionQuestion: string;
  acquisitionGoal: string;
  completionState: "ready-to-start" | "needs-more-context" | "blocked-by-safety";
  minimumInputs: readonly PlanIntelligenceIntakeFieldRecord[];
  bestInputs: readonly PlanIntelligenceIntakeFieldRecord[];
  missingMinimumInputs: readonly string[];
  capturedMinimumInputs: readonly string[];
  evidenceToCollect: readonly string[];
  contextToClarify: readonly string[];
  rejectedInformation: readonly string[];
  analysisMethod: readonly string[];
  outputStructure: readonly string[];
  deliveryStandard: string;
  nextWorkflowAction: string;
  unsafeInputWarning: string;
  valueMaximizer: readonly string[];
};

export type ProjectPlanIntelligenceIntakeRecordInput = {
  planKey: PlanValueKey;
  capturedFields?: readonly string[];
  blockedFields?: readonly string[];
  recordKey?: string;
};

const INPUT_REASONS: Partial<Record<PlanValueKey, string>> = {
  "free-scan": "Needed to make the first signal useful without collecting private data.",
  "deep-review": "Needed to improve diagnostic confidence and prevent generic advice.",
  "build-fix": "Needed before scoped implementation can start safely.",
  "ongoing-control": "Needed to keep monthly review comparable and decision-focused.",
};

export const PLAN_INTELLIGENCE_INTAKE_RECORD_RULES = [
  "Every plan intake record must attach to one plan-specific acquisition contract.",
  "Every intake record must separate captured minimum inputs, missing minimum inputs, optional best inputs, and blocked unsafe inputs.",
  "Every intake record must carry the plan-specific evidence to collect, context to clarify, analysis method, output structure, delivery standard, and next workflow action.",
  "Free Scan records must be allowed to start with lower friction but must still reject secrets, payment data, private credentials, and unrelated raw evidence.",
  "Deep Review records must request richer context only to improve diagnosis and must not collect implementation scope as if Build Fix were included.",
  "Build Fix records must block production work until fix target, approved business details, scope boundary, and approval contact are clear.",
  "Ongoing Control records must require monitoring scope, monthly priority, cadence, and history posture before monthly control is treated as active.",
  "No intake record can treat customer claims as verified facts, raw payloads as customer-safe evidence, or missing required context as final delivery readiness.",
  ...PLAN_INTELLIGENCE_ACQUISITION_RULES,
] as const;

export function projectPlanIntelligenceIntakeRecord(input: ProjectPlanIntelligenceIntakeRecordInput): PlanIntelligenceIntakeRecord {
  const contract = getPlanIntelligenceAcquisitionContract(input.planKey);
  const captured = normalizeFieldSet(input.capturedFields || []);
  const blocked = normalizeFieldSet(input.blockedFields || []);
  const minimumInputs = contract.minimumInputs.map((field) => projectField(contract, field, captured, blocked, "minimum"));
  const bestInputs = contract.bestInputs.map((field) => projectField(contract, field, captured, blocked, "best"));
  const missingMinimumInputs = minimumInputs.filter((field) => field.state === "missing").map((field) => field.label);
  const capturedMinimumInputs = minimumInputs.filter((field) => field.state === "captured").map((field) => field.label);
  const hasBlocked = [...minimumInputs, ...bestInputs].some((field) => field.state === "blocked");

  return {
    planKey: contract.planKey,
    planName: contract.planName,
    recordKey: input.recordKey || `${contract.planKey}-intake-record`,
    acquisitionQuestion: contract.customerQuestion,
    acquisitionGoal: contract.acquisitionGoal,
    completionState: hasBlocked ? "blocked-by-safety" : missingMinimumInputs.length ? "needs-more-context" : "ready-to-start",
    minimumInputs,
    bestInputs,
    missingMinimumInputs,
    capturedMinimumInputs,
    evidenceToCollect: contract.evidenceToCollect,
    contextToClarify: contract.contextToClarify,
    rejectedInformation: contract.informationToReject,
    analysisMethod: contract.analysisMethod,
    outputStructure: contract.outputStructure,
    deliveryStandard: contract.deliveryStandard,
    nextWorkflowAction: nextWorkflowAction(contract, missingMinimumInputs, hasBlocked),
    unsafeInputWarning: "Do not collect passwords, private keys, session tokens, card data, bank details, raw customer PII, raw provider payloads, or unrelated private evidence.",
    valueMaximizer: contract.valueMaximizer,
  };
}

export function projectFreeScanIntakeRecordFromPayload(payload: Record<string, unknown>, recordKey?: string) {
  const capturedFields = [
    payload.businessName ? "business name" : "",
    payload.websiteUrl ? "business URL" : "",
    payload.email ? "customer email" : "",
    payload.primaryOffer ? "primary offer" : "",
    payload.audience ? "target customer" : "",
    payload.biggestIssue ? "main goal or concern" : "",
    payload.biggestIssue || payload.notes ? "desired customer action" : "",
    payload.country || payload.stateRegion || payload.city ? "market or location" : "",
    payload.competitors ? "known competitor" : "",
    payload.notes ? "what has already been tried" : "",
  ].filter(Boolean);

  return projectPlanIntelligenceIntakeRecord({
    planKey: "free-scan",
    capturedFields,
    blockedFields: detectUnsafeIntakeFields(payload),
    recordKey,
  });
}

export function detectUnsafeIntakeFields(payload: Record<string, unknown>) {
  const text = Object.values(payload).filter((value): value is string => typeof value === "string").join(" ").toLowerCase();
  const blocked: string[] = [];
  if (/password|passcode|login|credential/.test(text)) blocked.push("passwords");
  if (/card number|credit card|cvv|routing number|bank account/.test(text)) blocked.push("card data");
  if (/private key|secret key|api key|token|session/.test(text)) blocked.push("private keys");
  if (/customer list|patient list|client list|raw export/.test(text)) blocked.push("raw customer PII");
  return blocked;
}

function projectField(contract: PlanIntelligenceAcquisitionContract, label: string, captured: ReadonlySet<string>, blocked: ReadonlySet<string>, importance: "minimum" | "best"): PlanIntelligenceIntakeFieldRecord {
  const normalized = normalizeField(label);
  const state: PlanIntelligenceInputState = blocked.has(normalized)
    ? "blocked"
    : captured.has(normalized)
      ? "captured"
      : importance === "best"
        ? "optional"
        : "missing";

  return {
    label,
    state,
    customerReason: INPUT_REASONS[contract.planKey] || "Needed to make this plan's output useful and bounded.",
  };
}

function nextWorkflowAction(contract: PlanIntelligenceAcquisitionContract, missingMinimumInputs: readonly string[], hasBlocked: boolean) {
  if (hasBlocked) return `Block unsafe intake for ${contract.planName}; ask the customer for a safe summary instead.`;
  if (missingMinimumInputs.length) return `Request missing ${contract.planName} context: ${missingMinimumInputs.join(", ")}.`;
  if (contract.planKey === "build-fix") return "Confirm scope and approval contact before production work starts.";
  if (contract.planKey === "ongoing-control") return "Confirm monitoring cadence, monthly priority, and comparison baseline before the first cycle.";
  return `Start ${contract.planName} analysis using the plan-specific evidence and output structure.`;
}

function normalizeFieldSet(fields: readonly string[]) {
  return new Set(fields.map(normalizeField).filter(Boolean));
}

function normalizeField(field: string) {
  return field.trim().toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ");
}
