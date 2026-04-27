# Command Center Plan Control Standard

This standard defines how Cendorq controls Free Scan, Deep Review, Build Fix, and Ongoing Control from the private Command Center.

## Principle

Every plan should be controllable, testable, previewable, and evidence-backed before anything customer-facing is sent.

AI can accelerate drafting, classification, comparison, recommendations, task planning, and summaries. AI cannot be treated as the source of truth without evidence, review, and approval.

## Strategic target

The Command Center should become the private operating brain for Cendorq. It should make plan strategy easy to manage, easy to test, easy to improve, and hard to damage.

The operator should be able to:

- adjust plan strategy
- preview customer-facing output
- run internal test records
- inspect generated records
- compare evidence to claims
- approve or pause plan output
- ask an AI manager to draft, check, summarize, or recommend next actions
- keep private notes separate from customer-safe language

## Plan control areas

### Free Scan

The control panel should manage intake questions, scoring guidance, routing rules, customer-safe summaries, internal briefs, and next-step recommendations.

The system should support test intakes, score-tier previews, duplicate checks, and protected-read checks before production changes are trusted.

### Deep Review

The control panel should manage audit sections, evidence requirements, report structure, recommendations, delivery previews, and customer-facing summaries.

Every report claim should be tied to evidence. Unsupported claims should be blocked or flagged before delivery.

### Build Fix

The control panel should manage project scope, task templates, priorities, before-after proof, completion notes, and outcome records.

Fix work should be traceable to tasks, evidence, quality checks, and customer value.

### Ongoing Control

The control panel should manage monthly cycles, recurring tasks, monitoring checklists, progress reports, risk briefs, renewal signals, and next-month recommendations.

Monthly work should show what changed, what improved, what remains at risk, and what should happen next.

## AI manager lane

The Command Center should eventually allow an authorized operator to call an AI manager from the panel.

The AI manager can help:

- draft report sections
- summarize intake records
- detect missing context
- flag weak claims
- compare evidence to recommendations
- break fixes into tasks
- identify scope drift
- draft customer-safe summaries
- recommend next actions
- prepare monthly updates

The AI manager must not:

- send customer-facing output without approval
- invent evidence
- treat guesses as facts
- expose private notes to customers
- overwrite source-of-truth records without a controlled action
- bypass permissions, review gates, or audit history

## Truth and proof standard

Cendorq reports and optimization recommendations must be evidence-backed and source-backed.

A plan output should be considered ready only when:

- the business identity is checked
- the claim has supporting evidence
- the recommendation is tied to an observable problem or opportunity
- the customer-facing wording is clear and safe
- the improvement path is practical for the plan purchased
- the operator can see what record was generated and why

## Required approval gates

Before customer-facing output is sent, the system should support:

- copy review
- evidence review
- recommendation review
- score or tier review
- customer-safe language review
- proof review
- delivery approval

## Test run requirements

The Command Center should support internal tests before live actions:

- sample intake generation
- sample report generation
- score-tier preview
- evidence completeness check
- task dependency check
- report delivery preview
- monthly cycle preview
- customer-safe output preview

Test records must be clearly separate from live customer records.

## Non-negotiables

- No customer-facing output without approval.
- No unsupported report claims.
- No unverified optimization recommendations.
- No private notes in customer-safe outputs.
- No AI action without traceability.
- No hidden plan changes.
- No weakening validation to make plan control pass.
- Cendorq remains the source of truth.
