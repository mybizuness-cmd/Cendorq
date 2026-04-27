export type CommandCenterPlanKey = "free-scan" | "deep-review" | "build-fix" | "ongoing-control";

export type CommandCenterPlanControlMode = "draft" | "preview" | "approved" | "paused";

export type CommandCenterPlanControl = {
  key: CommandCenterPlanKey;
  label: string;
  buyerPathLabel: string;
  controlMode: CommandCenterPlanControlMode;
  commandCenterPath: string;
  editableAreas: readonly string[];
  previewOutputs: readonly string[];
  testRunTypes: readonly string[];
  generatedRecordTypes: readonly string[];
  approvalGates: readonly string[];
  aiManagerCapabilities: readonly string[];
  proofStandards: readonly string[];
};

export const COMMAND_CENTER_PLAN_CONTROLS = [
  {
    key: "free-scan",
    label: "Free Scan Control",
    buyerPathLabel: "Free Scan",
    controlMode: "preview",
    commandCenterPath: "/command-center/plans/free-scan",
    editableAreas: ["intake questions", "scoring guidance", "routing rules", "buyer-facing summary", "follow-up recommendation"],
    previewOutputs: ["scan confirmation", "customer summary", "internal intake brief", "next-step recommendation"],
    testRunTypes: ["sample business intake", "duplicate intake check", "score-tier preview", "protected-read check"],
    generatedRecordTypes: ["intake submission", "business candidate", "contact candidate", "activity event"],
    approvalGates: ["copy review", "score-tier review", "private-data review", "send approval"],
    aiManagerCapabilities: ["summarize intake", "flag missing context", "draft next action", "prepare customer-safe explanation"],
    proofStandards: ["business identity evidence", "input completeness", "score rationale", "customer-safe recommendation"],
  },
  {
    key: "deep-review",
    label: "Deep Review Control",
    buyerPathLabel: "Deep Review",
    controlMode: "draft",
    commandCenterPath: "/command-center/plans/deep-review",
    editableAreas: ["audit sections", "evidence requirements", "report outline", "recommendation rules", "delivery checklist"],
    previewOutputs: ["report preview", "executive summary", "evidence checklist", "customer delivery email"],
    testRunTypes: ["sample report generation", "evidence completeness check", "client-safe summary check", "delivery preview"],
    generatedRecordTypes: ["report", "evidence record", "task", "report delivery"],
    approvalGates: ["evidence review", "recommendation review", "client-safe language review", "delivery approval"],
    aiManagerCapabilities: ["draft report sections", "compare evidence to claims", "flag weak recommendations", "prepare delivery notes"],
    proofStandards: ["every claim tied to evidence", "unsupported claims blocked", "customer impact explained", "report accuracy reviewed"],
  },
  {
    key: "build-fix",
    label: "Build Fix Control",
    buyerPathLabel: "Build Fix",
    controlMode: "draft",
    commandCenterPath: "/command-center/plans/build-fix",
    editableAreas: ["fix scope", "task templates", "priority rules", "before-after proof", "completion report"],
    previewOutputs: ["project plan", "task list", "before-after summary", "completion note"],
    testRunTypes: ["sample project buildout", "task dependency check", "scope consistency check", "completion preview"],
    generatedRecordTypes: ["project", "task", "file record", "outcome measurement"],
    approvalGates: ["scope review", "task review", "proof review", "completion approval"],
    aiManagerCapabilities: ["break work into tasks", "detect scope drift", "draft proof summary", "recommend next fix"],
    proofStandards: ["before-after proof", "task outcome evidence", "quality review", "customer value verified"],
  },
  {
    key: "ongoing-control",
    label: "Ongoing Control",
    buyerPathLabel: "Ongoing Control",
    controlMode: "draft",
    commandCenterPath: "/command-center/plans/ongoing-control",
    editableAreas: ["monthly cycle rules", "monitoring checklist", "recurring tasks", "progress report", "renewal signals"],
    previewOutputs: ["monthly plan", "progress summary", "risk brief", "next-month recommendation"],
    testRunTypes: ["sample monthly cycle", "recurring task check", "risk signal preview", "progress report preview"],
    generatedRecordTypes: ["monthly cycle", "task", "report", "outcome measurement"],
    approvalGates: ["cycle review", "progress review", "risk review", "customer update approval"],
    aiManagerCapabilities: ["summarize progress", "identify risks", "recommend next cycle", "draft customer update"],
    proofStandards: ["monthly activity proof", "progress evidence", "risk explanation", "next-step value verified"],
  },
] as const satisfies readonly CommandCenterPlanControl[];

export function getCommandCenterPlanControls() {
  return COMMAND_CENTER_PLAN_CONTROLS;
}

export function getCommandCenterPlanControl(key: CommandCenterPlanKey) {
  return COMMAND_CENTER_PLAN_CONTROLS.find((plan) => plan.key === key) ?? null;
}
