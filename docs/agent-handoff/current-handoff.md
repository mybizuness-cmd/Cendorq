# Cendorq Current Agent Handoff

## Operating posture

Cendorq is a category-control company, not a generic agency site and not a normal SaaS signup funnel. The product must optimize for qualified business acquisition, evidence, paid next steps, and protected customer continuity.

Work in controlled batches, keep user updates short, and verify green deployment checks before moving to the next implementation batch.

## Current branch

- Repository: `mybizuness-cmd/Cendorq`
- Branch: `presence-report-homepage-batch`
- Pull request: #1035, `Install Presence Report homepage batch`
- Legacy validation marker: `next-1017`
- Latest checked head at handoff: `19a04ff4246dc2b5432d3380edc0abe1559fe207`
- Latest checked status at handoff: CI green, Release Control green, CodeQL green, and Vercel green.
- Base alignment at handoff: `main` is not ahead of the branch; the branch is ahead of `main` by 265 commits.
- PR state at handoff: open, draft, mergeable, and no blocking submitted reviews or review threads found.

## Business doctrine

Free Scan creates the customer. Customer Access brings the customer back. Provider buttons verify identity. Cendorq records decide access. Known customers continue to dashboard. Unknown people go to Free Scan. No blank accounts.

The customer-facing flow is:

1. Start Free Scan.
2. Submit real business details.
3. Create account from the scan or paid action.
4. Open protected result, plan, billing, support, and next action in the dashboard.
5. Paid path moves through Review, Repair, and Control.

## Access doctrine

Customer Access is one system, not separate signup/login/create-workspace paths.

- Secure email access checks existing customer eligibility before sending access.
- Free Scan is the active eligibility source today.
- Paid plan, report vault, billing, and support are contract-ready eligibility sources until durable server-side ownership stores are wired.
- `resolveCustomerAccessEligibility` is the customer access gate for secure email access and same-email recovery.
- Provider access must stay hidden until the real callback and session runtime are ready.
- Provider callback must confirm identity, read verified email, run `evaluateProviderCallbackCustomerAccess`, and only then create a durable Cendorq session.
- Unknown provider emails must route to Free Scan with same-email recovery copy.
- Customer-facing copy should say account, Free Scan, plan, same email, dashboard, and secure access. It should not expose internal terms.

## Presence Report doctrine

Presence Report is the public-facing evidence object for AI Search Presence Repair.

The product loop is:

1. Business Truth Profile holds approved facts and restricted claims.
2. Free Scan captures the first signal.
3. Presence Report shows Findability, Understanding, Trust, Choice, Action, Repair Queue, and Recommended Next Move.
4. Choice Gap explains where competitors are easier to understand, trust, and choose.
5. Repair Queue ranks what to fix first.
6. Build Fix repairs public signals.
7. Control Snapshot keeps ongoing visibility and readiness from drifting.

Do not promise rankings, leads, revenue, or AI placement. Do not expose raw evidence or private scoring internals publicly.

## Installed Presence Report system

This branch now includes:

- Homepage AI Search Presence Repair positioning.
- Sample Presence Report route and vertical sample routes for dentist, med spa, law firm, and contractor.
- Shared `PresenceReportPreview` and `SamplePresenceReport` components.
- Public Presence Report contract, Business Truth Profile, Choice Gap, Control Snapshot, Repair Queue, Release Gate, route map, proof map, evidence boundary, next-move policy, launch-readiness, and object index.
- Presence Report generation adapter.
- Live Free Scan snapshot mapping into the five public Presence Report pillars.
- Protected Free Scan Presence Report preview.
- Dashboard Presence Command Snapshot.
- Shared Sandwork Presence Report fixture at `src/lib/sandwork-presence-report-fixture.ts`.
- Presence Report object index registration of the shared Sandwork demo report package.
- Validators for the public contract, live scan mapper, shared Sandwork fixture, protected result, dashboard snapshot, object index, launch-readiness, merge-readiness, routes, sitemap, and vertical sample routes.

## Sandwork fixture boundary

Sandwork is the canonical demo source for this batch.

- `SANDWORK_FREE_SCAN_INPUT` is the reusable demo Free Scan input.
- `SANDWORK_FREE_SCAN_SNAPSHOT` is generated from the Free Scan report builder.
- `SANDWORK_PRESENCE_REPORT_PACKAGE` is generated through the live scan mapper.
- Protected Free Scan preview and Dashboard Presence Command Snapshot consume the shared package.
- Presence Report object index exposes the shared package as `demoReportPackage`.
- Launch-readiness, merge-readiness, batch status, validation runbook, and base-update audit all document this boundary.

Do not re-hardcode Sandwork or sample report objects inside presentation components.

## Validation commands

Run before marking the PR ready:

```bash
pnpm validate:routes
pnpm validate:presence-report
pnpm lint
pnpm typecheck
pnpm build
```

Release Control runs the same chain and currently includes `pnpm validate:presence-report`.

## Do not regress

- Keep the public category as AI Search Presence Repair.
- Keep Presence Report as the central product object.
- Keep Free Scan first-signal only.
- Keep Review, Repair, and Control separate from Free Scan.
- Keep sample reports framed as examples, not promises.
- Keep public and protected surfaces free of private scoring internals.
- Keep next moves tied to evidence, not plan pressure.
- Keep the shared Sandwork fixture as the demo source.
- Do not create blank dashboards for unknown visitors.
- Do not restore old Free Scan localStorage drafts when entry is access-required or restart.
- Do not show provider buttons until provider callback runtime is real.
- Do not say Create workspace on customer-facing access/signup pages.
- Do not expose account-existence internals.
- Keep protected access server-derived.
- Keep Presence Report public language customer-safe and evidence-led.
- Keep the PR draft until final review confirms the latest green head.
- Do not move to the next implementation batch until CI, Release Control, CodeQL, and Vercel are green on the latest head.

## Next implementation candidates

1. Wire real Free Scan snapshots into protected customer report retrieval beyond the Sandwork fixture.
2. Add real scan evidence records once the report pipeline is ready.
3. Add category-specific proof standards into report scoring and repair language.
4. Add operator QA gates before any generated report is released to customers.
5. Wire paid plan, report vault, billing, and support eligibility to durable server-side ownership stores.
6. Mark PR #1035 ready for review only after latest head, Vercel, CI, Release Control, CodeQL, base alignment, and docs are all green and current.