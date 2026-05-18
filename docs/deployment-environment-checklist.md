# Cendorq Deployment Environment Checklist

Use this checklist for hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, intake-console, email, checkout, auth, and deployment configuration changes.

The goal is simple: keep production predictable, safe to deploy, and easy to verify.

## Deployment principle

Deployment configuration supports trust. If a hosting, domain, redirect, header, intake, checkout, auth, email, or environment change makes production harder to verify or easier to break, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. FAQ
7. Contact Us
8. Login, signup, email confirmation, and checkout success

## Required checks

Before merging deployment environment changes, confirm:

- The change has a clear production reason.
- Canonical production URL assumptions remain correct.
- Required environment variables are documented safely.
- Real secrets are not committed.
- Local development does not require production-only secrets.
- CI can still run without private production values unless intentionally required.
- Production redirects still point into the current buyer path.
- Production redirects are verified as real redirects with a status code and `Location` header.
- Production security headers stay intact.
- Discovery and trust files keep the expected content type and cache behavior.
- `/api/health` remains safe, lightweight, dynamic, no-store, and noindex.
- Production smoke checks still target the intended deployed URL.
- Production smoke checks still verify Free Scan API `OPTIONS` without creating fake submissions.
- Production smoke checks still verify unauthenticated Free Scan API reads stay protected.
- Contact Us is served by `/connect` while customer-facing labels say Contact Us.
- Contact Us uses direct email to `support@cendorq.com` unless a real tested send pipeline exists.
- Email access reports `email-sent`, `email-queued`, or `email-unavailable` truthfully.
- Remembered-session access fails safely when the signed session secret is absent or invalid.
- Provider auth buttons fail safely when provider URLs are absent.
- Checkout success returns customers to the intended dashboard path after payment.
- Scheduled and manual smoke workflows still work.
- Rollback remains clear if the deploy weakens production.

## Domain and URL checks

For domain, base URL, or DNS-related changes, confirm:

- `https://www.cendorq.com` remains the canonical production URL unless intentionally changed.
- `https://cendorq.com` remains the apex redirect context unless intentionally changed.
- `NEXT_PUBLIC_SITE_URL` is set to the canonical public origin used by SEO metadata, sitemap, robots, structured data, email links, and protected redirect construction.
- `CENDORQ_BASE_URL` is set to the deployed origin that production smoke checks should verify.
- Smoke checks use the intended base URL.
- Metadata, sitemap, robots, `llms.txt`, and security contact surfaces stay aligned.
- Legacy public URLs still redirect only into the current buyer path.
- Legacy public URLs are not served as duplicate content or rewrites.

## Environment checks

For environment variable changes, confirm:

- `.env.example` uses placeholders or safe defaults only.
- New variables are named clearly.
- Public variables do not expose private values.
- Server-only values are not accidentally exposed to the browser.
- Production deployment can be verified without leaking secrets.
- Private intake console reads require the configured admin boundary in production.
- `INTAKE_CONSOLE_READ_KEY` is set in production before anyone relies on protected intake-console reads.
- `INTAKE_CONSOLE_READ_KEY` is long, random, server-only, and never committed.
- `INTAKE_ADMIN_KEY` is only used as a server-only alias when the deployment standard prefers it.
- `NEXT_PUBLIC_SITE_URL` and `CENDORQ_BASE_URL` are documented together when public URL assumptions change.

### Current required production variables

Set these in Vercel production before relying on the full customer journey:

