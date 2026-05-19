# Cendorq Current Agent Handoff

## Operating posture

Cendorq is a category-control company, not a generic agency site and not a normal SaaS signup funnel. The product must optimize for qualified business acquisition, evidence, paid next steps, and protected customer continuity.

The operator should work in controlled batches, keep updates short, and verify green deployment checks before moving to the next implementation batch.

## Current branch

- Repository: `mybizuness-cmd/Cendorq`
- Branch: `next-1017`
- Last known green deployment checkpoint: provider callback eligibility documentation and validator lock
- Green commit at handoff: `9ad75197aeae8b552bda3ea81c3c8d773278cc1b`

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
- Provider access must stay hidden until real runtime is ready.
- Provider callback must perform server-side token exchange, profile fetch, verified email confirmation, and `evaluateProviderCallbackCustomerAccess` before any durable Cendorq session is issued.
- Unknown provider emails must route to Free Scan with same-email recovery copy.
- Customer-facing copy should say account, Free Scan, plan, same email, dashboard, and secure access. It should not expose internal terms like customer record, eligibility, provider payload, or token exchange.

## Current completed access hardening

- `src/lib/customer-access-eligibility.ts` gates secure email access through existing Free Scan eligibility.
- `src/app/api/auth/email/route.ts` routes unknown emails to Free Scan instead of sending an access link.
- `src/app/login/page.tsx` uses customer-facing same-email recovery copy.
- `src/lib/customer-provider-callback-access-gate.ts` defines provider callback eligibility decisions.
- `src/lib/production-auth-provider-contracts.ts` locks verified provider email and existing-customer eligibility before dashboard access.
- `src/app/api/auth/callback/[provider]/route.ts` documents that provider callback remains pending until the real runtime exists.
- `src/scripts/validate-provider-callback-ready-gate.mjs` validates provider buttons stay hidden and provider sessions cannot ship before eligibility.

## Do not regress

- Do not create blank dashboards for unknown visitors.
- Do not restore old Free Scan localStorage drafts when entry is access-required or restart.
- Do not show provider buttons until provider callback runtime is real.
- Do not say Create workspace on customer-facing access/signup pages.
- Do not expose account-existence internals.
- Do not store session authority in localStorage, sessionStorage, URLs, analytics, emails, HTML, or public JavaScript.
- Do not move to the next implementation batch until Vercel is green.

## Next implementation candidates

1. Expand customer eligibility beyond Free Scan into paid plan, billing, report vault, and support records.
2. Add durable runtime tests/validators for access eligibility sources.
3. Add official provider button surface only after callback runtime is implemented.
4. Keep provider runtime gated until token exchange, verified email, eligibility, and server session creation are real.
