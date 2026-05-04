# Command Center Operator Runbook

This runbook defines how the private Cendorq Command Center should be maintained as the cockpit grows.

## Operating posture

The Command Center is a private, gated, metadata-only operating cockpit. It must remain closed by default and must not become a shortcut around production authentication, authorization, database isolation, file protection, billing controls, delivery review, automation signing, governance review, intelligence review, security workflow integrity, dependency integrity, repo update scanning integrity, controlled continuous evolution integrity, or controlled maintenance integrity.

## Non-negotiable rules

- Keep the route as an access-control and panel-composition shell.
- Keep cockpit panels server-rendered unless a reviewed architecture decision explicitly permits otherwise.
- Keep panels metadata-only by default.
- Never expose secret values, customer records, raw evidence, raw intelligence, billing details, private reports, score inputs, prompts, or exact scoring weights from cockpit panels.
- Keep every visible cockpit panel represented in the panel registry.
- Keep every validation guard wired into `validate:routes`.
- Keep `validate-routes-chain-integrity.mjs` first in `validate:routes`.
- Keep `validate-codeql-workflow-integrity.mjs` centrally covered by route-chain integrity.
- Keep `validate-dependency-lockfile-integrity.mjs` centrally covered by route-chain integrity.
- Keep `validate-repo-update-scanning-automation.mjs` centrally covered by route-chain integrity.
- Keep `validate-controlled-continuous-evolution.mjs` centrally covered by route-chain integrity.
- Keep `validate-controlled-maintenance-contracts.mjs` wired into `validate:routes` and represented in the validation registry.
- Keep indirect high-risk report evidence validators centrally covered by `validate-report-evidence-record-runtime.mjs` when they are intentionally not listed directly in the giant route chain.
- Never claim that Cendorq is unhackable, risk-free, or perfectly secure.

## Owner configuration evidence workflow

Owner configuration evidence must remain private, command-center-only, and safe-summary-only.

Required owner configuration paths:

- `src/app/api/command-center/owner-configuration/evidence/route.ts`
- `src/app/api/command-center/owner-configuration/workflow/route.ts`
- `src/lib/owner-configuration-evidence-runtime.ts`
- `src/lib/owner-configuration-evidence-persistence-runtime.ts`
- `src/lib/owner-configuration-evidence-approval-workflow-runtime.ts`
- `src/app/command-center/owner-configuration-evidence-panel.tsx`
- `src/app/command-center/owner-configuration-workflow-panel.tsx`

Owner configuration evidence may record safe summaries, safe hashes, owner approval posture, and release-captain review posture. It must not expose raw provider payloads, protected config values, private credentials, customer data, private audit payloads, operator private identity, or cross-customer data.

Missing, pending, or blocked evidence is incomplete. Owner evidence alone never creates public launch approval, paid launch approval, report launch approval, provider configuration approval, payment mapping approval, security readiness approval, or customer-facing claims. Release captain remains the final validator, and release-captain review tracking still does not create launch approval by itself.

## Route-chain integrity workflow

Route-chain integrity is the first validator in `validate:routes` and protects the validator system itself.

Required route-chain integrity rules:

- `src/scripts/validate-routes-chain-integrity.mjs` must run before all other route validators.
- `src/scripts/validate-routes.mjs` must run immediately after route-chain integrity.
- Duplicate validators are blocked.
- High-risk validator files must exist.
- Ordering between security, panel, report evidence, owner workflow, launch readiness, smoke, and closed-intelligence checks must stay protected.
- CodeQL workflow integrity must remain covered through the first route-chain integrity validator.
- Dependency lockfile integrity must remain covered through the first route-chain integrity validator.
- Repo update scanning automation must remain covered through the first route-chain integrity validator.
- Controlled continuous evolution must remain covered through the first route-chain integrity validator.
- Controlled maintenance must remain wired through the route chain and represented in the validation registry.
- Indirect report evidence validators must not become orphaned when they are covered through the already-wired runtime validator.

