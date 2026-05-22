# Cendorq Current Agent Handoff

## Operating posture

Cendorq is a category-control company, not a generic agency site and not a normal SaaS signup funnel. The product must optimize for qualified business acquisition, evidence, paid next steps, protected customer continuity, visual command, and validated operating memory.

Work in controlled batches, keep user updates short, prefer bigger coherent batches when they can be validated together, and verify green deployment checks before moving to the next implementation batch.

## Current main state

- Repository: `mybizuness-cmd/Cendorq`
- Main head at handoff: `3878e178695f51ed631bfabfeff0ebb35a5e4612`
- Legacy validation marker: `next-1017`
- Recently merged PR #1035: `Install Presence Report homepage batch`
- Recently merged PR #1036: `Install command workforce quality layer`
- Recently merged PR #1037: `Refresh handoff after command workforce merge`
- Recently merged PR #1038: `Promote command workforce validation into Release Control`
- Recently merged PR #1039: `Bridge command workforce docs into Command Center`
- Recently merged PR #1040: `Add visual command surface review register`
- Latest checked merge status at handoff: Vercel green on the PR #1040 merge commit. GitHub Actions were not attached to the merge commit at the time of this refresh; PR #1040 was green before merge across CI, Release Control, CodeQL, and Vercel.
- Current post-merge cleanup branch: `post-visual-register-handoff`

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

Main now includes:

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
- Package-source helper at `src/lib/presence-report-package-source.ts` for object-index-backed report package access.
- Validators for the public contract, live scan mapper, shared Sandwork fixture, package-source helper, protected result, dashboard snapshot, object index, launch-readiness, merge-readiness, routes, sitemap, and vertical sample routes.

## Sandwork fixture boundary

Sandwork is the canonical demo source for the merged Presence Report layer.

- `SANDWORK_FREE_SCAN_INPUT` is the reusable demo Free Scan input.
- `SANDWORK_FREE_SCAN_SNAPSHOT` is generated from the Free Scan report builder.
- `SANDWORK_PRESENCE_REPORT_PACKAGE` is generated through the live scan mapper.
- Presence Report object index exposes the shared package as `demoReportPackage`.
- `getPresenceReportPackage()` is the report-surface helper for reading the object-index-backed demo package.
- Protected Free Scan preview and Dashboard Presence Command Snapshot consume the package-source helper.
- Launch-readiness, merge-readiness, batch status, validation runbook, and base-update audit all document this boundary.

Do not re-hardcode Sandwork or sample report objects inside presentation components. Do not import the Sandwork fixture directly in report surfaces; use the package-source helper.

## Command workforce doctrine

The command workforce layer exists to make future work stronger, clearer, more visually controlled, and easier to validate.

Use this layer when planning future work, reviewing visual quality, shaping findings, or deciding whether a batch should be larger or smaller.

The command workforce operating loop is:

1. Owner command sets category direction and launch posture.
2. Release captain controls branch execution, validation, merge readiness, and final acceptance.
3. Chief lanes coordinate domain review.
4. Scoped scouts research, pressure-test, draft, and document findings.
5. Validators turn non-negotiable standards into repeatable gates.
6. Handoff memory records what changed, why it changed, what must not regress, and what to inspect next.

## Installed command workforce layer

Main now includes:

- `docs/command-workforce-operating-model.md`
- `docs/command-workforce-finding-template.md`
- `docs/command-workforce-quality-scorecard.md`
- `docs/visual-command-quality-standard.md`
- `docs/visual-command-review-template.md`
- `docs/visual-command-surface-review-register.md`
- `docs/command-workforce-release-runbook.md`
- `docs/command-workforce-docs-index.md`
- `docs/command-workforce-merge-readiness.md`
- `docs/command-workforce-handoff-addendum.md`
- `docs/command-center-command-workforce-bridge.md`
- `src/lib/command-workforce-quality-contracts.ts`
- `src/scripts/validate-command-workforce-quality-contracts.mjs`
- package shortcut `pnpm validate:command-workforce`

