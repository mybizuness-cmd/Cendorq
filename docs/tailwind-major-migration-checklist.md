# Tailwind Major Migration Checklist

Tailwind major upgrades are design-system migrations, not routine dependency bumps.

Do not merge a Tailwind major upgrade just because install, lint, or typecheck passes. The public Cendorq experience depends on layout, spacing, hierarchy, responsive behavior, conversion clarity, and trust polish staying intact.

## Why this exists

A grouped build-tooling PR proved Tailwind 4 is not a simple bump for this project. The production build failed because Tailwind 4 moved the PostCSS plugin into a separate package.

Tailwind 4 migration must be handled as its own focused PR.

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
