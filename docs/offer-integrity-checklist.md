# Cendorq Offer Integrity Checklist

Use this checklist for Plans, Deep Review, Build Fix, Ongoing Control, pricing, scope, guarantee, package, comparison, and offer-positioning changes.

The goal is simple: keep every offer honest, distinct, supportable, and easy to choose.

## Offer integrity principle

Offer clarity supports trust. If a buyer cannot understand what each offer is for, what happens next, or what is not included, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. FAQ
7. Contact Us

## Required checks

Before merging offer-sensitive changes, confirm:

- Plans remain easy to compare.
- Deep Review, Build Fix, and Ongoing Control stay distinct.
- The Free Scan remains the safest first step for unsure buyers.
- FAQ remains available for quick buyer questions.
- Contact Us remains available for fit, scope, timing, or account help.
- Contact Us is served by `/connect` while customer-facing labels say Contact Us.
- Contact Us uses direct email to `support@cendorq.com` unless a real tested send pipeline exists.
- Scope language is clear and supportable.
- Pricing language does not create confusion.
- Guarantees are not added unless they are accurate, supportable, and approved.
- Claims do not imply guaranteed rankings, instant results, or unsupported outcomes.
- The buyer can understand what happens after choosing an offer.
- Offer language stays plain and current.
- No old public labels were revived in active surfaces.
- No offer creates dashboard, route-console, or internal-tool expectations.

## Plan clarity checks

For plan changes, confirm:

- Each plan has a clear buyer problem.
- Each plan has a clear outcome.
- Plans do not overlap in a confusing way.
- Plan names use current buyer language.
- Plan descriptions are short enough to compare.
- The next action is clear for each plan.
- Contact Us is not used as a replacement for Free Scan when the first weak signal is unclear.

## Scope checks

For scope changes, confirm:

- Included work is clear.
- Excluded work is not implied as included.
- Timelines are realistic if mentioned.
- Deliverables are understandable to a buyer.
- Scope language does not overpromise implementation or ranking outcomes.
- Contact Us does not imply unlimited consulting.

## Guarantee and claim checks

Avoid unsupported claims such as:

- guaranteed rankings
- instant domination
- guaranteed revenue
- guaranteed traffic
- guaranteed AI placement
- best-in-class without proof
- permanent results without maintenance

Claims should be calm, credible, and supportable.

## Pricing and comparison checks

For pricing or comparison changes, confirm:

- The buyer can compare choices without dense clutter.
- Pricing context is clear.
- No plan is made artificially confusing to push a different plan.
- Upgrade paths are understandable.
- The page does not create unnecessary decision fatigue.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting offer changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

## Non-goals

Do not use offer work as a reason to add:

- unsupported guarantees
- confusing packages
- homepage clutter
- competing CTAs
- fear-based messaging
- untested public message boxes
- technical language that reduces buyer clarity
