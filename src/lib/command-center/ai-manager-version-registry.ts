export type AiManagerVersionStatus = "candidate" | "testing" | "approved" | "retired";

export type AiManagerVersionRegistryItem = {
  key: string;
  label: string;
  status: AiManagerVersionStatus;
  modelProviderLabel: string;
  modelFamilyLabel: string;
  promptPolicyVersion: string;
  evaluationPolicyVersion: string;
  scoringPolicyVersion: string;
  reportPolicyVersion: string;
  requiredRegressionSuites: readonly string[];
  promotionGates: readonly string[];
  retirementTriggers: readonly string[];
};

export const AI_MANAGER_VERSION_REGISTRY = [
  {
    key: "default-candidate",
    label: "Default Candidate AI Manager",
    status: "candidate",
    modelProviderLabel: "configurable-provider",
    modelFamilyLabel: "current-approved-frontier-model",
    promptPolicyVersion: "prompt-policy-v1",
    evaluationPolicyVersion: "evaluation-policy-v1",
    scoringPolicyVersion: "scoring-policy-v1",
    reportPolicyVersion: "report-policy-v1",
    requiredRegressionSuites: ["free-scan", "deep-review", "build-fix", "ongoing-control", "benchmark-comparison", "customer-safe-language"],
    promotionGates: ["unsupported-claim check", "evidence-link check", "customer-safe-language check", "operator approval", "regression comparison"],
    retirementTriggers: ["quality regression", "unsafe output", "unsupported claim increase", "policy mismatch", "better approved version available"],
  },
] as const satisfies readonly AiManagerVersionRegistryItem[];

export function getAiManagerVersionRegistry() {
  return AI_MANAGER_VERSION_REGISTRY;
}

export function getApprovedAiManagerVersion() {
  return AI_MANAGER_VERSION_REGISTRY.find((item) => item.status === "approved") ?? null;
}
