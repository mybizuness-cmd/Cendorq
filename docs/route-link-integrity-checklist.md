# Cendorq Route and Link Integrity Checklist

Use this checklist for navigation, internal links, buttons, anchors, redirects, canonical routes, 404 behavior, sitemap links, crawler-facing routes, legacy route handling, and buyer-path connection changes.

The goal is simple: keep the buyer path connected, predictable, and free of broken, misleading, or stale public routes.

## Route and link principle

Route integrity supports trust. If a buyer clicks a link and lands in the wrong place, hits a dead end, sees a confusing legacy route, or finds an older public label still promoted by crawler files, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging route or link changes, confirm:

- Critical public routes still exist.
- Primary navigation points to current canonical routes.
- Footer links point to current canonical routes.
- Buttons and CTAs match their destination.
- Legacy public URLs still redirect into the current buyer path.
- Legacy public routes are not listed as active sitemap entries.
- Legacy public routes are not promoted in robots allowlists.
- The sitemap includes canonical buyer-path routes and policy pages only.
- Robots rules do not promote redirected legacy routes.
- `llms.txt` references the current buyer path.
- The manifest shortcuts point to current buyer-path routes.
- 404 behavior is helpful and does not trap the buyer.
- No active public surface points to old pricing routes.
- No active public surface revives old public labels.

## Canonical route checks

Keep these routes healthy:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/connect`

Policy and trust routes may remain public when they are current:

- `/privacy`
- `/terms`
- `/disclaimer`

## Redirect checks

Legacy routes should continue to redirect clearly:

- `/pricing` to `/plans`
- `/pricing/full-diagnosis` to `/plans/deep-review`
- `/pricing/optimization` to `/plans/build-fix`
- `/pricing/monthly-partner` to `/plans/ongoing-control`
- `/contact` to `/connect`
- `/how-it-works` to `/plans`
- `/diagnosis` to `/plans/deep-review`
- `/profile` to `/plans`
- `/faq` to `/plans`
- `/freecheck` to `/free-check`
- `/full-diagnosis` to `/plans/deep-review`
- `/optimization` to `/plans/build-fix`
- `/monthly-partner` to `/plans/ongoing-control`

## Link text checks

For link or button text changes, confirm:

- The label is clear without surrounding context.
- The label matches the destination.
- The label does not overpromise.
- The label uses current buyer language.
- The link does not create a competing path.

## Dead-end checks

For 404 or unavailable-route changes, confirm:

- The buyer can recover quickly.
- The Free Scan path is easy to reach.
- Connect is easy to reach when a conversation is needed.
- The page does not sound like an internal tool or route console.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting route or link changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use route or link work as a reason to add:

- homepage clutter
- competing CTAs
- confusing redirects
- dead-end pages
- dashboard behavior
- route-console behavior
- technical language that reduces buyer clarity
