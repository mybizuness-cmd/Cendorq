# AI Manager Version Registry Standard

This standard defines how Cendorq tracks AI manager versions, prompt policies, scoring policies, report policies, evaluation policies, and upgrade readiness.

## Principle

The AI manager can evolve, but it must evolve safely. A newer model, prompt, or policy is not automatically better until it passes regression checks.

Cendorq should track which AI manager version produced important outputs so results can be reviewed, compared, improved, or retired.

## Version registry

Each AI manager version should record:

- model provider label
- model family label
- prompt policy version
- evaluation policy version
- scoring policy version
- report policy version
- required regression suites
- promotion gates
- retirement triggers

The registry should avoid storing private provider keys or secret values.

## Upgrade flow

Before promoting a new AI manager version, Cendorq should run regression checks across:

- Free Scan
- Deep Review
- Build Fix
- Ongoing Control
- benchmark comparison
- customer-safe language
- evidence completeness
- unsupported claim detection

A version should only be promoted when it improves quality or capability without increasing unsupported claims, unsafe summaries, or customer-facing confusion.

## Required promotion gates

Promotion should require:

- unsupported-claim check
- evidence-link check
- customer-safe-language check
- operator approval
- regression comparison

## Retirement triggers

A version should be retired when there is:

- quality regression
- unsafe output
- unsupported claim increase
- policy mismatch
- better approved version available

## Non-negotiables

- No model upgrade without regression checks.
- No customer-facing output from an unapproved version.
- No unsupported claim treated as truth.
- No hidden prompt or policy change.
- No provider secret stored in the registry.
- Cendorq remains the source of truth.
