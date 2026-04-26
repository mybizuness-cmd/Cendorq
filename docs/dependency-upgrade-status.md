# Dependency Upgrade Status

This note records the current dependency foundation state after the April 26, 2026 hardening pass.

## Verified merged upgrades

The following dependency and tooling upgrades were merged only after GitHub Actions passed route validation, lint, typecheck, and production build:

- GitHub Actions setup actions upgraded to v6.
- Next platform upgraded to Next `16.2.4` and `eslint-config-next` `16.2.4`.
- TypeScript upgraded to `6.0.3` with a CSS side-effect import declaration.

## Current stable styling foundation

Tailwind remains on the stable 3.x line because the grouped Tailwind 4 build-tooling PR failed the production build gate.

Tailwind 4 is not a routine dependency bump for this project. It requires a focused migration that includes:

- `@tailwindcss/postcss`
- synchronized `pnpm-lock.yaml`
- `postcss.config.mjs` migration
- `tailwind.config.ts` compatibility review
- visual regression review
- production build verification
- post-deploy smoke verification

## Guardrail added

Dependabot now separates Tailwind into its own `tailwind-major-migration` group instead of grouping it with routine build tooling.

Routine build tooling remains separate for:

- `postcss`
- `autoprefixer`
- `eslint`

This prevents a major Tailwind migration from being hidden inside a routine dependency PR.

## Required rule

Do not merge a dependency upgrade unless the branch is current with `main` and GitHub Actions passes:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For deployed or visual-impacting changes, run production smoke after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## No-shortcut rule

Do not hand-edit lockfile integrity data.

Do not downgrade validation to make a dependency upgrade pass.

Do not merge a major CSS/tooling upgrade just because install succeeds.

Do not merge without a successful production build.
