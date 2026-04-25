# Cendorq Release Checklist

Use this checklist before and after production releases.

The goal is simple: ship without weakening the buyer path, public language, trust assets, health checks, crawler files, or production safety gates.

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
- Confirm no old public labels were revived in active public surfaces.
- Confirm the homepage does not gain clutter, dashboard behavior, route-console behavior, or competing CTAs.
- Confirm canonical routes are still the source of truth.
- Confirm legacy public URLs still redirect into the current buyer path.
- Confirm crawler and trust files still make sense.
- Confirm the health endpoint remains lightweight, dynamic, no-store, and noindex.

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

## Scheduled checks

The production smoke workflow runs automatically every day against `https://cendorq.com`.

If a scheduled smoke check fails:

- Treat it as production-sensitive.
- Check whether the issue is site behavior, hosting, network, or workflow-related.
- Fix the smallest safe surface.
- Run the smoke check again after the fix.

## Release notes standard

For meaningful releases, note:

- what changed
- why it changed
- buyer-path impact
- production-safety impact
- validation completed
- post-deploy smoke result

Keep release notes clear and short. Avoid internal jargon.
