# Contributing to Cendorq

Cendorq changes should protect the production buyer path, keep the website clear, and preserve the quality gates that already exist in the repository.

## Production principle

The homepage has one job:

> Get the right customer to start the Free Scan.

Every public change should improve clarity, trust, desire, action, speed, mobile experience, copy quality, privacy, accessibility, performance, search discovery, dependency safety, deployment safety, observability, support routing, or production reliability. If a change adds confusion, clutter, delay, data risk, dependency risk, deployment risk, diagnostic noise, discoverability risk, weak copy, fake support behavior, or mixed intent, do not ship it.

## Command design standard

Every production-facing change should follow the command design standard:

- Apple-level trust and authority
- Google-level simplicity
- ChatGPT-level immediate action

Before changing public pages, fallback states, protected customer surfaces, internal operator routes, report shells, SEO/share surfaces, Contact Us support behavior, or validation guardrails, use [`docs/command-design-operating-standard.md`](docs/command-design-operating-standard.md).

Every important surface should answer one question quickly:

> What is the safest next command?

## Protected buyer path

Keep the public path simple:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. FAQ
7. Contact Us

Contact Us is served by `/connect`. Legacy `/contact` should redirect into `/connect`. Public Contact Us should use direct email to `support@cendorq.com` unless a real tested send pipeline exists.

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
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

## PR expectations

Use the pull request template and answer the quality gates:

- buyer-path impact
- command design impact when public pages, fallback states, protected customer surfaces, internal operator routes, report shells, SEO/share surfaces, Contact Us support behavior, or validation guardrails change
- conversion check
- copy quality check when public language, CTAs, headings, metadata, trust messaging, or plan descriptions change
- privacy and data handling check when public forms, analytics, third-party scripts, environment values, logs, or customer-sensitive information change
- accessibility check when public UI changes
- performance check when public UI, asset, script, or component behavior changes
- search discovery check when metadata, crawler files, canonical routes, redirects, or trust files change
- dependency check when packages, lockfiles, GitHub Actions, runtime pins, dependency automation, or tooling change
- deployment environment check when hosting, domain, DNS, environment variables, redirects, headers, health, smoke checks, or deployment configuration change
- observability and diagnostics check when health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, or operational visibility change
- production safety check
- Contact Us support check when `/connect`, `/contact`, support email, or support handoff changes
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

## Dependency safety

Use `docs/dependency-checklist.md` for package updates, lockfile changes, GitHub Actions updates, runtime pins, dependency automation, and tooling changes.

Dependency changes should stay intentional, reviewable, production-safe, and aligned with Node 24 CI.

## Deployment environment

Use `docs/deployment-environment-checklist.md` for hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, and deployment configuration changes.

Deployment changes should stay predictable, reversible, production-safe, and easy to verify.

## Observability and diagnostics

Use `docs/observability-diagnostics-checklist.md` for health checks, smoke checks, logs, diagnostics, error states, incident signals, monitoring, and operational visibility changes.

Diagnostic changes should stay useful, privacy-safe, actionable, and easy to recover from.

## Release history

Update `CHANGELOG.md` for meaningful production changes, especially when a change affects the buyer path, release checklist, incident response, trust files, workflow behavior, Contact Us support routing, copy quality expectations, privacy expectations, accessibility expectations, performance expectations, search discovery expectations, dependency expectations, deployment environment expectations, observability expectations, or production validation.

Keep changelog notes short, buyer-focused, and production-aware.

## Public route rules

Do not remove or weaken the critical routes:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/faq`
- `/connect` for Contact Us

Legacy public URLs should redirect into the current buyer path. The canonical route list should stay clean. `/contact` should redirect into `/connect`.

## Contact Us support rules

Do not replace direct Contact Us email with an untested public message box.

If a Contact Us form is added later, it must collect the reply email, send to `support@cendorq.com`, avoid fake success states, and preserve privacy boundaries.

## Production files to protect

Do not remove or weaken:

- `README.md`
- `CHANGELOG.md`
- `SECURITY.md`
- `docs/command-design-operating-standard.md`
- `docs/production-guide.md`
- `docs/release-checklist.md`
- `docs/copy-quality-checklist.md`
- `docs/privacy-data-checklist.md`
- `docs/accessibility-checklist.md`
- `docs/performance-checklist.md`
- `docs/search-discovery-checklist.md`
- `docs/dependency-checklist.md`
- `docs/deployment-environment-checklist.md`
- `docs/observability-diagnostics-checklist.md`
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
- `src/scripts/validate-command-design-operating-standard.mjs`
- `src/scripts/validate-public-drift.mjs`
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
- command-path aligned

Avoid:

- homepage clutter
- competing CTAs
- route-console behavior
- dashboard-like public surfaces
- unsupported guarantees
- untested public message boxes
- fake support behavior
- technical language that reduces buyer clarity
- fallback states that route users into legacy paths

## Security and maintenance

Follow `SECURITY.md` for security-sensitive work. Dependency and GitHub Actions updates should flow through Dependabot PRs and normal CI.

## Merge standard

A change is ready when it protects the buyer path, follows the command design standard, passes CI, keeps public language aligned, preserves Contact Us support routing, accounts for copy quality, privacy, accessibility, performance, search discovery, dependency safety, deployment environment, and observability when relevant, updates release history when meaningful, and does not weaken production checks.
