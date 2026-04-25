# Cendorq Final Hardening Sweep

Use this document before major production milestones, backend handoffs, launch-adjacent changes, or broad readiness reviews.

The goal is simple: run separate review passes that look for different kinds of quality gaps before a change is considered solid.

## Three independent deep analyses

Run these as separate reviews, not as one blended pass.

### Analysis 1: Buyer-path and conversion review

Focus only on whether a real buyer can understand and move through the public path:

- Homepage points clearly to the Free Scan.
- Plans are easy to compare.
- Deep Review, Build Fix, and Ongoing Control are distinct.
- Connect is easy to reach when a buyer needs conversation first.
- CTAs are clear, honest, and destination-matched.
- No page adds clutter, competing paths, or internal-tool language.

### Analysis 2: Production safety and operations review

Focus only on whether the system is safe to ship and operate:

- Canonical routes remain protected.
- Legacy routes redirect into the current buyer path.
- Health and smoke checks still make sense.
- Security, policy, privacy, and configuration surfaces stay aligned.
- Release notes and checklist gates are current.
- Error states are visible, recoverable, and safe.

### Analysis 3: Maintenance and future-backend review

Focus only on whether future work can be added without confusion:

- Checklist governance is consistent and easy to extend.
- Route validation remains readable enough to maintain.
- Backend handoff expectations are clear before ZIP intake.
- Environment and integration expectations are documented.
- Manual QA expectations are explicit.
- Future work is not described as already complete.

## Five independent hardening passes

Run these after the three analyses.

### Hardening pass 1: Route and discovery hardening

Check canonical routes, redirects, sitemap, robots, manifest, `llms.txt`, security contact, and public navigation.

### Hardening pass 2: Language and trust hardening

Check buyer language, offer clarity, public claims, guarantees, policy language, stale labels, and credibility cues.

### Hardening pass 3: Privacy and configuration hardening

Check forms, analytics, logs, environment examples, public/private config boundaries, and safe placeholder values.

### Hardening pass 4: Integration and backend-readiness hardening

Check third-party services, API handoffs, backend ZIP intake, error states, health checks, smoke checks, and rollback expectations.

### Hardening pass 5: Manual QA and release hardening

Check browser review, mobile review, buyer-path walkthrough, acceptance criteria, changelog entries, CI, and post-deploy smoke expectations.

## Required evidence before merge

Before merging broad readiness changes, confirm:

- `pnpm validate:routes` passes.
- `pnpm lint` passes.
- `pnpm typecheck` passes.
- `pnpm build` passes.
- The PR template includes the relevant checklist gates.
- The changelog records meaningful governance or production-readiness changes.
- The release checklist remains aligned with the current buyer path.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting readiness work, also run after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use final hardening work as a reason to add:

- vague signoff language
- unreviewed backend behavior
- unclear follow-up promises
- public claims that are not supportable
- homepage clutter
- technical language that reduces buyer clarity
