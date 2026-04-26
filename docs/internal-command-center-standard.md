# Internal Command Center Standard

The internal command center is the private operating surface for Cendorq. It is not a public buyer feature until a deliberate customer-facing dashboard is designed, protected, validated, and released.

## Purpose

The command center should help the operator see and control the business without exposing private intelligence. It should organize scan intake, report readiness, score thresholds, data quality, automation status, client follow-up, and operational risk in one protected place.

## Required posture

- Keep the public surface simple and conversion-focused.
- Keep the private system closed, authenticated, and least-privilege by default.
- Do not expose direct database access, raw evidence indexes, private scoring logic, private prompts, or private report schemas to public users.
- Prefer server-side actions, signed access, or authenticated internal tools for private reports and operator workflows.
- Treat command-center insights as operational guidance, not public claims.

## Core areas

The internal command center should eventually include:

- Free Scan intake review
- Deep Review readiness
- Build Fix work control
- Ongoing Control cycle tracking
- report center and report status
- data-quality board
- pure-signal promotion and demotion review
- score threshold watchlist
- automation command deck
- integration and delivery health
- incident and rollback visibility
- smart insight layer for operator decisions

## Automation rule

Automations should reduce manual work, but they must not bypass quality gates. Any automated task that changes public copy, private reports, data classification, score thresholds, or customer-facing output must remain traceable, reversible, and validated.

## Score threshold rule

The command center may show internal score bands and alerts, but public pages should avoid cluttered score displays unless the score has a clear buyer-safe explanation. Internal score thresholds should route work, trigger review, and identify risk without creating false certainty.

## Data quality rule

The command center must distinguish self-reported, externally observed, AI-generated, human-reviewed, rejected, authority-grade, and stale data. Weak or noisy data should not contaminate authority memory.

## Protection rule

The internal command center must follow maximum protection, closed intelligence, no direct database exposure, least privilege, evidence gating, and audit-friendly operations. If a command-center feature creates a new private-data path, it must be reviewed before release.

## Validation rule

Changes connected to command-center behavior must consider:

- route validation
- closed intelligence validation
- Free Scan intake validation
- public drift validation
- production smoke coverage
- security and data-quality impact
- rollback and continuity impact

The command center exists to make Cendorq easier to operate at a higher level without weakening the public conversion path or private intelligence boundary.