- `NEXT_PUBLIC_SITE_URL`
- `CENDORQ_BASE_URL`
- `INTAKE_CONSOLE_READ_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_DEEP_REVIEW`
- `STRIPE_PRICE_BUILD_FIX`
- `STRIPE_PRICE_ONGOING_CONTROL`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`
- `SUPPORT_EMAIL`
- `CENDORQ_CUSTOMER_SESSION_SECRET`

`CENDORQ_CUSTOMER_SESSION_SECRET` must be a random value with at least 32 characters. Without it, `Continue if remembered` fails safely and returns the visitor to sign in.

### Stripe checks

For Stripe changes, confirm:

- `STRIPE_SECRET_KEY` is set only server-side.
- `STRIPE_WEBHOOK_SECRET` is set only server-side.
- Price IDs match the intended plans:
  - `STRIPE_PRICE_DEEP_REVIEW` -> Deep Review
  - `STRIPE_PRICE_BUILD_FIX` -> Build Fix
  - `STRIPE_PRICE_ONGOING_CONTROL` -> Ongoing Control
- Public fallback payment links point to the intended Stripe products:
  - `NEXT_PUBLIC_STRIPE_DEEP_REVIEW_PAYMENT_LINK` -> Deep Review fallback if direct checkout-session creation is not configured
  - `NEXT_PUBLIC_STRIPE_BUILD_FIX_PAYMENT_LINK` -> Build Fix fallback if direct checkout-session creation is not configured
  - `NEXT_PUBLIC_STRIPE_ONGOING_CONTROL_PAYMENT_LINK` -> Ongoing Control fallback if direct checkout-session creation is not configured
- Stripe metadata includes enough plan context for routing and post-payment email logic.
- Webhook events are verified with the Stripe signing secret.
- Checkout success pages do not expose private Stripe secrets.

### Email checks

For email changes, confirm:

- `RESEND_API_KEY` is set only server-side.
- `EMAIL_FROM` uses `Cendorq Support <support@cendorq.com>` or an approved support sender.
- `EMAIL_REPLY_TO` and `SUPPORT_EMAIL` use monitored inboxes.
- Public Contact Us direct email uses `support@cendorq.com` unless a real tested send pipeline exists.
- If provider delivery is skipped or unavailable, the login page reports `email-unavailable` instead of claiming an email was sent.
- Email confirmation links do not expose raw tokens after use.
- Confirmation POST responses return a safe projection only.
- Confirmation GET can set the signed remembered-session cookie only after verification.

### Auth and remembered-session checks

For login, signup, provider auth, and remembered-session changes, confirm:

- `CENDORQ_CUSTOMER_SESSION_SECRET` is present, random, and at least 32 characters in production.
- Remembered-session cookies are HttpOnly, Secure, SameSite=Lax, signed, and short enough to avoid header issues.
- `Continue if remembered` validates the signed cookie and does not trust arbitrary cookie names.
- Missing, expired, malformed, unsigned, or mis-signed sessions return to login safely.
- Provider auth URLs are HTTPS-only.
- Provider URLs are left blank until the provider is actually configured.
- Provider return paths are restricted to safe dashboard paths.
- Provider buttons fail safely with a clear login notice when a provider is not configured.

## Intake backend readiness checks

For Free Scan intake production readiness, confirm:

- Public `POST /api/free-check` accepts only validated Free Scan payloads.
- Public `OPTIONS /api/free-check` returns `204` with `Allow: GET,POST,OPTIONS`.
- Production `GET /api/free-check` without the admin header returns protected `401`.
- Protected reads require the `x-intake-admin-key` header with the configured server-only key.
- Smoke checks do not create fake Free Scan submissions.
- Intake storage is not treated as durable customer infrastructure until a real persistence layer is intentionally selected.
- Local file-backed intake storage is acceptable only as a temporary early production bridge.
- Any future durable storage migration must preserve validation, duplicate detection, scoring, report snapshots, no-store responses, and protected-read behavior.

## Header and redirect checks

For header or redirect changes, confirm:

- Security headers stay present.
- Redirects are intentional and minimal.
- Redirects return real redirect status codes and expected `Location` headers.
- `/contact` redirects to `/connect`.
- Discovery files still use appropriate content types.
- Cache behavior does not hide production issues during verification.
- The buyer path remains canonical and simple.

## Smoke and rollback checks

For deployment-sensitive changes, confirm:

- Standard CI passes before merge.
- Production smoke is run after deploy when relevant.
- Production smoke covers public routes, discovery files, strict redirects, health, Free Scan API `OPTIONS`, protected Free Scan read behavior, login, signup, email confirmation surfaces, and checkout success surfaces.
- The incident response runbook is used if smoke fails.
- The rollback path is small, clear, and safe.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting deployment changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

## Non-goals

Do not use deployment environment work as a reason to add:

- hidden production dependencies
- undocumented secrets
- broad rewrites
- homepage clutter
- competing CTAs
- unsupported guarantees
- untested public message boxes
- technical language that reduces buyer clarity
