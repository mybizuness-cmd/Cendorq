# Contributing to Cendorq

Cendorq changes should protect the production buyer path, keep the website clear, and preserve the quality gates that already exist in the repository.

## Production principle

The homepage has one job:

> Get the right customer to start the Free Scan.

Every public change should improve clarity, trust, desire, action, speed, mobile experience, accessibility, performance, or production reliability. If a change adds confusion, clutter, delay, or mixed intent, do not ship it.

## Protected buyer path

Keep the public path simple:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

Use plain buyer language. Avoid bringing back old public labels or making the site sound technical when the buyer needs clarity.

## Before opening work

Use the issue templates:

- Conversion improvement
- Production safety

Do not open vague work. State the outcome, affected routes, risk, and validation plan.

## Before opening a PR

Run:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For changes that affect production behavior after deploy, also plan to run:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## PR expectations

Use the pull request template and answer the quality gates:

- buyer-path impact
- conversion check
- accessibility check when public UI changes
- performance check when public UI, asset, script, or component behavior changes
- production safety check
- release history check
- required validation
- post-deploy smoke check when relevant

CODEOWNERS routes production-sensitive changes to the repository owner. Keep that review routing intact.

## Accessibility

Use `docs/accessibility-checklist.md` for buyer-path, public page, layout, copy, component, and navigation changes.

Public UI changes should stay readable, keyboard-friendly, mobile-safe, and easy to act on.

## Performance

Use `docs/performance-checklist.md` for buyer-path, public page, layout, component, asset, animation, and script changes.

Public UI changes should stay fast, lightweight, mobile-safe, and easy to act on.

## Release history

Update `CHANGELOG.md` for meaningful production changes, especially when a change affects the buyer path, release checklist, incident response, trust files, workflow behavior, accessibility expectations, performance expectations, or production validation.

Keep changelog notes short, buyer-focused, and production-aware.

## Public route rules

Do not remove or weaken the critical routes:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/connect`

Legacy public URLs should redirect into the current buyer path. The canonical route list should stay clean.

## Production files to protect

Do not remove or weaken:

- `README.md`
- `CHANGELOG.md`
- `SECURITY.md`
- `docs/production-guide.md`
- `docs/release-checklist.md`
- `docs/accessibility-checklist.md`
- `docs/performance-checklist.md`
- `docs/incident-response.md`
- `.github/CODEOWNERS`
- `.github/dependabot.yml`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/*`
- `.github/workflows/*`
- `public/llms.txt`
- `public/.well-known/security.txt`
- `public/manifest.webmanifest`
- `src/scripts/validate-routes.mjs`
- `src/scripts/smoke-production.mjs`
- `src/app/api/health/route.ts`

## Design and copy rules

Keep changes:

- clear
- fast
- mobile-first
- premium
- direct
- conversion-focused
- easy to understand

Avoid:

- homepage clutter
- competing CTAs
- route-console behavior
- dashboard-like public surfaces
- unsupported guarantees
- technical language that reduces buyer clarity

## Security and maintenance

Follow `SECURITY.md` for security-sensitive work. Dependency and GitHub Actions updates should flow through Dependabot PRs and normal CI.

## Merge standard

A change is ready when it protects the buyer path, passes CI, keeps public language aligned, accounts for accessibility and performance when relevant, updates release history when meaningful, and does not weaken production checks.
