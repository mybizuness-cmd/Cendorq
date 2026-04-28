export type CommandCenterValidationRegistryItem = {
  key: string;
  label: string;
  scriptPath: string;
  category: "route" | "security" | "schema" | "cockpit" | "ai" | "smoke" | "docs";
  requiredInValidateRoutes: true;
  protectedBoundary: string;
  failureMeaning: string;
};

export const COMMAND_CENTER_VALIDATION_REGISTRY = [
  {
    key: "command-center-migrations",
    label: "Command Center migrations",
    scriptPath: "src/scripts/validate-command-center-migrations.mjs",
    category: "schema",
    requiredInValidateRoutes: true,
    protectedBoundary: "migration files and database bootstrap shape",
    failureMeaning: "Schema or migration boundaries drifted from the expected Command Center foundation.",
  },
  {
    key: "command-center-schema",
    label: "Command Center schema",
    scriptPath: "src/scripts/validate-command-center-schema.mjs",
    category: "schema",
    requiredInValidateRoutes: true,
    protectedBoundary: "protected tables, relationships, and audit anchors",
    failureMeaning: "The durable data model no longer matches the private operating system contract.",
  },
  {
    key: "command-center-readiness",
    label: "Command Center readiness",
    scriptPath: "src/scripts/validate-command-center-readiness.mjs",
    category: "route",
    requiredInValidateRoutes: true,
    protectedBoundary: "required server-side configuration and protected data areas",
    failureMeaning: "A required readiness area, protected scope, or server configuration guard is missing.",
  },
  {
    key: "security-posture",
    label: "Security posture",
    scriptPath: "src/scripts/validate-command-center-security-posture.mjs",
    category: "security",
    requiredInValidateRoutes: true,
    protectedBoundary: "defense-in-depth, denied public exposure, and route composition shell",
    failureMeaning: "A security posture or route-composition guard has regressed.",
  },
  {
    key: "panel-registry",
    label: "Panel registry coverage",
    scriptPath: "src/scripts/validate-command-center-panel-registry.mjs",
    category: "cockpit",
    requiredInValidateRoutes: true,
    protectedBoundary: "visible cockpit panel to registry-key mapping",
    failureMeaning: "A visible panel is missing from the private metadata-only registry or ordering changed unsafely.",
  },
  {
    key: "panel-safety",
    label: "Panel safety",
    scriptPath: "src/scripts/validate-command-center-panel-safety.mjs",
    category: "cockpit",
    requiredInValidateRoutes: true,
    protectedBoundary: "server-rendered metadata-only cockpit panels",
    failureMeaning: "A panel introduced client-only behavior, browser storage, direct environment access, or exposure regression.",
  },
  {
    key: "validation-registry",
    label: "Validation registry",
    scriptPath: "src/scripts/validate-command-center-validation-registry.mjs",
    category: "cockpit",
    requiredInValidateRoutes: true,
    protectedBoundary: "guardrail script existence, validate:routes wiring, and validation-registry metadata",
    failureMeaning: "A required validator is missing, unwired, or no longer represented in the validation registry.",
  },
  {
    key: "report-truth-engine",
    label: "Report truth engine",
    scriptPath: "src/scripts/validate-report-truth-engine.mjs",
    category: "ai",
    requiredInValidateRoutes: true,
    protectedBoundary: "evidence-first reports, minimum-input enrichment, traceable calculations, confidence labels, plan conversion rules, and report growth standards",
    failureMeaning: "Report generation can no longer be proven evidence-backed, calculation-traceable, uncertainty-labeled, visually official, social-platform-aware, and truthful about plan recommendations.",
  },
  {
    key: "controlled-market-learning",
    label: "Controlled market learning",
    scriptPath: "src/scripts/validate-controlled-market-learning.mjs",
    category: "ai",
    requiredInValidateRoutes: true,
    protectedBoundary: "market trend learning, Cendorq leverage discovery, privacy-safe aggregation, review-gated self-evolution, and strict agent boundaries",
    failureMeaning: "Market learning or self-evolution may have become unsupported, privacy-unsafe, unreviewed, unversioned, or vulnerable to agent drift.",
  },
  {
    key: "operator-runbook",
    label: "Operator runbook",
    scriptPath: "src/scripts/validate-command-center-operator-runbook.mjs",
    category: "docs",
    requiredInValidateRoutes: true,
    protectedBoundary: "documented operator maintenance standard",
    failureMeaning: "The runbook no longer documents the closed-by-default metadata-only operating rules.",
  },
  {
    key: "docs-index",
    label: "Docs index",
    scriptPath: "src/scripts/validate-command-center-docs-index.mjs",
    category: "docs",
    requiredInValidateRoutes: true,
    protectedBoundary: "discoverable standards, source-of-truth files, and guardrail validators",
    failureMeaning: "The private documentation index no longer points operators to required standards and guards.",
  },
  {
    key: "optimization-method-library",
    label: "Optimization method library",
    scriptPath: "src/scripts/validate-optimization-method-library.mjs",
    category: "ai",
    requiredInValidateRoutes: true,
    protectedBoundary: "evidence-backed method controls and customer-safe rules",
    failureMeaning: "Approved optimization methods drifted away from evidence-backed, plan-scoped guardrails.",
  },
  {
    key: "customer-output-approval",
    label: "Customer output approval",
    scriptPath: "src/scripts/validate-customer-output-approval.mjs",
    category: "ai",
    requiredInValidateRoutes: true,
    protectedBoundary: "review, preview, block-condition, and audit requirements before customer send",
    failureMeaning: "Customer-facing output can no longer be proven review-gated and approval-controlled.",
  },
  {
    key: "ai-manager-command-queue",
    label: "AI manager command queue",
    scriptPath: "src/scripts/validate-ai-manager-command-queue.mjs",
    category: "ai",
    requiredInValidateRoutes: true,
    protectedBoundary: "AI command context, guard, and blocked-action policy",
    failureMeaning: "AI manager commands drifted toward unsafe actions or missing review gates.",
  },
  {
    key: "ai-manager-command-history",
    label: "AI manager command history",
    scriptPath: "src/scripts/validate-ai-manager-command-history.mjs",
    category: "ai",
    requiredInValidateRoutes: true,
    protectedBoundary: "AI command audit trail and retention-state metadata",
    failureMeaning: "AI command history no longer captures required review, block, audit, or retention metadata.",
  },
  {
    key: "production-smoke-coverage",
    label: "Production smoke coverage",
    scriptPath: "src/scripts/validate-production-smoke-coverage.mjs",
    category: "smoke",
    requiredInValidateRoutes: true,
    protectedBoundary: "production smoke checks, closed routes, and guardrail synchronization",
    failureMeaning: "Production smoke coverage no longer verifies required public, protected, and documentation guards.",
  },
  {
    key: "closed-intelligence",
    label: "Closed intelligence",
    scriptPath: "src/scripts/validate-closed-intelligence.mjs",
    category: "security",
    requiredInValidateRoutes: true,
    protectedBoundary: "private intelligence, raw evidence, and gated AI surfaces",
    failureMeaning: "Private intelligence or raw evidence boundaries may have become publicly exposed.",
  },
] as const satisfies readonly CommandCenterValidationRegistryItem[];

export function getCommandCenterValidationRegistry() {
  return COMMAND_CENTER_VALIDATION_REGISTRY;
}
