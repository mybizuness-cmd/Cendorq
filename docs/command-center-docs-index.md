# Command Center Docs Index

This private documentation index keeps the Command Center operating standards easy to find without exposing private records, evidence, intelligence, secrets, reports, prompts, scoring internals, customer data, or private customer conversation contents.

## Core standards

- `docs/maximum-protection-standard.md` — highest-protection security, data, AI, evidence, database, audit, emergency, and public-boundary standard.
- `docs/command-center-operator-runbook.md` — cockpit maintenance workflow for closed-by-default, metadata-only, server-rendered, registry-covered Command Center panels.
- `docs/owner-operating-manual.md` — owner-level operating manual for evidence-backed reports, tailored plan fit, conversion moat, market learning, launch review, and post-build operating cadence.

## Required source-of-truth areas

- Access gate: `src/lib/command-center/access.ts`
- Security posture: `src/lib/command-center/security-posture.ts`
- Panel registry: `src/lib/command-center/panel-registry.ts`
- Validation registry: `src/lib/command-center/validation-registry.ts`
- Report truth engine: `src/lib/command-center/report-truth-engine.ts`
- Report growth system: `src/lib/command-center/report-growth-system.ts`
- Controlled market learning: `src/lib/command-center/controlled-market-learning.ts`
- Enterprise operating standard: `src/lib/command-center/enterprise-operating-standard.ts`
- Audit defense system: `src/lib/command-center/audit-defense-system.ts`
- Most-pristine system standard: `src/lib/command-center/most-pristine-system-standard.ts`
- Audit/report record contracts: `src/lib/command-center/audit-report-record-contracts.ts`
- Scale resilience standard: `src/lib/command-center/scale-resilience-standard.ts`
- Customer platform standard: `src/lib/command-center/customer-platform-standard.ts`
- Customer command experience standard: `src/lib/command-center/customer-command-experience-standard.ts`
- Conversion moat standard: `src/lib/command-center/conversion-moat-standard.ts`
- Insights conversation standard: `src/lib/command-center/insights-conversation-standard.ts`
- Readiness summary: `src/lib/command-center/readiness-summary.ts`
- Database readiness: `src/lib/command-center/database-readiness.ts`
- Auth readiness: `src/lib/command-center/auth-readiness.ts`
- File storage readiness: `src/lib/command-center/file-storage-readiness.ts`
- Billing readiness: `src/lib/command-center/billing-readiness.ts`
- Delivery readiness: `src/lib/command-center/delivery-readiness.ts`
- Automation readiness: `src/lib/command-center/automation-readiness.ts`
- Governance readiness: `src/lib/command-center/governance-readiness.ts`
- Intelligence readiness: `src/lib/command-center/intelligence-readiness.ts`
- Owner configuration evidence runtime: `src/lib/owner-configuration-evidence-runtime.ts`
- Owner configuration evidence persistence runtime: `src/lib/owner-configuration-evidence-persistence-runtime.ts`
- Owner configuration evidence approval workflow runtime: `src/lib/owner-configuration-evidence-approval-workflow-runtime.ts`

## Required private owner configuration paths

- `src/app/api/command-center/owner-configuration/evidence/route.ts`
- `src/app/api/command-center/owner-configuration/workflow/route.ts`
- `src/app/command-center/owner-configuration-evidence-panel.tsx`
- `src/app/command-center/owner-configuration-workflow-panel.tsx`

These paths are command-center-only and safe-summary-only. They must not create public launch approval, paid launch approval, report launch approval, provider configuration approval, payment mapping approval, security readiness approval, or customer-facing claims.

## Required cockpit validators

These validators must stay wired into `validate:routes`:

- `src/scripts/validate-command-center-security-posture.mjs`
- `src/scripts/validate-command-center-panel-registry.mjs`
- `src/scripts/validate-command-center-panel-safety.mjs`
- `src/scripts/validate-command-center-validation-registry.mjs`
- `src/scripts/validate-report-truth-engine.mjs`
- `src/scripts/validate-controlled-market-learning.mjs`
- `src/scripts/validate-enterprise-operating-standard.mjs`
- `src/scripts/validate-audit-defense-system.mjs`
- `src/scripts/validate-most-pristine-system-standard.mjs`
- `src/scripts/validate-report-record-contracts.mjs`
- `src/scripts/validate-scale-resilience-standard.mjs`
- `src/scripts/validate-customer-platform-standard.mjs`
- `src/scripts/validate-customer-experience-standard.mjs`
- `src/scripts/validate-conversion-moat-standard.mjs`
- `src/scripts/validate-insights-conversation-standard.mjs`
- `src/scripts/validate-command-center-operator-runbook.mjs`
- `src/scripts/validate-command-center-docs-index.mjs`
- `src/scripts/validate-owner-operating-manual.mjs`
- `src/scripts/validate-production-smoke-coverage.mjs`
- `src/scripts/validate-command-center-owner-configuration-evidence-api.mjs`
- `src/scripts/validate-command-center-owner-configuration-evidence-persistence.mjs`
- `src/scripts/validate-command-center-owner-configuration-evidence-approval-workflow.mjs`
- `src/scripts/validate-command-center-owner-configuration-workflow-api.mjs`
- `src/scripts/validate-command-center-owner-configuration-workflow-panel.mjs`
- `src/scripts/validate-command-center-owner-configuration-workflow-smoke.mjs`

## Maintenance rule

When a new private cockpit panel, source-of-truth module, validator, or owner operating standard is added, update this index and its validation coverage in the same pull request. The index is metadata only and must never include secret values, live customer data, raw intelligence, raw evidence, billing records, report internals, prompts, scoring weights, audit-defense legal strategy beyond approved metadata anchors, private dashboard conversation text, or non-public quality-review details.
