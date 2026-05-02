# Command Center Docs Index

This private documentation index keeps the Command Center operating standards easy to find without exposing private records, evidence, intelligence, secrets, reports, prompts, scoring internals, customer data, or private customer conversation contents.

## Core standards

- `docs/maximum-protection-standard.md` — highest-protection security, data, AI, evidence, database, audit, emergency, and public-boundary standard.
- `docs/command-center-operator-runbook.md` — cockpit maintenance workflow for closed-by-default, metadata-only, server-rendered, registry-covered Command Center panels.
- `docs/admin-command-center-safe-projections.md` — admin command-center safe projection map for preview-gated, shared-access-backed, safe-options-backed, registry-contract-backed, route-contract-summary-backed, panel-contract-strip-backed, panel-summary-display-backed, no-store, read-only API index, summary, audit trail, mission brief, agent findings, and forecast escalation review surfaces.
- `docs/owner-operating-manual.md` — owner-level operating manual for evidence-backed reports, tailored plan fit, conversion moat, market learning, launch review, and post-build operating cadence.

## Required source-of-truth areas

- Access gate: `src/lib/command-center/access.ts`
- Security posture: `src/lib/command-center/security-posture.ts`
- Panel registry: `src/lib/command-center/panel-registry.ts`
- Validation registry: `src/lib/command-center/validation-registry.ts`
- Admin command-center safe projection registry, route contract metadata, and route contract summary: `src/lib/admin-command-center-safe-projection-registry.ts`
- Admin command-center safe access helper: `src/lib/admin-command-center-safe-access.ts`
- Admin command-center safe response and options helper: `src/lib/admin-command-center-safe-response.ts`
- Report truth engine: `src/lib/command-center/report-truth-engine.ts`
- Report evidence orchestration: `src/lib/command-center/report-evidence-orchestration.ts`
- Report evidence orchestration runtime: `src/lib/command-center/report-evidence-orchestration-runtime.ts`
- Report evidence record contracts: `src/lib/command-center/report-evidence-record-contracts.ts`
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

## Required admin command-center projection paths

- `src/app/api/admin/command-center/route.ts`
- `src/app/api/admin/command-center/summary/route.ts`
- `src/app/api/admin/command-center/audit/route.ts`
- `src/app/api/admin/command-center/mission-brief/route.ts`
- `src/app/api/admin/command-center/agent-findings/route.ts`
- `src/app/api/admin/command-center/forecast-escalation/route.ts`
- `src/app/command-center/admin-command-center-control-panel.tsx`

These paths are command-center-only and read-only review surfaces. They must remain preview-gated, shared-access-backed, safe-options-backed, no-store, registry-backed, registry-contract-backed, route-contract-summary-backed, panel-contract-strip-backed, panel-summary-display-backed, shared-response-backed, panel-visible, API-index-visible, and posture-only.

## Safe projection validation standard

`src/scripts/validate-admin-command-center-safe-projections-runbook.mjs` must keep coverage for the runbook structure, endpoint map, registry contract helpers, shared access helper, shared response/options helper, every admin projection route, and route-chain wiring. It must also keep the panel summary display tied to method count and all-helpers-required posture from `getAdminCommandCenterSafeProjectionRouteContractSummary`.

## Required private report evidence paths

- `src/app/api/command-center/report-evidence/orchestration/route.ts`
- `src/app/command-center/report-evidence-orchestration-panel.tsx`

These paths are command-center-only and safe-summary-only. They must not expose raw evidence, private evidence, provider payloads, customer data, private credentials, internal notes, operator identity, risk internals, attacker details, unsupported guarantees, or customer-facing report approvals.

## Required cockpit validators

These validators must stay wired into `validate:routes`:

- `src/scripts/validate-command-center-security-posture.mjs`
- `src/scripts/validate-command-center-panel-registry.mjs`
- `src/scripts/validate-command-center-panel-safety.mjs`
- `src/scripts/validate-command-center-validation-registry.mjs`
- `src/scripts/validate-admin-command-center-projection-registry.mjs`
- `src/scripts/validate-admin-command-center-safe-response.mjs`
- `src/scripts/validate-admin-command-center-safe-projections-runbook.mjs`
- `src/scripts/validate-admin-command-center-api-index.mjs`
- `src/scripts/validate-admin-command-center-safe-summary-api.mjs`
- `src/scripts/validate-admin-command-center-audit-trail-api.mjs`
- `src/scripts/validate-admin-command-center-mission-brief-api.mjs`
- `src/scripts/validate-admin-command-center-agent-findings-api.mjs`
- `src/scripts/validate-admin-command-center-forecast-escalation-api.mjs`
- `src/scripts/validate-report-truth-engine.mjs`
- `src/scripts/validate-report-evidence-orchestration.mjs`
- `src/scripts/validate-report-evidence-orchestration-runtime.mjs`
- `src/scripts/validate-command-center-report-evidence-orchestration-panel.mjs`
- `src/scripts/validate-command-center-report-evidence-orchestration-api.mjs`
- `src/scripts/validate-report-evidence-record-contracts.mjs`
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

When a new private cockpit panel, source-of-truth module, validator, report evidence standard, report evidence runtime, report evidence route, report evidence record contract, admin command-center projection, admin command-center route contract metadata, admin command-center route contract summary, admin command-center panel contract strip, admin command-center panel summary display, admin command-center access helper, admin command-center response or options helper, or owner operating standard is added, update this index and its validation coverage in the same pull request. The index is metadata only and must never include secret values, live customer data, raw intelligence, raw evidence, billing records, report internals, prompts, scoring weights, audit-defense legal strategy beyond approved metadata anchors, private dashboard conversation text, or non-public quality-review details.
