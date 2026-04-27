# Command Center Migration Operating Standard

This standard protects the Cendorq Command Center database before production data, dashboard workflows, reports, payments, files, and private intelligence depend on it.

## Principle

Database migrations are not casual edits. They define the private source of truth for Cendorq operations.

Every migration must be:

- ordered
- reviewable
- repeatable
- production-safe
- non-destructive by default
- compatible with the current application code
- validated before merge
- documented enough for rollback planning

## Current migration set

The Command Center foundation currently starts with:

1. `0001_command_center_foundation.sql`
2. `0002_command_center_delivery_automation.sql`
3. `0003_command_center_signal_intelligence.sql`
4. `0004_command_center_data_governance.sql`
5. `0005_command_center_access_control.sql`

## Required migration rules

Every new migration must:

- use the next ordered number
- use a clear `snake_case` name
- be committed through PR and CI
- keep existing migrations unchanged unless the database has not been applied anywhere
- avoid destructive changes unless a separate rollback and data-preservation plan exists
- avoid public-facing tables for private intelligence, evidence, reports, payments, files, or dashboard controls
- avoid client-exposed environment assumptions
- keep Cendorq as the source of truth
- preserve audit, activity, access, consent, delivery, intelligence, and governance records

## Destructive change rule

Do not casually use destructive statements such as dropping tables, dropping columns, truncating data, or deleting operational records.

If a destructive migration is ever necessary, it must be isolated, documented, manually reviewed, and paired with a backup/export plan.

## Provider rule

Neon Postgres is the recommended durable provider, but migrations must remain standard Postgres-compatible unless a deliberate provider-specific reason is documented.

Provider credentials belong in deployment environment settings only. They must not be committed.

## Dashboard dependency rule

The private dashboard should not invent data shapes outside the schema.

Before adding dashboard features, confirm the required data belongs to one of these foundations:

- core operations
- delivery and automation
- signal intelligence
- data governance
- access control

If it does not fit, add the schema first through a protected migration.

## Validation expectation

Run the standard gate before merge:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

## Production application rule

Applying migrations to production must be an intentional deployment step, not a hidden side effect of visiting a page.

Production migration application should be done through a controlled migration command, provider console, or reviewed deployment process.

## Rollback thinking

Every migration PR must answer:

- What private business capability does this unlock?
- What existing data or behavior could it affect?
- Is the change additive or destructive?
- How would production be recovered if the migration application fails?
- Does the application still pass validation and build before deployment?
