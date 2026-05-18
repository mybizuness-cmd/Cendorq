# Final System Status

This package reflects the current Cendorq direction:

- canonical brand: Cendorq
- canonical product category: AI Engine Visibility and Readiness
- canonical buyer path:
  - Free Scan
  - Plans
  - Deep Review
  - Build Fix
  - Ongoing Control
  - FAQ
  - Contact Us
- canonical support route: `/connect`
- canonical legacy support redirect: `/contact` -> `/connect`
- canonical support email: `support@cendorq.com`
- canonical public support behavior: direct email unless a real tested send pipeline exists
- canonical no-form rule: no untested public message boxes or fake success states
- canonical command sequence:
  - Scan
  - Review
  - Repair
  - Control
- canonical SEO and metadata contract: `src/lib/seo.ts`
- canonical shared navigation contract: `src/lib/site.ts`
- canonical structured data contract: `src/lib/schema.ts`
- canonical active Free Scan form engine: `src/components/free-check/guided-free-check-form-v3.tsx`

## Operating posture

The public surface should make the business easier to find, understand, trust, and choose before the customer spends deeper.

The public surface should stay clear, simple, and buyer-focused: start with Free Scan when the first visibility or readiness signal is unclear; compare Plans when the buyer knows the depth; use Contact Us when fit, scope, timing, or account help is already specific.

The protected customer surface should stay aligned with dashboard, reports, billing, notifications, support, and next actions.

## Remaining practical note

A full production build still depends on installing project dependencies in the target environment and running the required validation chain before deploy.

Required validation:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

Production smoke validation:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```
