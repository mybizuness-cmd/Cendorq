# Command Center Database Readiness

This checklist protects the first live production database step for the private Cendorq Command Center.

## Principle

The database is the private source of truth. It must be configured intentionally, migrated intentionally, and never exposed through public routes.

## Required configuration

Required server-only configuration:

- `DATABASE_URL`

Do not expose this value in public output, client code, logs, screenshots, docs, or readiness responses.

## Provider direction

Use a durable managed Postgres provider. Neon is the preferred starting option because it pairs well with Vercel and keeps the schema standard Postgres-compatible.

The application should remain standard Postgres-oriented unless a provider-specific decision is documented.

## Before applying migrations

Confirm:

- the production database exists
- the database connection value is configured only in the deployment environment
- migration files are sequential
- migration safety validation passes
- the latest main branch has green CI
- backup/export thinking is documented before any destructive migration is ever considered

## Applying migrations

Migrations must be applied intentionally through a controlled process. Do not apply migrations as a side effect of visiting a page.

Acceptable approaches:

- provider console SQL runner
- reviewed migration command
- controlled deployment step with explicit operator ownership

## After applying migrations

Confirm:

- `pnpm validate:routes` passes
- `pnpm lint` passes
- `pnpm typecheck` passes
- `pnpm build` passes
- production smoke passes
- Command Center routes remain closed by default
- readiness endpoint remains protected
- no public database reads exist

## Non-negotiables

- No public database connection values.
- No public table browsing.
- No public report index.
- No public intelligence index.
- No direct database exposure through client code.
- No destructive migration without backup and recovery planning.
- No weakening migration validation to make a database change pass.
