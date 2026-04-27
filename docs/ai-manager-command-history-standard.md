# AI Manager Command History Standard

This standard defines how Cendorq tracks every AI manager command from request to final decision.

## Principle

Every AI manager action must be traceable. The Command Center should show what was requested, what context was used, what was generated, what was reviewed, and why the result was approved, blocked, or archived.

The history layer protects trust, accountability, debugging, regression checks, and operator control.

## Required command history fields

Each AI command history record should include:

- command id
- command type
- requested by
- requested at
- record class
- source record reference
- model version label
- prompt policy version
- evaluation policy version
- approval state

## Review fields

Each reviewed command should capture:

- required context summary
- guardrail checklist
- unsupported claim count
- uncertainty count
- private note exclusion check
- customer-safe language check
- reviewer note
- final decision

## Blocked reason types

A command can be blocked for:

- missing context
- missing evidence
- unsupported claim
- private note exposure risk
- plan scope mismatch
- record class mismatch
- delivery approval missing
- operator rejection

## Audit events

Command history should track:

- command queued
- context checked
- output generated
- self-review completed
- operator review requested
- approved
- blocked
- archived

## Non-negotiables

- No AI command without history.
- No AI output without model and policy labels.
- No approval without reviewer decision.
- No blocked output silently deleted.
- No customer-facing output without traceable approval.
- No live record change without audit history.
- Cendorq remains the source of truth.
