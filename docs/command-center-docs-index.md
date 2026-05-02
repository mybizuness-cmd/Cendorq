# Command Center Docs Index

This private documentation index keeps the Command Center operating standards easy to find without exposing private records, evidence, intelligence, secrets, reports, prompts, scoring internals, customer data, or private customer conversation contents.

## Core standards

- `docs/maximum-protection-standard.md` — highest-protection security, data, AI, evidence, database, audit, emergency, and public-boundary standard.
- `docs/owner-maximum-protection-posture.md` — owner-facing maximum-protection operating posture for public/private boundaries, verified access, operator review, AI/automation limits, validation gates, rollback posture, and release-captain review.
- `docs/command-center-operator-runbook.md` — cockpit maintenance workflow for closed-by-default, metadata-only, server-rendered, registry-covered Command Center panels.
- `docs/admin-command-center-safe-projections.md` — admin command-center safe projection map for preview-gated, shared-access-backed, safe-options-backed, registry-contract-backed, route-contract-summary-backed, projection-link-count-backed, panel-contract-strip-backed, panel-summary-display-backed, no-store, read-only API index, summary, audit trail, mission brief, agent findings, and forecast escalation review surfaces.
- `docs/owner-operating-manual.md` — owner-level operating manual for evidence-backed reports, tailored plan fit, conversion moat, market learning, launch review, and post-build operating cadence.
- `docs/repo-update-scanning-automation.md` — repo update scanning automation standard for Dependabot, CodeQL workflow, dependency integrity, most-pristine, route-chain coverage, and release-captain review posture.
- `docs/controlled-continuous-evolution.md` — controlled continuous evolution standard for monitored, validated, reviewable, rollback-ready update proposals without uncontrolled production mutation or quality drift.
- `docs/controlled-maintenance.md` — controlled maintenance standard for safe update queues, review streams, validation gates, rollback planning, and audit-ready maintenance posture.

## Required source-of-truth areas

- Access gate: `src/lib/command-center/access.ts`
- Security posture: `src/lib/command-center/security-posture.ts`
- Panel registry: `src/lib/command-center/panel-registry.ts`
- Validation registry: `src/lib/command-center/validation-registry.ts`
- Admin command-center safe projection registry, route contract metadata, route contract summary, and projection link count: `src/lib/admin-command-center-safe-projection-registry.ts`
- Admin command-center safe access helper: `src/lib/admin-command-center-safe-access.ts`
- Admin command-center safe response and options helper: `src/lib/admin-command-center-safe-response.ts`
- Report truth engine: `src/lib/command-center/report-truth-engine.ts`
- Report evidence orchestration: `src/lib/command-center/report-evidence-orchestration.ts`
- Report evidence orchestration runtime: `src/lib/command-center/report-evidence-orchestration-runtime.ts`
- Report evidence record contracts: `src/lib/command-center/report-evidence-record-contracts.ts`
- Report evidence record runtime: `src/lib/command-center/report-evidence-record-runtime.ts`
- Report evidence record persistence runtime: `src/lib/command-center/report-evidence-record-persistence-runtime.ts`
- Report growth system: `src/lib/command-center/report-growth-system.ts`
- Controlled market learning: `src/lib/command-center/controlled-market-learning.ts`
- Controlled continuous evolution: `src/lib/controlled-continuous-evolution-contracts.ts`
- Controlled maintenance: `src/lib/controlled-maintenance-contracts.ts`
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

These paths are command-center-only and read-only review surfaces. They must remain preview-gated, shared-access-backed, safe-options-backed, no-store, registry-backed, registry-contract-backed, route-contract-summary-backed, projection-link-count-backed, panel-contract-strip-backed, panel-summary-display-backed, shared-response-backed, panel-visible, API-index-visible, and posture-only.

## Safe projection validation standard