Required CodeQL workflow integrity coverage:

- `src/scripts/validate-codeql-workflow-integrity.mjs`
- `.github/workflows/codeql.yml`
- `actions/checkout@v6`
- `github/codeql-action/init@v4`
- `github/codeql-action/autobuild@v4`
- `github/codeql-action/analyze@v4`
- `security-extended,security-and-quality`
- minimal read permissions plus `security-events: write`

The CodeQL workflow must keep main push, pull request, and weekly schedule triggers; JavaScript/TypeScript analysis; current approved action versions; and failing security analysis. It must not drift toward older action versions, broad write permissions, or `continue-on-error: true`.

Required dependency lockfile integrity coverage:

- `src/scripts/validate-dependency-lockfile-integrity.mjs`
- `docs/dependency-lockfile-integrity.md`
- `package.json`
- `pnpm-lock.yaml`
- package manager `pnpm@9.15.9`
- Node engine `>=24.0.0`
- current approved core dependency ranges
- current resolved lockfile dependency anchors

The package and lockfile posture must stay aligned. Dependency updates must not merge with unreviewed package-manager, Node-engine, validate-route-chain, package-range, lockfile-resolution, or dependency-integrity-documentation drift.

Required repo update scanning automation coverage:

- `src/scripts/validate-repo-update-scanning-automation.mjs`
- `docs/repo-update-scanning-automation.md`
- `.github/dependabot.yml`
- `.github/workflows/codeql.yml`
- `src/scripts/validate-codeql-workflow-integrity.mjs`
- `src/scripts/validate-dependency-lockfile-integrity.mjs`
- `src/scripts/validate-most-pristine-system-standard.mjs`
- `package.json`
- `validate:routes`
- `actions/checkout@v6`
- `github/codeql-action/init@v4`
- `github/codeql-action/autobuild@v4`
- `github/codeql-action/analyze@v4`
- Dependabot groups including `controlled-update`, `next-react-platform`, and `typescript-tooling`

Repo update scanning automation is protective and advisory only. It must not approve dependency updates, provider configuration, paid launch, public launch, security readiness, customer-facing reports, or customer-facing claims. Updates still require release-captain review, green validation, Vercel success, mergeability confirmation, and a guarded squash merge with the expected head SHA.

Required controlled continuous evolution coverage:

- `src/scripts/validate-controlled-continuous-evolution.mjs`
- `src/lib/controlled-continuous-evolution-contracts.ts`
- `src/scripts/validate-most-pristine-system-standard.mjs`
- `src/scripts/validate-routes-chain-integrity.mjs`
- `src/lib/command-center/validation-registry.ts`

Controlled continuous evolution is the approved way to keep Cendorq improving after launch. Automated systems may detect, propose, test, and prepare updates, but they must not auto-merge production-impacting code without green gates, skip Vercel, disable validation, hide failures, weaken safeguards, or mutate production without review. Continuous updates must remain small-batch, preview-gated, rollback-ready, documented, reviewable, and traceable.

Required controlled maintenance coverage:

- `src/scripts/validate-controlled-maintenance-contracts.mjs`
- `docs/controlled-maintenance.md`
- `src/lib/controlled-maintenance-contracts.ts`
- `src/lib/command-center/validation-registry.ts`
- `docs/command-center-docs-index.md`
- `validate:routes`

Controlled maintenance may discover, classify, and queue dependency, security, smoke, performance, schema, route, content, and claim updates, but no queued update may mutate production automatically. Maintenance releases require validation, approval state, rollback planning, and an audit reason. Maintenance output must remain safe-projection-only and must not expose private customer data, raw evidence, internal notes, protected operational material, or other sensitive material.

Required indirect report evidence validator coverage:

- `src/scripts/validate-report-evidence-record-persistence-runtime.mjs`
- `src/scripts/validate-command-center-report-evidence-records-api.mjs`
- `src/scripts/validate-report-evidence-record-runtime.mjs`
- `src/lib/command-center/report-evidence-record-persistence-runtime.ts`
- `src/app/api/command-center/report-evidence/records/route.ts`

