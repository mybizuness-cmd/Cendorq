# Contributing to Cendorq

Cendorq changes should protect the production buyer path, keep the website clear, and preserve the quality gates that already exist in the repository.

## Production principle

The homepage has one job:

> Get the right customer to start the Free Scan.

Every public change should improve clarity, trust, desire, action, speed, mobile experience, copy quality, privacy, accessibility, performance, search discovery, or production reliability. If a change adds confusion, clutter, delay, data risk, discoverability risk, weak copy, or mixed intent, do not ship it.

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
- copy quality check when public language, CTAs, headings, metadata, trust messaging, or plan descriptions change
- privacy and data handling check when public forms, analytics, third-party scripts, environment values, logs, or customer-sensitive information change
- accessibility check when public UI changes
- performance check when public UI, asset, script, or component behavior changes
- search discovery check when metadata, crawler files, canonical routes, redirects, or trust files change
- production safety check
- release history check
- required validation
- post-deploy smoke check when relevant

CODEOWNERS routes production-sensitive changes to the repository owner. Keep that review routing intact.

## Copy quality

Use `docs/copy-quality-checklist.md` for public page copy, CTAs, headings, metadata, trust messaging, plan descriptions, and buyer-path language changes.

Public copy should stay plain, premium, clear, credible, and easy to choose.

## Privacy and data handling

Use `docs/privacy-data-checklist.md` for public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, and integration changes.

Data-sensitive changes should stay minimal, safe, documented, and trustworthy.

## Accessibility

Use `docs/accessibility-checklist.md` for buyer-path, public page, layout, copy, component, and navigation changes.

Public UI changes should stay readable, keyboard-friendly, mobile-safe, and easy to act on.

## Performance

Use `docs/performance-checklist.md` for buyer-path, public page, layout, component, asset, animation, and script changes.

Public UI changes should stay fast, lightweight, mobile-safe, and easy to act on.

## Search discovery

Use `docs/search-discovery-checklist.md` for metadata, crawler files, canonical routes, redirects, sitemap, robots, `llms.txt`, manifest, health, and public trust surface changes.

Discovery changes should stay plain, accurate, canonical, and buyer-focused.

## Release history

Update `CHANGELOG.md` for meaningful production changes, especially when a change affects the buyer path, release checklist, incident response, trust files, workflow behavior, copy quality expectations, privacy expectations, accessibility expectations, performance expectations, search discovery expectations, or production validation.

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
- `docs/copy-quality-checklist.md`
- `docs/privacy-data-checklist.md`
- `docs/accessibility-checklist.md`
- `docs/performance-checklist.md`
- `docs/search-discovery-checklist.md`
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

A change is ready when it protects the buyer path, passes CI, keeps public language aligned, accounts for copy quality, privacy, accessibility, performance, and search discovery when relevant, updates release history when meaningful, and does not weaken production checks.
