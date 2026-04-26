# Cendorq Observability and Diagnostics Checklist

Use this checklist for health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, and operational visibility changes.

The goal is simple: make production issues easy to detect, understand, and recover from without exposing sensitive data.

## Observability principle

Observability supports trust. If a production issue cannot be detected quickly, verified safely, or explained clearly, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging observability or diagnostics changes, confirm:

- Health checks remain lightweight and safe to expose.
- Smoke checks verify the production buyer path and discovery files.
- Smoke checks verify strict legacy redirects, not only final followed destinations.
- Smoke checks verify Free Scan API `OPTIONS` support without creating fake submissions.
- Production smoke checks verify unauthenticated Free Scan API reads stay protected.
- Logs help diagnose issues without exposing private data.
- Error states are understandable and not overly technical.
- Diagnostics do not reveal secrets, tokens, private customer data, or internals.
- Incident signals distinguish production issues from workflow or network noise.
- Failed checks point to a clear next action.
- Verification commands remain documented.
- Observability changes do not add homepage clutter or buyer confusion.
- Production checks still run without private secrets unless intentionally required.

## Health check checks

For `/api/health` changes, confirm:

- The response is safe for public access.
- The response remains lightweight.
- The route remains dynamic.
- The response is no-store.
- The response is noindex.
- The response does not expose private configuration.

## Smoke check checks

For smoke-check changes, confirm:

- Critical public routes are still checked.
- Discovery and trust files are still checked.
- Legacy redirects are checked with a real redirect status and `Location` header before following.
- Free Scan API `OPTIONS` still returns `204` and `Allow: GET,POST,OPTIONS`.
- Non-local production smoke confirms unauthenticated `GET /api/free-check` returns the protected `401` response.
- Protected-read smoke checks do not run against localhost development.
- Failures are clear enough to act on.
- The production base URL is explicit and safe.
- Scheduled and manual workflows stay usable.

## Logging checks

For logging and diagnostics changes, confirm:

- Logs avoid names, emails, URLs, tokens, submitted form content, and private customer data unless strictly necessary.
- Debug output is not enabled by default in production.
- Error messages do not leak internals.
- Logs are useful for recovery without creating privacy risk.

## Incident signal checks

For incident-related changes, confirm:

- The incident response runbook still applies.
- Severity can be judged from the available signal.
- Recovery steps are clear.
- After-action notes can identify what failed and what guard should improve.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting observability changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use observability work as a reason to add:

- private data exposure
- noisy logs
- hidden tracking
- homepage clutter
- competing CTAs
- unsupported guarantees
- technical language that reduces buyer clarity
