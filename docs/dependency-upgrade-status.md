# Dependency Upgrade Status

This note records the current dependency foundation state after the April 26, 2026 hardening and Tailwind 4 migration pass.

## Verified merged upgrades

The following dependency and tooling upgrades were merged only after GitHub Actions passed route validation, lint, typecheck, and production build:

- GitHub Actions setup actions upgraded to v6.
- Next platform upgraded to Next `16.2.4` and `eslint-config-next` `16.2.4`.
- TypeScript upgraded to `6.0.3` with a CSS side-effect import declaration.
- Tailwind migrated to Tailwind CSS `4.2.4`.
- Tailwind PostCSS integration migrated to `@tailwindcss/postcss` `4.2.4`.
- `pnpm-lock.yaml` regenerated through pnpm for the Tailwind 4 migration.

## Current styling foundation

Tailwind now runs on the Tailwind 4 line.

The migration included:

- `tailwindcss` major version update
- `@tailwindcss/postcss`
- regenerated `pnpm-lock.yaml`
- `postcss.config.mjs` migration
- `tailwind.config.ts` compatibility update
- standard route validation
- lint
- typecheck
- production build

## Guardrail retained

Dependabot still separates Tailwind into its own `tailwind-major-migration` group instead of grouping it with routine build tooling.

Routine build tooling remains separate for:

- `postcss`
- `eslint`

This prevents future major Tailwind migrations from being hidden inside routine dependency PRs.

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
