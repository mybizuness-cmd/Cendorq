# Cendorq Content Freshness Checklist

Use this checklist for public copy freshness, dated claims, screenshots, examples, plan language, route references, release notes, public labels, and outdated buyer-path assumptions.

The goal is simple: keep Cendorq current, accurate, and free of stale public language.

## Content freshness principle

Fresh content supports trust. If public language references old offers, outdated routes, stale claims, old labels, or unsupported assumptions, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. FAQ
7. Contact Us

## Required checks

Before merging freshness-sensitive changes, confirm:

- Public copy uses current buyer language.
- Plan names and descriptions match the current offer structure.
- Route references point to current canonical routes.
- Customer-facing language says Contact Us, not Connect.
- Contact Us is served by `/connect` and uses direct email to `support@cendorq.com` unless a real tested send pipeline exists.
- No untested public message box is described as available.
- Old public labels were not revived.
- Screenshots, examples, and sample data are current or clearly generic.
- Claims are not tied to stale market assumptions.
- Release notes reflect meaningful production changes.
- Metadata, sitemap, robots, manifest, and `llms.txt` stay aligned when public surfaces change.
- Policy, privacy, trust, and integration language remains current when behavior changes.
- The buyer path remains easy to understand without historical context.

## Stale-label checks

Avoid reviving old active public labels such as:

- Visibility Blueprint
- Presence Infrastructure
- Presence Command
- Start Search Presence Scan
- customer-facing Connect labels

Historical references are only acceptable when clearly marked as history and not used as active buyer language.

## Screenshot and example checks

For screenshots, examples, or sample data, confirm:

- The content is current or intentionally generic.
- No private customer data appears.
- Dates, prices, routes, labels, and examples still make sense.
- Example outcomes do not imply guaranteed results.
- Visual examples do not conflict with the current public site.

## Plan and offer freshness checks

For plan or offer content, confirm:

- Free Scan remains the safest first step.
- Plans, Deep Review, Build Fix, and Ongoing Control stay distinct.
- FAQ remains active for quick buyer questions.
- Contact Us remains clear for buyers who need fit, scope, timing, or account help.
- Offer language matches current pricing and scope expectations.
- No old route names, old pricing labels, outdated packages, or old customer-facing Connect labels are used.

## Release-history checks

For release notes and changelog updates, confirm:

- Meaningful production changes are recorded.
- Entries use current buyer language.
- Entries do not revive old public labels as active language.
- Validation and post-deploy checks are recorded when relevant.
- The release note does not describe future behavior as already shipped.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting content freshness changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

## Non-goals

Do not use freshness work as a reason to add:

- old public labels
- historical clutter
- unsupported claims
- outdated screenshots
- private customer examples
- homepage clutter
- untested public message boxes
- technical language that reduces buyer clarity
