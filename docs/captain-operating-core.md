# Universal Captain Operating Core

This core applies to every captain who takes over any Cendorq task, plan, branch, release, report, backend change, frontend change, operational workflow, launch path, support action, billing action, provider configuration, or agent-led effort.

The purpose is to prevent rushed takeover behavior. A captain must not enter execution mode until they understand the work, the current state, the prior captain's decisions, the risks, the validation posture, and the safest next move.

## Non-deviation rule

A captain may not skip the takeover audit because the task feels obvious, urgent, repetitive, or easy. Speed is not authority. Green Vercel is not full quality. More PRs are not proof of command. The captain must understand before acting.

## Captain readiness before control

Before controlling any project lane, the captain must be trained on and able to restate:

1. Owner command and decision authority.
2. Current main, current branch, open PRs, and deployment state.
3. What was already merged and why.
4. What previous captains attempted, skipped, or left unresolved.
5. The customer journey affected by the work.
6. The backend, frontend, data, validation, operations, and release surfaces affected by the work.
7. The privacy, safety, billing, support, report, provider, and launch boundaries affected by the work.
8. The highest-risk weak areas before expansion.
9. The exact validation and review gates required before merge.
10. The reason the next layer is the correct next layer.

If any of those are unclear, the captain must audit rather than build.

## Universal takeover checklist

Every takeover starts with this sequence:

1. Read the handoff or prior work summary.
2. Verify current main and deployment status.
3. Verify active branch status.
4. Check open PRs and stale branches.
5. Compare roadmap intent against actual merged code.
6. Identify whether the next task affects backend, frontend, reports, operations, billing, support, launch, provider configuration, or agents.
7. Inspect the existing relevant contracts, runtimes, pages, APIs, and validators.
8. Identify missing hardening before adding new scope.
9. Decide whether to patch a weakness first or continue the planned roadmap.
10. State the operating decision in the work artifacts when it changes project direction.

## Backend captain rules

Backend captains must verify data boundaries, server-only authority, route behavior, no-store requirements, redirect allowlists, persistence shape, API input validation, output projection safety, audit creation, error states, idempotency, and rollback posture.

Backend captains must not add endpoints that expose raw customer data, raw evidence, provider payloads, provider responses, secrets, tokens, internal notes, operator identities, or cross-customer data.

## Frontend captain rules

Frontend captains must verify route fit, customer journey, CTA destinations, empty states, loading states, mobile behavior, trust language, accessibility basics, visual hierarchy, and whether the UI implies work is complete when it is only a contract or pending state.

Frontend captains must not create dark patterns, fake urgency, unsupported outcome promises, or internal-tool clutter on public buyer surfaces.

## Report captain rules

Report captains must preserve separation between verified facts, customer context, observed evidence, assumptions, inferences, limitations, confidence, recommendations, and next actions.

Report captains must not present pending, draft, correction-requested, unavailable, or unapproved work as final truth. Reports require release-captain review before customer-facing delivery.

## Operations captain rules

Operations captains must preserve owner command, release-captain review, audit records, role gates, approval gates, safe internal notes, customer-safe projections, and no blind merge behavior.

Operations captains must treat support, billing, security, provider configuration, launch readiness, maintenance, and agent output as controlled operating lanes with explicit approval gates.

## Launch captain rules

Launch captains must verify auth provider readiness, payment mapping, webhook entitlement verification, production smoke target, rollback plan, audit plan, protected runtime configuration, security posture, support identity, launch contact identity, and Vercel status before launch claims.

Launch captains must not describe production readiness as complete when placeholders, missing environment configuration, pending smoke tests, or owner approvals remain.

## Agent captain rules

Agents and scouts may research, compare, draft, forecast, and pressure-test. They may not approve merges, launches, reports, provider configuration, billing decisions, security readiness, or customer-facing claims.

A captain must review agent output before it becomes customer-facing, production-affecting, billing-affecting, provider-affecting, report-affecting, or launch-affecting.

## Reported-control rule

When a captain takes over, the work artifacts should make it clear that the captain audited first. The captain should record the review posture through docs, contracts, validators, PR descriptions, or branch-level decisions when the risk is material.

## Anti-patterns that are blocked

- continuing because prior work looked plausible
- adding features before checking open PRs
- merging stale work without triage
- treating Vercel green as product quality
- treating contracts as live product behavior
- adding UI without route and validation fit
- adding backend routes without data and audit boundaries
- expanding report output before release gates exist
- letting agents approve or mutate production-impacting work
- making claims that outpace implementation
- ignoring mobile, empty states, recovery states, or visual QA
- skipping owner-level review when billing, launch, provider, security, or report claims change

## Highest-level captain standard

The captain should be slower for the first move and faster after understanding. A strong captain audits first, finds the hidden weakness, hardens the core, then executes branch-by-branch without unnecessary stops.

The captain should leave the project easier for the next captain to understand than it was at takeover.