`src/scripts/validate-admin-command-center-safe-projections-runbook.mjs` must keep coverage for the runbook structure, endpoint map, registry contract helpers, projection link count/completeness helpers, shared access helper, shared response/options helper, every admin projection route, and route-chain wiring. It must also keep the panel summary display tied to method count and all-helpers-required posture from `getAdminCommandCenterSafeProjectionRouteContractSummary`.

## Required private report evidence paths

- `src/app/api/command-center/report-evidence/orchestration/route.ts`
- `src/app/api/command-center/report-evidence/records/route.ts`
- `src/app/command-center/report-evidence-orchestration-panel.tsx`

These paths are command-center-only and safe-summary-only. They must not expose raw evidence, private evidence, provider payloads, customer data, private credentials, internal notes, operator identity, risk internals, attacker details, unsupported guarantees, or customer-facing report approvals. Report evidence record paths must remain append-only safe projection surfaces and must not create customer-facing output approval, paid recommendation approval, public report release approval, launch readiness approval, or security readiness approval.

## Full cockpit panel safety standard

`src/scripts/validate-command-center-panel-safety.mjs` must cover every current private cockpit panel rendered by `src/app/command-center/page.tsx`, including admin projections, launch readiness, owner workflow, plan delivery/routing, and report evidence records. Every command-center panel must remain server-rendered, metadata-only, private-gated, registry-aligned, free of browser storage, free of browser-only APIs, free of direct environment access, and blocked from raw/private payload fields, secret/token patterns, unsafe guarantee language, and public exposure drift.

## Route-chain integrity standard

`src/scripts/validate-routes-chain-integrity.mjs` must run first in `validate:routes`, preserve validator ordering, block duplicate validators, require high-risk guardrail files, verify maximum-protection standard coverage, verify CodeQL workflow integrity coverage, verify repo update scanning automation coverage, verify controlled continuous evolution coverage, and verify indirect report evidence validators remain centrally covered through `src/scripts/validate-report-evidence-record-runtime.mjs`. Indirect report evidence coverage must include `src/scripts/validate-report-evidence-record-persistence-runtime.mjs`, `src/scripts/validate-command-center-report-evidence-records-api.mjs`, the persistence runtime, the records API route, safe-summary-only posture, append-only safe projection mode, and raw evidence exposure blocking.

## Maximum protection standard

`src/scripts/validate-maximum-protection-standard.mjs` must keep `docs/maximum-protection-standard.md`, `src/lib/command-center/validation-registry.ts`, and `validate:routes` aligned with Cendorq's highest-protection doctrine. Maximum protection must preserve data classification, deny-by-default access, server-side private data handling, secret handling, exfiltration prevention, AI-agent containment, report protection, evidence protection, supply-chain protection, database protection, auditability, emergency controls, partner boundaries, and public doctrine boundaries without exposing private mechanics, client data, report internals, prompts, exact scoring weights, private evidence, or unrestricted report exports.

## Owner maximum protection posture

`src/scripts/validate-owner-maximum-protection-posture.mjs` must keep `docs/owner-maximum-protection-posture.md`, `docs/maximum-protection-standard.md`, the validation registry anchor, and `validate:routes` aligned with owner-level operating decisions. Owner maximum protection must preserve public/private boundaries, verified customer access, operator-only review, AI and automation approval limits, evidence separation, validation gates, rollback posture, release-captain review, and customer-safe language without exposing private mechanics or weakening launch, report, billing, provider, support, or customer-facing claim approval boundaries.

## CodeQL workflow integrity standard

`src/scripts/validate-codeql-workflow-integrity.mjs` must keep `.github/workflows/codeql.yml` on the approved main push, pull request, and weekly schedule triggers; minimal read permissions plus `security-events: write`; `actions/checkout@v6`; `github/codeql-action/init@v4`; `github/codeql-action/autobuild@v4`; `github/codeql-action/analyze@v4`; JavaScript/TypeScript analysis; and `security-extended,security-and-quality` queries. It must block older checkout/CodeQL action versions, broad write permissions, and `continue-on-error: true` drift.