## Visual command doctrine

Visual quality is part of category ownership. Every important public, protected, report, dashboard, or mobile surface should make the safest next command obvious.

Review visual work for:

- premium restraint
- strong hierarchy
- immediate scannability
- clear proof sequence
- one dominant next action
- mobile clarity
- serious business tone
- report readability
- dashboard command clarity
- clean visual focus

Use `docs/visual-command-review-template.md` before treating a major customer-facing surface as visually ready. Use `docs/visual-command-surface-review-register.md` to preserve the current review state for the homepage, Sample Report, protected Free Scan report, dashboard snapshot, Plans, FAQ, and mobile command hierarchy.

## Visual surface review state

The current visual surface register covers:

- Homepage `/`
- Sample Presence Report `/sample-report`
- Protected Free Scan Presence Report `/dashboard/reports/free-scan`
- Dashboard Presence Command Snapshot
- Plans, FAQ, and mobile flows as next review targets

Do not regress:

- Keep Run Free Scan as the clearest homepage first command.
- Keep sample report language educational, not promissory.
- Keep protected Free Scan first signal only visible.
- Keep Choice Gap, Repair Queue, and Control Snapshot distinct in the dashboard snapshot.
- Keep Plans, FAQ, and mobile flows in the next visual-review queue.

## Validation commands

Run before marking a future PR ready:

```bash
pnpm validate:routes
pnpm validate:presence-report
pnpm validate:command-workforce
pnpm lint
pnpm typecheck
pnpm build
```

Release Control now runs route guardrails, Presence Report validation, command workforce validation, lint, typecheck, and build.

## Do not regress

- Keep the public category as AI Search Presence Repair.
- Keep Presence Report as the central product object.
- Keep Free Scan first-signal only.
- Keep Review, Repair, and Control separate from Free Scan.
- Keep sample reports framed as examples, not promises.
- Keep public and protected surfaces free of private scoring internals.
- Keep next moves tied to evidence, not plan pressure.
- Keep the shared Sandwork fixture as the demo source.
- Keep report surfaces pointed at the package-source helper instead of direct demo fixture imports.
- Keep owner command, release captain, chief lanes, scoped scouts, validators, and handoff memory separated.
- Keep findings structured enough to become decisions, docs, validators, or scoped PRs.
- Keep visual command as a real quality lane.
- Keep `pnpm validate:command-workforce` in Release Control.
- Keep the Command Center command workforce bridge guarded by the command workforce validator.
- Keep the visual command surface review register guarded by the command workforce validator.
- Use bigger batches only when the work forms one coherent layer and can be validated together.
- Use smaller batches for live access, payment configuration, provider runtime, protected customer data, or high-risk customer-facing truth.
- Do not create blank dashboards for unknown visitors.
- Do not restore old Free Scan localStorage drafts when entry is access-required or restart.
- Do not show provider buttons until provider callback runtime is real.
- Do not say Create workspace on customer-facing access/signup pages.
- Do not expose account-existence internals.
- Keep protected access server-derived.
- Keep Presence Report public language customer-safe and evidence-led.
- Do not move to the next implementation batch until CI, Release Control, CodeQL, and Vercel are green on the latest head.

## Next implementation candidates

1. Run deeper visual-command reviews against Plans, FAQ, and mobile flows, then update `docs/visual-command-surface-review-register.md`.
2. Wire real Free Scan snapshots into protected customer report retrieval beyond the Sandwork fixture.
3. Add real scan evidence records once the report pipeline is ready.
4. Add category-specific proof standards into report scoring and repair language.
5. Add operator QA gates before any generated report is released to customers.
6. Wire paid plan, report vault, billing, and support eligibility to durable server-side ownership stores.
7. Fold command workforce bridge anchors directly into the broader `docs/command-center-docs-index.md` only after the full-file rewrite risk is reduced.