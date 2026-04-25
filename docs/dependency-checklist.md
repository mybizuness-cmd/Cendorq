# Cendorq Dependency Checklist

Use this checklist for package updates, lockfile changes, GitHub Actions updates, runtime pins, dependency automation, and tooling changes.

The goal is simple: keep Cendorq current without weakening production safety, buyer-path clarity, or deploy reliability.

## Dependency principle

Dependency work supports reliability. If a package, action, runtime, or lockfile change makes CI weaker, production less predictable, or the buyer path less safe, do not merge it.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging dependency or tooling changes, confirm:

- The change has a clear reason.
- The lockfile change matches the package change.
- Runtime pins still point to Node 24.
- pnpm remains pinned and intentional.
- GitHub Actions use trusted actions.
- Workflow permissions stay read-only unless a write permission is clearly required.
- Checkout credentials are not persisted unless clearly required.
- Dependabot grouping remains understandable.
- CI still runs route validation, lint, typecheck, and production build.
- No dependency change adds unnecessary client-side weight.
- No dependency change adds avoidable tracking, analytics, or third-party risk.
- No dependency change weakens production headers, redirects, health, crawler files, or buyer-path protections.

## Runtime checks

For runtime changes, confirm:

- `.nvmrc` stays aligned.
- `.node-version` stays aligned.
- `package.json` `engines.node` stays aligned.
- GitHub Actions Node setup stays aligned.
- Local and CI expectations are documented.

## GitHub Actions checks

For workflow changes, confirm:

- `permissions: contents: read` remains present where write access is not needed.
- `persist-credentials: false` remains present where checkout only needs read access.
- Node setup stays on Node 24.
- pnpm install remains frozen in CI.
- Production smoke checks remain manual and scheduled.
- Workflow changes are protected by route validation when production-sensitive.

## Package checks

For package changes, confirm:

- The package is needed.
- The package does not duplicate existing functionality.
- The package does not add avoidable browser weight.
- The package is maintained and reasonable for production use.
- The package does not introduce avoidable security, privacy, or performance risk.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting dependency or workflow changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use dependency work as a reason to add:

- unnecessary packages
- hidden tracking
- broad rewrites
- homepage clutter
- competing CTAs
- unsupported guarantees
- technical language that reduces buyer clarity
