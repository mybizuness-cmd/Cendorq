# Cendorq Current Agent Handoff

## Operating posture

Cendorq is a category-control company, not a generic agency site and not a normal SaaS signup funnel. Work in controlled batches, keep user updates short, prefer bigger coherent batches when they can be validated together, and verify green deployment checks before moving to the next implementation batch.

Future chats must operate from repo sources, not chat memory.

## Required takeover reading order

1. `docs/agent-handoff/current-handoff.md`
2. `docs/cendorq-master-blueprint.md`
3. `docs/cendorq-competitive-intelligence-source-package.md`
4. `docs/visual-command-surface-review-register.md`
5. `docs/visual-command-device-width-review-protocol.md`
6. `src/lib/visual-command-device-review-targets.ts`
7. `src/lib/dashboard-protected-suite-contracts.ts`
8. `src/lib/presence-report-customer-source-contracts.ts`
9. Latest open PR and latest merged `main` commit status.

Do not ask the owner to repeat the vision if these files are available.

## Current main state

- Repository: `mybizuness-cmd/Cendorq`
- Main head at handoff: `bab83d910f4c73d7b09466e3a674d4db07a27717`
- Legacy validation marker: `next-1017`
- Recently merged PR #1051: `Install Cendorq master blueprint`
- Recently merged PR #1052: `Upgrade homepage product command proof layer`
- Recently merged PR #1053: `Refresh handoff after homepage product proof merge`
- Recently merged PR #1054: `Upgrade protected dashboard command strip`
- Recently merged PR #1055: `Elevate customer dashboard modules`
- Recently merged PR #1056: `Add protected dashboard suite contracts`
- Recently merged PR #1057: `Refresh handoff after source package merge`
- Recently merged PR #1058: `Add Presence Report customer source contracts`
- Latest checked merge status at handoff: Vercel green on PR #1058 merge commit. PR #1058 was green before merge across CI, Release Control, CodeQL, and Vercel.
- Current post-merge cleanup branch: `refresh-handoff-after-source-contracts`

## Source-memory package

Main includes:

- `docs/cendorq-competitive-intelligence-source-package.md`
- `src/scripts/validate-cendorq-competitive-intelligence-source-package.mjs`

The package records the Yext Scout and Semrush competitive intelligence, prior Cendorq video observations, source anchors, AI Search Presence Repair category decision, quality-level instruction for future chats, public website direction, protected dashboard direction, operator terminal direction, end-to-end roadmap, batch order, non-negotiables, and final takeover command.

Future chats should treat that file as the durable competitive intelligence plus execution brain.

## Business doctrine

Free Scan creates the customer. Customer Access brings the customer back. Provider buttons verify identity. Cendorq records decide access. Known customers continue to dashboard. Unknown people go to Free Scan. No blank accounts.

The customer-facing flow:

1. Start Free Scan.
2. Submit real business details.
3. Create account from the scan or paid action.
4. Open protected result, plan, billing, support, and next action in the dashboard.
5. Paid path moves through Review, Repair, and Control.

## Master blueprint doctrine

Main includes `docs/cendorq-master-blueprint.md` and `src/scripts/validate-cendorq-master-blueprint.mjs`.

Master decision:

- Cendorq should not become a smaller Semrush or a smaller Yext.
- Cendorq owns AI Search Presence Repair.
- Internal phrase: Make the business answer-ready.
- Operating path: Scan, Review, Repair, Control.
- Main product object: Presence Report.
- Main public command: Run Free Scan.

Core objects:

- Presence Report
- Business Truth Profile
- Choice Gap
- Repair Queue
- Control Snapshot
- Presence Gap Index

Do not drift from this doctrine without updating the blueprint, source package, validators, and this handoff.

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

The product loop:

1. Business Truth Profile holds approved facts and restricted claims.
2. Free Scan captures the first signal.
3. Presence Report shows Findability, Understanding, Trust, Choice, Action, Repair Queue, and Recommended Next Move.
4. Choice Gap explains where competitors are easier to understand, trust, and choose.
5. Repair Queue ranks what to fix first.
6. Build Fix repairs public signals.
7. Control Snapshot keeps ongoing visibility and readiness from drifting.

Do not promise rankings, leads, revenue, or AI placement. Do not expose raw evidence or private scoring internals publicly.

## Presence Report customer source contracts

Main now includes:

- `src/lib/presence-report-customer-source-contracts.ts`
- `src/lib/presence-report-package-source.ts` resolver boundary
- `src/scripts/validate-presence-report-package-source.mjs` guard coverage

The source contracts define:

- `demo`: current Sandwork demo package.
- `customer-latest-free-scan`: future customer-owned latest Free Scan package.
- `customer-released-report`: future customer-owned released paid report package.

Current behavior remains safe: protected report surfaces still resolve through `getPresenceReportPackage()` and fall back to the demo package until server-side customer ownership and release storage are wired.

Required future customer source gates:

- verified customer email
- server-side scan ownership
- same-account access gate
- paid entitlement for released reports
- released report ownership
- operator approval gate

Do not expose raw intake payloads, private scoring internals, account-existence internals, draft reports, unapproved findings, raw evidence, or operator notes.

## Installed Presence Report system

