# Command Center Operator Runbook

This runbook defines how the private Cendorq Command Center should be maintained as the cockpit grows.

## Operating posture

The Command Center is a private, gated, metadata-only operating cockpit. It must remain closed by default and must not become a shortcut around production authentication, authorization, database isolation, file protection, billing controls, delivery review, automation signing, governance review, or intelligence review.

## Non-negotiable rules

- Keep the route as an access-control and panel-composition shell.
- Keep cockpit panels server-rendered unless a reviewed architecture decision explicitly permits otherwise.
- Keep panels metadata-only by default.
- Never expose secret values, customer records, raw evidence, raw intelligence, billing details, private reports, score inputs, prompts, or exact scoring weights from cockpit panels.
- Keep every visible cockpit panel represented in the panel registry.
- Keep every validation guard wired into `validate:routes`.
- Never claim that Cendorq is unhackable, risk-free, or perfectly secure.

## Change workflow

1. Add or update source-of-truth metadata in `src/lib/command-center/*`.
2. Add or update a dedicated server component in `src/app/command-center/*`.
3. Add or update the panel registry entry in `src/lib/command-center/panel-registry.ts`.
4. Add or update validators when the change creates a new boundary.
5. Confirm the change does not read secret values, customer records, or live private data in a panel.
6. Let Vercel and `validate:routes` pass before merging.

## Required validators

The Command Center protection posture depends on these validators remaining active:

- `validate-command-center-security-posture.mjs`
- `validate-command-center-panel-registry.mjs`
- `validate-command-center-panel-safety.mjs`
- `validate-command-center-readiness.mjs`
- `validate-command-center-schema.mjs`
- `validate-command-center-migrations.mjs`
- `validate-production-smoke-coverage.mjs`
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
- No public access, client-side bypass, or browser storage has been introduced.
- No private records, evidence, intelligence, reports, billing data, prompts, or score internals are exposed.
