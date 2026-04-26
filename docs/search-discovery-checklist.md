# Cendorq Search Discovery Checklist

Use this checklist for metadata, crawler files, canonical routes, redirects, sitemap, robots, `llms.txt`, manifest, health, legacy route handling, and public trust surface changes.

The goal is simple: keep Cendorq easy for search engines, AI systems, crawlers, scanners, and serious buyers to understand without promoting stale public routes.

## Discovery principle

Search discovery supports trust and conversion. If public metadata, crawler files, legacy route handling, or canonical routes become confusing, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging discovery-related changes, confirm:

- Canonical buyer routes remain the source of truth.
- Legacy routes redirect into the current buyer path.
- Legacy routes are not listed as active sitemap entries.
- Legacy routes are not promoted in robots allowlists.
- Sitemap entries point to active canonical routes and current policy/trust routes only.
- Robots guidance does not block important public buyer routes.
- Metadata uses current buyer language.
- `llms.txt` stays plain, accurate, and current.
- `security.txt` points to the correct public contact and policy surfaces.
- `manifest.webmanifest` shortcuts point to useful buyer-path actions.
- Health endpoint metadata stays lightweight, public-safe, no-store, and noindex.
- Discovery and trust files are served with appropriate cache and content-type behavior.
- Old public labels are not revived in active public surfaces.

## Canonical route checks

These routes must stay healthy and discoverable:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/connect`

Policy and trust routes may remain discoverable when their content is current:

- `/privacy`
- `/terms`
- `/disclaimer`

## Redirect checks

Legacy routes should redirect only into the current buyer path:

- `/pricing` -> `/plans`
- `/pricing/full-diagnosis` -> `/plans/deep-review`
- `/pricing/optimization` -> `/plans/build-fix`
- `/pricing/monthly-partner` -> `/plans/ongoing-control`
- `/contact` -> `/connect`
- `/how-it-works` -> `/plans`
- `/diagnosis` -> `/plans/deep-review`
- `/profile` -> `/plans`
- `/faq` -> `/plans`
- `/freecheck` -> `/free-check`
- `/full-diagnosis` -> `/plans/deep-review`
- `/optimization` -> `/plans/build-fix`
- `/monthly-partner` -> `/plans/ongoing-control`

## Public files to check

Review these when discovery surfaces change:

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/.well-known/security.txt`
- `/manifest.webmanifest`
- `/api/health`

## Copy checks

Public discovery copy should be:

- plain
- accurate
- current
- buyer-focused
- free of old labels
- free of unsupported guarantees

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting discovery changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use discovery work as a reason to add:

- homepage clutter
- competing CTAs
- dashboard behavior
- route-console behavior
- keyword stuffing
- unsupported guarantees
- technical language that reduces buyer clarity
