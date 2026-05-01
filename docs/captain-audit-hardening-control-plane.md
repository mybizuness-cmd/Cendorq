# Captain Audit Hardening Control Plane

This document is the operating gate that prevents Cendorq captain work from turning into blind feature marching.

It exists because the captain must understand the previous state, current main, open risks, validation posture, customer journey, product strategy, and safety boundaries before continuing large work.

## Authority model

Owner command is above the captain. The captain leads execution. Agents, scouts, validators, and generated contracts are subordinate to captain review and cannot approve customer-facing output, provider configuration, launch readiness, billing policy, security readiness, or merge decisions.

## Required takeover sequence

A captain takeover is not complete until these checks are performed and recorded in the working plan:

1. Verify latest main and Vercel status.
2. Verify active branch status and whether it is identical, ahead, behind, or conflicted.
3. Review open pull requests for relevance, staleness, duplicate risk, dependency risk, and merge safety.
4. Review the handoff packet and compare it to current GitHub state.
5. Review current roadmap position against what has actually merged.
6. Identify weak areas before adding new features.
7. Patch the highest-risk weakness first when it affects future work quality.
8. Continue branch-by-branch only after the audit state is understood.

## Three independent reviews

### Buyer path and conversion review

Check that the homepage points to Free Scan, /free-check remains the focused intake room, plans are distinct, Deep Review, Build Fix, and Ongoing Control do not blur, CTAs match destinations, public copy avoids internal-tool clutter, and conversion uses proof, clarity, stage fit, and trust.

### Production safety and operations review

Check protected routes, redirects, no-store responses, health and smoke posture, support/billing/report safety, customer-owned projections, token boundaries, provider boundaries, owner approval gates, release-captain gates, and safe recovery states.

### Maintenance and backend-readiness review

Check validation maintainability, route-chain coverage, backend handoff expectations, environment placeholders, integration assumptions, smoke expectations, rollback expectations, manual QA expectations, and whether future work is accidentally described as already complete.

## Five hardening passes

### Pass 1: Route and discovery hardening

Review canonical routes, redirects, sitemap, robots, manifest, llms.txt, security.txt, public navigation, footer links, health endpoint, and customer platform route gates.

### Pass 2: Language and trust hardening

Review buyer language, offer clarity, public claims, credibility cues, policy language, stale labels, unsupported proof, vague overpromising, and forbidden guarantee wording.

### Pass 3: Privacy and configuration hardening

Review forms, analytics, logs, environment examples, server-only values, public/private configuration boundaries, safe placeholders, customer-owned projections, and no browser-carried authority.

### Pass 4: Integration and backend-readiness hardening

Review third-party services, API handoffs, provider email boundaries, payment mapping readiness, webhook assumptions, backend ZIP intake, error states, health checks, smoke checks, and service assumptions.

### Pass 5: Manual QA and release hardening

Review browser QA, mobile QA, buyer-path walkthrough, dashboard/report-vault walkthrough, support/billing paths, acceptance criteria, changelog entries, Vercel status, post-deploy smoke expectations, and release history.

## Weak-area registry

The current known weak areas that must guide next work are:

1. Validation has many phrase-based checks and needs more behavior-oriented runtime tests over time.
2. Architecture contracts are ahead of some live implementation surfaces.
3. Admin command center needs an integrated RBAC, audit, approval, and safe notes foundation before more operator UI expansion.
4. Older open PRs must be triaged before they are merged, revived, or ignored.
5. Visual quality needs browser and mobile review beyond Vercel build success.
6. Production readiness still needs real auth provider configuration, payment mapping, webhook entitlement verification, smoke target confirmation, rollback posture, and production audit history.
7. Live provider email sending is intentionally not active and must remain blocked until provider configuration, owner approval, approved adapter, and audit coverage are complete.
8. Report generation needs deeper persistence, evidence record integration, conflict scoring, confidence scoring, release workflow, and HTML/PDF parity before it is treated as complete.
9. Agent orchestration is not yet a production actor and must remain under captain-level validation and approval gates.
10. Any future backend ZIP intake must be inspected before code runs or files are merged.

## Mandatory branch loop

Every meaningful change must use this loop:

1. Fresh branch from latest merged main.
2. Smallest valuable coherent layer.
3. Runtime, contract, UI, or docs change as needed.
4. Validation added or updated.
5. Relevant validation chain wired or indirectly covered.
6. Diff reviewed before PR.
7. PR opened.
8. Vercel checked.
9. Exact failure patched without weakening safeguards.
10. Merge only when Vercel is green and PR is mergeable.
11. Continue immediately unless there is a real external block.

## Safe language and no-leak boundaries

The captain must pursue maximum accuracy, protection, and business quality internally while never using impossible customer-facing guarantees.

Do not claim guaranteed accuracy, guaranteed revenue, guaranteed ROI, guaranteed inbox placement, guaranteed deliverability, guaranteed security outcome, impossible-to-hack status, never-liable status, liability-free status, guaranteed refund, guaranteed report change, guaranteed billing outcome, or guaranteed legal outcome.

Customer-facing and browser-safe surfaces must not expose private payloads, private evidence, security-sensitive material, private billing material, internal notes, operator identities, risk internals, threat details, prompt or system material, secrets, tokens, provider payloads, provider responses, or cross-customer data.

## Current post-audit operating decision

The correct continuation point after the already-merged customer operations layers is admin command center foundation, but only after this audit control plane is merged. The admin foundation must be safe-first: RBAC, audit logs, approval gates, safe internal notes, read/write separation, and no customer-secret leakage.