Main includes homepage AI Search Presence Repair positioning, Product Proof Center, Sample Presence Report, shared report components, Presence Report contracts, live Free Scan snapshot mapping, protected Free Scan report preview, Dashboard Presence Command Snapshot, Sandwork demo fixture, object index, package-source helper, customer source contracts, and validators for the report system.

Sandwork remains the canonical demo boundary. Do not re-hardcode Sandwork or sample report objects inside presentation components. Report surfaces should use the package-source helper.

## Protected dashboard suite state

Main includes:

- `src/lib/dashboard-protected-suite-contracts.ts`
- Protected dashboard command strip.
- Elevated customer action inbox.
- Elevated customer decision center.
- Connected customer lanes.
- Protected account re-entry.
- Reports, Billing, Notifications, and Support tied together as a protected dashboard suite.

Protected suite contracts cover:

- Reports: protected proof vault.
- Billing: plan depth and access control.
- Notifications: signal feed.
- Support: support routing.

Keep protected dashboard language separate from public homepage language. Keep public homepage `Product Proof Center`; do not use `Presence Command` publicly. Keep private payment details, raw evidence, private internals, and unsafe support leakage out of customer surfaces.

## Command workforce doctrine

The command workforce layer makes future work stronger, clearer, more visually controlled, and easier to validate.

Operating loop:

1. Owner command sets category direction and launch posture.
2. Release captain controls branch execution, validation, merge readiness, and final acceptance.
3. Chief lanes coordinate domain review.
4. Scoped scouts research, pressure-test, draft, and document findings.
5. Validators turn non-negotiable standards into repeatable gates.
6. Handoff memory records what changed, why it changed, what must not regress, and what to inspect next.

Installed command workforce layer includes command workforce docs, visual command docs, `docs/cendorq-master-blueprint.md`, `docs/cendorq-competitive-intelligence-source-package.md`, `src/lib/command-workforce-quality-contracts.ts`, `src/lib/visual-command-device-review-targets.ts`, `src/lib/dashboard-protected-suite-contracts.ts`, `src/lib/presence-report-customer-source-contracts.ts`, and validation scripts.

## Visual command doctrine

Visual quality is part of category ownership. Every important public, protected, report, dashboard, or mobile surface should make the safest next command obvious.

Review for premium restraint, strong hierarchy, immediate scannability, clear proof sequence, one dominant next action, mobile clarity, serious business tone, report readability, dashboard command clarity, and clean visual focus.

Use `docs/visual-command-device-width-review-protocol.md` and `src/lib/visual-command-device-review-targets.ts` for 390px, 430px, 768px, 1024px, and 1440px review.

## Homepage product proof state

Homepage includes the Product Proof Center section with Presence Score, Choice Gap, Repair Queue, Control Snapshot, and Proof before paid pressure.

Public homepage guardrail:

- Do not use the phrase `Presence Command` on the public homepage.
- Use Product Proof Center publicly.
- Keep internal/dashboard language separate from public language.

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

Release Control runs route guardrails, Presence Report validation, command workforce validation, lint, typecheck, and build.

## Do not regress

- Keep the public category as AI Search Presence Repair.
- Keep Presence Report as the central product object.
- Keep the master blueprint and competitive intelligence source package discoverable in repo sources.
- Keep Free Scan first-signal only.
- Keep Review, Repair, and Control separate from Free Scan.
- Keep sample reports framed as examples, not promises.
- Keep public and protected surfaces free of private scoring internals.
- Keep next moves tied to evidence, not plan pressure.
- Keep report surfaces pointed at the package-source helper instead of direct demo fixture imports.
- Keep the customer source contracts intact until real storage replaces demo fallback.
- Keep visual command as a real quality lane.
- Keep `pnpm validate:command-workforce` in Release Control.
- Keep protected Free Scan proof-before-paid-pressure order guarded.
- Keep homepage Product Proof Center guarded.
- Use bigger batches only when the work forms one coherent layer and can be validated together.
- Use smaller batches for live access, payment configuration, provider runtime, protected customer data, or high-risk customer-facing truth.
- Do not create blank dashboards for unknown visitors.
- Do not restore old Free Scan localStorage drafts when entry is access-required or restart.
- Do not show provider buttons until provider callback runtime is real.
- Do not say Create workspace on customer-facing access/signup pages.
- Do not expose account-existence internals.
- Keep protected access server-derived.
- Do not move to the next implementation batch until CI, Release Control, CodeQL, and Vercel are green on the latest head.

## Next implementation candidates

1. Execute live screenshot/device-width review for homepage, `/plans`, `/faq`, `/sample-report`, `/dashboard/reports/free-scan`, and protected dashboard surfaces at 390px, 430px, 768px, 1024px, and 1440px; update `docs/visual-command-surface-review-register.md` with screenshot-based findings.
2. Wire real Free Scan snapshots into protected customer report retrieval beyond the Sandwork fixture.
3. Add real scan evidence records once the report pipeline is ready.
4. Add category-specific proof standards into report scoring and repair language.
5. Add operator QA gates before any generated report is released to customers.
6. Wire paid plan, report vault, billing, and support eligibility to durable server-side ownership stores.
7. Create the Presence Gap Index authority asset.
8. Build operator terminal foundation: Command Queue, Business Truth Profile, Evidence Console, Finding Builder, Repair Composer, Approval Gate, and Audit Log.
