# Cendorq Current Agent Handoff

## Operating posture

Cendorq is a category-control company, not a generic agency site and not a normal SaaS signup funnel. The product must optimize for qualified business acquisition, evidence, paid next steps, and protected customer continuity.

The operator should work in controlled batches, keep updates short, and verify green deployment checks before moving to the next implementation batch.

## Current branch

- Repository: `mybizuness-cmd/Cendorq`
- Branch: `presence-report-homepage-batch`
- Latest checked green deployment checkpoint: Presence Report homepage batch after base update conflict resolution
- Latest checked green commit at handoff: `d4c8201af76cb03994883ce070575df6d789fe12`

## Business doctrine

Free Scan creates the customer. Customer Access brings the customer back. Provider buttons verify identity. Cendorq records decide access. Known customers continue to dashboard. Unknown people go to Free Scan. No blank accounts.

The customer-facing flow is:

1. Start Free Scan.
2. Submit real business details.
3. Create account from the scan or paid action.
4. Open protected result, plan, billing, support, and next action in the dashboard.
5. Paid path moves through Review, Repair, and Control.

## Presence Report doctrine

Presence Report is the public-facing evidence object for AI Search Presence Repair.

The Presence Report path is:

1. Free Scan captures the first signal.
2. Sample Presence Report demonstrates the customer-safe report shape.
3. Business Truth Profile holds approved facts and restricted claims.
4. Choice Gap explains where competitors are easier to understand, trust, and choose.
5. Repair Queue ranks what to fix first.
6. Release Gate keeps restricted promises out of report language.
7. Control Snapshot keeps ongoing visibility and readiness from drifting.

Do not promise rankings, leads, revenue, or AI placement. Do not expose raw evidence or private scoring internals publicly.

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

## Current completed access hardening

- `src/lib/customer-access-eligibility.ts` gates secure email access through existing Free Scan eligibility.
- `src/lib/customer-access-eligibility.ts` documents the full eligibility source ladder: active Free Scan plus contract-ready paid plan, report vault, billing, and support.
- `src/app/api/auth/email/route.ts` routes unknown emails to Free Scan instead of sending an access link.
- `src/app/login/page.tsx` uses customer-facing same-email recovery copy.
- `src/lib/customer-provider-callback-access-gate.ts` defines provider callback eligibility decisions.
- `src/lib/production-auth-provider-contracts.ts` locks verified provider email and existing-customer eligibility before dashboard access.
- `src/app/api/auth/callback/[provider]/route.ts` documents that provider callback remains pending until the real runtime exists.
- `src/scripts/validate-provider-callback-ready-gate.mjs` validates provider buttons stay hidden and provider sessions cannot ship before eligibility.
- `src/scripts/validate-customer-auth-orchestration.mjs` validates the eligibility source ladder.

## Do not regress

- Do not create blank dashboards for unknown visitors.
- Do not restore old Free Scan localStorage drafts when entry is access-required or restart.
- Do not show provider buttons until provider callback runtime is real.
- Do not say Create workspace on customer-facing access/signup pages.
- Do not expose account-existence internals.
- Keep protected access server-derived.
- Keep Presence Report public language customer-safe and evidence-led.
- Do not move to the next implementation batch until Vercel is green.

## Next implementation candidates

1. Wire paid plan, report vault, billing, and support eligibility to durable server-side ownership stores.
2. Add runtime tests for email access eligibility and provider callback access decisions.
3. Add official provider button surface only after callback runtime is implemented.
4. Keep provider runtime gated until verified email, eligibility, and server session creation are real.
5. After final validation, mark the Presence Report PR ready for review only when local validation, Vercel, Release Control, CI, and CodeQL are green.