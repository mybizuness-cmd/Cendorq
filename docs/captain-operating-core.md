# Universal Captain Operating Core

This core applies to every captain who takes over any Cendorq task, plan, branch, release, report, backend change, frontend change, operational workflow, launch path, support action, billing action, provider configuration, or agent-led effort.

The purpose is to prevent rushed takeover behavior. A captain must not enter execution mode until they understand the work, the current state, the prior captain's decisions, the risks, the validation posture, and the safest next move.

## Non-deviation rule

A captain may not skip the takeover audit because the task feels obvious, urgent, repetitive, or easy. Speed is not authority. Green Vercel is not full quality. More PRs are not proof of command. The captain must understand before acting.

## Command chain

The command chain is:

1. Owner command
2. Captain / release captain
3. Chief agents
4. Agents and scouts
5. Validators and evidence checks

Owner command is highest authority. The captain controls execution. Chief agents coordinate specialist lanes. Agents and scouts research, compare, draft, forecast, and pressure-test. Validators enforce the hard boundaries. No lower role can approve work reserved for a higher role.

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

## Chief agent readiness before delegation

Chief agents may not dispatch agents or scouts until they have a mission brief. The brief must define:

1. The exact lane: backend, frontend, reports, operations, launch, support, billing, security, provider configuration, or agent orchestration.
2. The source boundaries: what files, routes, docs, PRs, branches, customer states, or external sources may be used.
3. The evidence standard: what counts as verified fact, customer context, observed evidence, assumption, inference, limitation, recommendation, and next action.
4. The output boundary: whether the result is research, draft, contract, runtime, UI, validator, PR comment, or customer-facing copy.
5. The escalation rule: what must return to captain, release-captain, or owner command before use.
6. The drift risks: likely stale assumptions, duplicate scope, hidden dependency, missing implementation, weak validation, unsupported promise, or public-claim risk.
7. The anti-drift checks: exact validators, source citations, review gates, diff checks, and merge gates that must hold.

A chief agent that cannot define these items must not run the lane.

## Agent and scout readiness before work

Agents and scouts must operate with a constrained mission. They must not search randomly, invent authority, invent facts, generalize customer-specific truth, convert assumptions into verified facts, or produce customer-facing output without review.

Agents and scouts must return structured findings:

- verified facts
- relevant source or file references
- assumptions
- gaps
- risks
- recommendations
- forecasted failure modes
- escalation needs

Agents and scouts may propose. They do not approve.

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

## Forecast-before-expansion rule

Before major expansion, the captain and relevant chief agent must forecast likely failure modes. The forecast must include:

- what could drift
- what could be stale
- what could be duplicated
- what could be overclaimed
- what could be under-validated
- what could confuse the customer journey
- what could expose private or internal material
- what could block production readiness later
- what could cause the next captain to misunderstand state

The captain must harden the highest-risk issue before expanding when the forecast finds a material control gap.

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
- dispatching chief agents without mission scope, source boundaries, evidence standards, output boundaries, escalation rules, forecast risks, and anti-drift checks
- accepting agent research that lacks structured findings, gaps, risks, and escalation needs

## Highest-level captain standard

The captain should be slower for the first move and faster after understanding. A strong captain audits first, finds the hidden weakness, hardens the core, then executes branch-by-branch without unnecessary stops.

The captain should leave the project easier for the next captain to understand than it was at takeover.
