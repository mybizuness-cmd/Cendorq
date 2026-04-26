# Tailwind Major Migration Checklist

Tailwind major upgrades are design-system migrations, not routine dependency bumps.

Do not merge a Tailwind major upgrade just because install, lint, or typecheck passes. The public Cendorq experience depends on layout, spacing, hierarchy, responsive behavior, conversion clarity, and trust polish staying intact.

## Current status

Tailwind 4 has been migrated through the dedicated migration path.

The completed migration included:

- `tailwindcss` upgraded to `4.2.4`
- `@tailwindcss/postcss` added for the Tailwind 4 PostCSS plugin path
- `pnpm-lock.yaml` regenerated through pnpm
- `postcss.config.mjs` migrated
- `tailwind.config.ts` compatibility updated
- standard route validation passed
- lint passed
- typecheck passed
- production build passed

Keep this checklist for future Tailwind major migrations.

## Why this exists

A grouped build-tooling PR proved Tailwind major upgrades are not simple bumps for this project. Tailwind 4 required the separate PostCSS plugin path and a synchronized lockfile/config migration.

Future Tailwind major migrations must still be handled as focused PRs.

## Required migration scope

A Tailwind major migration must include, at minimum:

- `tailwindcss` major version update
- `@tailwindcss/postcss` when required by the Tailwind version
- synchronized `pnpm-lock.yaml`
- `postcss.config.mjs` migration
- `tailwind.config.ts` compatibility review
- global CSS import review
- generated utility behavior review
- public page visual regression review
- mobile and desktop buyer-path review
- production build verification
- post-deploy smoke verification

## Required validation

Before merge, the PR must pass:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

After deployment, run:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Visual review scope

Manually review these routes after a successful build:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/connect`

Check:

- hero spacing
- CTA visibility
- mobile dock behavior
- card density
- typography hierarchy
- form usability
- trust blocks
- footer layout
- dark surface contrast
- responsive breakpoints

## No-shortcut rule

Do not merge a Tailwind major upgrade through a grouped PR with unrelated build tooling.

Do not hand-edit lockfile integrity data.

Do not downgrade validation to make the migration pass.

Do not accept a successful install as proof of a successful migration.

Do not merge without a successful production build.

## Release note expectation

Tailwind major migration release notes must include:

- package/config changes
- visual review result
- build result
- smoke result when deployed
- buyer-path impact
- rollback plan
