# Cendorq Deployment Environment Checklist

Use this checklist for hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, and deployment configuration changes.

The goal is simple: keep production predictable, safe to deploy, and easy to verify.

## Deployment principle

Deployment configuration supports trust. If a hosting, domain, redirect, header, or environment change makes production harder to verify or easier to break, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

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
- Scheduled and manual smoke workflows still work.
- Rollback remains clear if the deploy weakens production.

## Domain and URL checks

For domain, base URL, or DNS-related changes, confirm:

- `https://cendorq.com` remains the production default unless intentionally changed.
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

## Header and redirect checks

For header or redirect changes, confirm:

- Security headers stay present.
- Redirects are intentional and minimal.
- Redirects return real redirect status codes and expected `Location` headers.
- Discovery files still use appropriate content types.
- Cache behavior does not hide production issues during verification.
- The buyer path remains canonical and simple.

## Smoke and rollback checks

For deployment-sensitive changes, confirm:

- Standard CI passes before merge.
- Production smoke is run after deploy when relevant.
- Production smoke covers public routes, discovery files, strict redirects, health, Free Scan API `OPTIONS`, and protected Free Scan read behavior.
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
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use deployment environment work as a reason to add:

- hidden production dependencies
- undocumented secrets
- broad rewrites
- homepage clutter
- competing CTAs
- unsupported guarantees
- technical language that reduces buyer clarity