## Repo update scanning automation standard

`src/scripts/validate-repo-update-scanning-automation.mjs` must keep `docs/repo-update-scanning-automation.md`, `.github/dependabot.yml`, `.github/workflows/codeql.yml`, `src/scripts/validate-codeql-workflow-integrity.mjs`, `src/scripts/validate-dependency-lockfile-integrity.mjs`, `src/scripts/validate-most-pristine-system-standard.mjs`, and `validate:routes` aligned. It must preserve Dependabot update groups, CodeQL v4, checkout v6, dependency integrity coverage, most-pristine coverage, and release-captain review posture without approving dependency updates, provider configuration, paid launch, public launch, security readiness, customer-facing reports, or customer-facing claims.

## Controlled continuous evolution standard

`src/scripts/validate-controlled-continuous-evolution.mjs` must keep `docs/controlled-continuous-evolution.md`, `src/lib/controlled-continuous-evolution-contracts.ts`, route-chain integrity, validation registry, docs index, operator runbook, owner operating manual, and most-pristine coverage aligned with monitored, validated, reviewable, reversible, rollback-ready updates. Automated systems may detect, propose, test, and prepare updates, but they must not auto-merge production-impacting code without green gates, skip Vercel, disable validation, hide failures, weaken safeguards, or mutate production without review. Continuous evolution must remain small-batch, preview-gated, rollback-ready, documented, owner-visible, and tied to route-chain integrity, validation registry, docs index, operator runbook, owner operating manual, and most-pristine coverage.

## Controlled maintenance standard

`src/scripts/validate-controlled-maintenance-contracts.mjs` must keep `docs/controlled-maintenance.md`, `src/lib/controlled-maintenance-contracts.ts`, and `validate:routes` aligned with safe update queues, review streams, validation gates, rollback planning, and audit-ready maintenance posture. Controlled maintenance may discover, classify, and queue updates, but no queued update may mutate production automatically. It must preserve dependency review, security advisory monitoring, validation registry checks, smoke-test scheduling, performance health checks, schema drift checks, route drift checks, content and claim drift checks, approval gates, rollback plans, audit records, and hard locks against raw/private exposure, validation bypass, approval bypass, uncontrolled production mutation, and unsupported outcome claims.

## Required cockpit validators

These validators must stay wired into `validate:routes`:

- `src/scripts/validate-routes-chain-integrity.mjs`
- `src/scripts/validate-maximum-protection-standard.mjs`
- `src/scripts/validate-owner-maximum-protection-posture.mjs`
- `src/scripts/validate-codeql-workflow-integrity.mjs`
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
- `src/scripts/validate-command-center-report-evidence-records-api.mjs`
- `src/scripts/validate-report-evidence-record-contracts.mjs`
- `src/scripts/validate-report-evidence-record-runtime.mjs`
- `src/scripts/validate-report-evidence-record-persistence-runtime.mjs`
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

When a new private cockpit panel, source-of-truth module, validator, report evidence standard, report evidence runtime, report evidence route, report evidence record API, report evidence record contract, report evidence record runtime, report evidence record persistence runtime, admin command-center projection, admin command-center route contract metadata, admin command-center route contract summary, admin command-center projection link count, admin command-center panel contract strip, admin command-center panel summary display, admin command-center access helper, admin command-center response or options helper, route-chain integrity rule, maximum protection rule, owner maximum-protection posture rule, repo update scanning automation rule, controlled continuous evolution rule, controlled maintenance rule, workflow integrity rule, or owner operating standard is added, update this index and its validation coverage in the same pull request. The index is metadata only and must never include secret values, live customer data, raw intelligence, raw evidence, billing records, report internals, prompts, scoring weights, audit-defense legal strategy beyond approved metadata anchors, private dashboard conversation text, or non-public quality-review details.
