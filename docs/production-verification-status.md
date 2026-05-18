# Production Verification Status

This note records the current production verification foundation after the May 17, 2026 public route and remembered-access hardening pass.

## Verified production checks

The production smoke and route validation system covers:

- public buyer routes
- the active FAQ route
- discovery and trust files
- sitemap and robots public-route coverage
- protected customer-route exclusion from public discovery
- strict legacy redirects
- `/api/health`
- Free Scan API `OPTIONS`
- protected Free Scan API read behavior
- remembered customer header behavior through validation guards

## Strict redirect rule

Legacy routes must return a real redirect status and a `Location` header before the smoke check follows them into the current buyer path.

This prevents accidental rewrites, duplicated legacy content, or quiet route drift from passing as healthy redirects.

FAQ is not a legacy redirect. It is an active public route and must stay reachable as `/faq`.

## Discovery rule

Sitemap and robots must promote current public buyer routes only:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/faq`
- `/connect`
- current policy and trust pages

Protected customer routes, auth routes, checkout routes, API routes, dashboard routes, and private command surfaces must not be promoted by sitemap or robots.

## Free Scan API rule

Production smoke checks verify `OPTIONS /api/free-check` without creating fake submissions.

Production smoke also verifies unauthenticated `GET /api/free-check` returns the protected `401` response so the private intake console boundary remains closed by default.

Localhost development is excluded from the protected-read smoke check so local development does not require production secrets.

## Validation guard

`pnpm validate:routes` includes production smoke coverage, public sitemap validation, public robots validation, remembered-session header validation, and protected customer-route checks so these safety rules cannot be removed quietly.

## Workflow guard

The production smoke workflow remains scheduled and manually runnable against `https://www.cendorq.com`.

## No-shortcut rule

Do not remove production smoke coverage to make CI easier.

Do not replace redirect verification with final-destination-only checks.

Do not redirect FAQ away from `/faq`.

Do not allow protected customer, auth, checkout, dashboard, API, or command-center routes into public sitemap or robots allowlists.

Do not allow production intake reads without the configured admin boundary.

Do not create fake Free Scan submissions during smoke checks.

Do not merge production-sensitive changes unless route validation, lint, typecheck, and production build pass.
