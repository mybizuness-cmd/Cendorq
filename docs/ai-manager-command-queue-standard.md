# AI Manager Command Queue Standard

This standard defines how Cendorq should let an authorized operator call the AI manager from the private Command Center.

## Principle

The AI manager can help draft, review, compare, test, summarize, and recommend actions. It must not directly send customer-facing output, change live customer records, approve its own work, invent evidence, or bypass permissions.

AI commands should run through a controlled queue with state, context, guardrails, review gates, and audit events.

## Command queue states

AI manager commands should move through:

- queued
- running
- needs-review
- approved
- blocked
- archived

## Supported command types

The Command Center should support controlled AI commands for:

- drafting report sections
- reviewing report claims
- comparing a business against approved benchmarks
- running synthetic tests
- summarizing intake submissions
- recommending next actions
- preparing customer output previews
- reviewing monthly progress

## Required context

Each command should include enough context for a useful and safe result, such as:

- plan scope
- record class
- evidence links
- output type
- benchmark set
- optimization method
- current state
- evaluation policy

## Required guards

Every command should protect:

- source evidence
- customer-safe language
- private note separation
- plan scope
- record class separation
- operator review
- audit trail

## Blocked actions

The AI manager must not:

- send output
- change live records without approval
- approve its own draft
- invent evidence
- remove audit history
- copy private notes into customer output
- recommend outside the purchased plan scope
- treat benchmark records as customer records

## Review gates

Depending on command type, output should pass:

- truth review
- evidence review
- benchmark evidence review
- optimization proof review
- scope review
- customer-safe language review
- delivery review
- operator approval

## Non-negotiables

- No AI command without context.
- No AI output treated as truth without source evidence.
- No customer-facing output sent directly by AI.
- No live customer record changed directly by AI.
- No AI action without audit trail.
- No private notes in customer-facing output.
- Cendorq remains the source of truth.
