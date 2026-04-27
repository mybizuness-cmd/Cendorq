# Benchmark Test Run Separation Standard

This standard protects how Cendorq separates benchmark learning, synthetic tests, regression tests, and live customer records.

## Principle

The system should learn from strong reference data and test runs without polluting live customer history.

Benchmark records, synthetic records, regression records, and live customer records must be clearly separated.

This separation must stay easy to validate as the Command Center grows.

## Record classes

Cendorq should distinguish these record classes:

- benchmark reference
- synthetic test
- regression test
- live customer
- archived benchmark

## Benchmark reference records

Benchmark reference records should represent reviewed high-quality businesses selected for category learning.

Each benchmark reference should include:

- category
- business name
- source URLs or source references
- evidence summary
- review date
- reviewer identity or review owner
- approval status
- retirement status when stale

Benchmark references should not be treated as customer records.

## Synthetic test records

Synthetic test records should be used for internal testing only.

They can test:

- intake scoring
- report generation
- recommendation logic
- customer-safe language
- delivery previews
- monthly cycle logic
- AI manager review behavior

Synthetic records must be clearly marked and excluded from customer reporting, analytics, revenue, and delivery metrics.

## Regression test records

Regression test records should be used when prompts, models, scoring methods, report structures, or optimization methods change.

They should help answer:

- did quality improve
- did accuracy regress
- did unsupported claims increase
- did customer-safe language improve
- did recommendations remain evidence-backed
- did the new method behave consistently across categories

## Live customer records

Live customer records should only come from real customer or prospect actions, authorized operator actions, verified integrations, or approved internal work.

Live records must not be overwritten by benchmark tests or synthetic runs.

## AI manager test behavior

AI manager test runs must record:

- model family or provider label
- model version or deployment label when available
- prompt policy version
- evaluation policy version
- input record class
- output record class
- self-review result
- unsupported claim count
- uncertainty count
- approval status

## Non-negotiables

- No benchmark record treated as a customer record.
- No synthetic record delivered to a customer.
- No regression record counted as revenue or customer progress.
- No model or prompt upgrade without regression checks.
- No unsupported claim accepted as truth.
- No live customer record overwritten by a test run.
- Cendorq remains the source of truth.