The runtime validator must continue to verify safe-summary-only input, append-only safe projection mode, records API route coverage, persistence runtime coverage, and raw evidence exposure blocking.

## Change workflow

1. Add or update source-of-truth metadata in `src/lib/command-center/*`.
2. Add or update a dedicated server component in `src/app/command-center/*`.
3. Add or update the panel registry entry in `src/lib/command-center/panel-registry.ts`.
4. Add or update validators when the change creates a new boundary.
5. Confirm the change does not read secret values, customer records, or live private data in a panel.
6. Let Vercel and `validate:routes` pass before merging.

## Required validators

The Command Center protection posture depends on these validators remaining active:

- `validate-routes-chain-integrity.mjs`
- `validate-codeql-workflow-integrity.mjs`
- `validate-dependency-lockfile-integrity.mjs`
- `validate-repo-update-scanning-automation.mjs`
- `validate-controlled-continuous-evolution.mjs`
- `validate-controlled-maintenance-contracts.mjs`
- `validate-command-center-security-posture.mjs`
- `validate-command-center-panel-registry.mjs`
- `validate-command-center-panel-safety.mjs`
- `validate-command-center-readiness.mjs`
- `validate-command-center-schema.mjs`
- `validate-command-center-migrations.mjs`
- `validate-command-center-validation-registry.mjs`
- `validate-report-truth-engine.mjs`
- `validate-command-center-docs-index.mjs`
- `validate-report-evidence-record-runtime.mjs`
- `validate-report-evidence-record-persistence-runtime.mjs`
- `validate-command-center-report-evidence-records-api.mjs`
- `validate-production-smoke-coverage.mjs`
- `validate-command-center-owner-configuration-evidence-api.mjs`
- `validate-command-center-owner-configuration-evidence-persistence.mjs`
- `validate-command-center-owner-configuration-evidence-approval-workflow.mjs`
- `validate-command-center-owner-configuration-workflow-api.mjs`
- `validate-command-center-owner-configuration-workflow-panel.mjs`
- `validate-command-center-owner-configuration-workflow-smoke.mjs`
- `validate-closed-intelligence.mjs`

## Panel standards

Every cockpit panel should answer:

- What operator decision does this support?
- What data class is being shown?
- Why is this safe to show in a metadata-only cockpit?
- What is blocked until production auth, database, and review gates are active?
- Which validator prevents regression?

## Registry standards

Each visible private panel must have a registry entry with:

- stable key
- label
- increasing order
- cockpit layer
- `private-gated` visibility
- `metadata-only` exposure
- operator purpose
- protection note

No visible cockpit panel should be merged without a matching registry entry.

## Emergency response

If a cockpit change risks exposing private data, immediately:

1. Stop the merge or revert the release.
2. Keep the route closed by default.
3. Remove the risky panel or replace it with metadata-only status.
4. Rotate any potentially exposed secret.
5. Add a validator that would have caught the failure.
6. Record the incident and owner in governance tracking when durable storage is active.

## Final check before merge

Before merging any Command Center change, confirm:

- Vercel is green.
- The route remains a composition shell.
- Panels remain server-rendered and metadata-only.
- The panel registry covers all visible panels.
- Route-chain integrity runs first and CodeQL workflow integrity remains centrally covered.
- Route-chain integrity runs first and dependency lockfile integrity remains centrally covered.
- Route-chain integrity runs first and repo update scanning automation remains centrally covered.
- Route-chain integrity runs first and controlled continuous evolution remains centrally covered.
- Controlled maintenance stays wired into `validate:routes` and represented in the validation registry.
- Route-chain integrity runs first and indirect report evidence validators remain centrally covered.
- No public access, client-side bypass, or browser storage has been introduced.
- No private records, evidence, intelligence, reports, billing data, prompts, or score internals are exposed.
