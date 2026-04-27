# Command Center Intelligence Readiness

This checklist protects future private intelligence, evidence, learning memory, classification, and outcome measurement workflows before live AI or analyst workflows are enabled.

## Principle

Intelligence should compound only from evidence, outcomes, and reviewed memory. Raw intelligence stays private. Public surfaces receive only client-safe summaries.

## Required server-only configuration

Required server-only configuration:

- `INTELLIGENCE_REVIEW_OWNER`

Do not expose private intelligence configuration in public output, client code, logs, screenshots, readiness responses, or public APIs.

## Required capabilities

Before intelligence workflows are enabled, the system must support:

- evidence-gated classification
- human review before promotion
- outcome measurement links
- private memory status tracking
- client-safe summary separation
- audit trail

## Before wiring intelligence workflows

Confirm:

- `signal_taxonomies` exists
- `signal_tags` exists
- `intelligence_classifications` exists
- `evidence_records` exists
- `intelligence_memory_items` exists
- `intelligence_memory_links` exists
- `outcome_measurements` exists
- access control foundation exists
- governance foundation exists
- readiness endpoint remains protected

## After wiring intelligence workflows

Confirm:

- classifications are evidence-linked
- raw evidence is not exposed publicly
- memory promotion is reviewed and reversible
- outcomes are linked to recommendations
- client-safe summaries are separated from private notes
- public buyer surfaces remain clean and non-technical

## Non-negotiables

- No public raw intelligence.
- No public evidence index.
- No unreviewed memory promotion.
- No AI output treated as source of truth without evidence.
- No client-only intelligence authority.
- No weakening validation to make intelligence pass.
