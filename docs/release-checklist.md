# Cendorq Release Checklist

Use this checklist before and after production releases.

The goal is simple: ship without weakening the buyer path, public language, trust assets, health checks, crawler files, or production safety gates.

For production failures, smoke-check failures, or buyer-path regressions, use [`docs/incident-response.md`](incident-response.md).

For public copy, CTAs, headings, metadata, trust messaging, plan descriptions, or buyer-path language changes, use [`docs/copy-quality-checklist.md`](copy-quality-checklist.md).

For public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integration changes, use [`docs/privacy-data-checklist.md`](privacy-data-checklist.md).

For public UI, layout, copy, component, or navigation changes, use [`docs/accessibility-checklist.md`](accessibility-checklist.md).

For public page, component, asset, animation, or script changes, use [`docs/performance-checklist.md`](performance-checklist.md).

For metadata, crawler files, canonical routes, redirects, sitemap, robots, `llms.txt`, manifest, health, or public trust surface changes, use [`docs/search-discovery-checklist.md`](search-discovery-checklist.md).

For package updates, lockfile changes, GitHub Actions updates, runtime pins, dependency automation, or tooling changes, use [`docs/dependency-checklist.md`](dependency-checklist.md).

For hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, or deployment configuration changes, use [`docs/deployment-environment-checklist.md`](deployment-environment-checklist.md).

Record meaningful production changes in [`CHANGELOG.md`](../CHANGELOG.md).

## Release principle

The homepage has one job:

> Get the right customer to start the Free Scan.

Every release must preserve that focus.

## Pre-merge checklist

Before merging a production change:

- Confirm the change has a clear outcome.
- Confirm the buyer path is still simple:
  - Free Scan
  - Plans
  - Deep Review
  - Build Fix
  - Ongoing Control
  - Connect
- Confirm public copy is plain, premium, clear, credible, and easy to choose.
- Confirm no old public labels were revived in active public surfaces.
- Confirm privacy and data handling were checked for public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integration changes.
- Confirm dependency safety was checked for package, lockfile, GitHub Actions, runtime pin, dependency automation, or tooling changes.
- Confirm deployment environment safety was checked for hosting, domain, DNS, environment variable, redirect, header, health, smoke-check, or deployment configuration changes.
- Confirm no secrets, private customer data, private keys, or tokens were committed.
- Confirm the homepage does not gain clutter, dashboard behavior, route-console behavior, or competing CTAs.
- Confirm canonical routes are still the source of truth.
- Confirm legacy public URLs still redirect into the current buyer path.
- Confirm crawler and trust files still make sense.
- Confirm search discovery was checked for metadata, crawler, canonical route, redirect, sitemap, robots, `llms.txt`, manifest, health, or trust-surface changes.
- Confirm the health endpoint remains lightweight, dynamic, no-store, and noindex.
- Confirm accessibility was checked for public UI and buyer-path changes.
- Confirm performance was checked for public UI, asset, script, animation, and buyer-path changes.
- Confirm `CHANGELOG.md` is updated for meaningful production changes.

Run locally when practical:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

## Merge checklist

Before merging the PR:

- Confirm GitHub CI passed on Node 24.
- Confirm the PR template quality gates are answered.
- Confirm CODEOWNERS review routing is intact.
- Confirm no secrets, private customer data, private keys, or tokens were committed.
- Confirm public copy remains plain, direct, and buyer-friendly.
- Confirm copy quality expectations were considered when public language, CTAs, headings, metadata, trust messaging, or plan descriptions changed.
- Confirm privacy expectations were considered when public forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integrations changed.
- Confirm dependency expectations were considered when packages, lockfiles, GitHub Actions, runtime pins, dependency automation, or tooling changed.
- Confirm deployment environment expectations were considered when hosting, domain, DNS, environment variables, redirects, headers, health, smoke checks, or deployment configuration changed.
- Confirm search discovery expectations were considered when metadata, crawler files, canonical routes, redirects, or trust surfaces changed.
- Confirm accessibility expectations were considered when public UI changed.
- Confirm performance expectations were considered when public UI, assets, scripts, or component behavior changed.
- Confirm release history is updated when the change is meaningful.

## Post-deploy checklist

After production deploy:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

or run the **Production Smoke Check** workflow manually from GitHub Actions.

Confirm these production surfaces are healthy:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/connect`
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/.well-known/security.txt`

## Rollback checklist

If production weakens, breaks, or becomes unclear:

- Stop new risky changes.
- Identify the merge commit that introduced the issue.
- Revert the smallest safe change.
- Redeploy.
- Run the production smoke check.
- Confirm the Free Scan path and canonical routes are restored.
- Open a production safety issue if the failure exposed a missing guard.
- Follow the incident response runbook if impact is active or unclear.

## Scheduled checks

The production smoke workflow runs automatically every day against `https://cendorq.com`.

If a scheduled smoke check fails:

- Treat it as production-sensitive.
- Check whether the issue is site behavior, hosting, network, or workflow-related.
- Fix the smallest safe surface.
- Run the smoke check again after the fix.
- Use the incident response runbook when the failure is reproducible or customer-facing.

## Release notes standard

For meaningful releases, note in `CHANGELOG.md`:

- what changed
- why it changed
- buyer-path impact
- production-safety impact
- copy-quality impact when public language, CTAs, headings, metadata, trust messaging, or plan descriptions changed
- privacy/data impact when forms, analytics, third-party scripts, environment values, logs, customer-sensitive information, or integrations changed
- dependency impact when packages, lockfiles, GitHub Actions, runtime pins, dependency automation, or tooling changed
- deployment-environment impact when hosting, domain, DNS, environment variables, redirects, headers, health, smoke checks, or deployment configuration changed
- search-discovery impact when metadata, crawler files, canonical routes, redirects, or trust surfaces changed
- accessibility impact when public UI changed
- performance impact when public UI, assets, scripts, or component behavior changed
- validation completed
- post-deploy smoke result

Keep release notes clear and short. Avoid internal jargon.
