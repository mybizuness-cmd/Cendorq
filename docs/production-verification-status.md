# Production Verification Status

This note records the current production verification foundation after the April 26, 2026 hardening pass.

## Verified production checks

The production smoke system now covers:

- public buyer routes
- discovery and trust files
- strict legacy redirects
- `/api/health`
- Free Scan API `OPTIONS`
- protected Free Scan API read behavior

## Strict redirect rule

Legacy routes must return a real redirect status and a `Location` header before the smoke check follows them into the current buyer path.

This prevents accidental rewrites, duplicated legacy content, or quiet route drift from passing as healthy redirects.

## Free Scan API rule

Production smoke checks verify `OPTIONS /api/free-check` without creating fake submissions.

Production smoke also verifies unauthenticated `GET /api/free-check` returns the protected `401` response so the private intake console boundary remains closed by default.

Localhost development is excluded from the protected-read smoke check so local development does not require production secrets.

## Validation guard

`pnpm validate:routes` now includes `validate-production-smoke-coverage.mjs` so strict redirect coverage, Free Scan API `OPTIONS`, and protected Free Scan read checks cannot be removed quietly.

## Workflow guard

The production smoke workflow remains scheduled and manually runnable against `https://cendorq.com`.

## No-shortcut rule

Do not remove production smoke coverage to make CI easier.

Do not replace redirect verification with final-destination-only checks.

Do not allow production intake reads without the configured admin boundary.

Do not create fake Free Scan submissions during smoke checks.

Do not merge production-sensitive changes unless route validation, lint, typecheck, and production build pass.
