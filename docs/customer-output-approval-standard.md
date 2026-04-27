# Customer Output Approval Standard

This standard defines how Cendorq previews, reviews, approves, blocks, and sends customer-facing output.

## Principle

Nothing customer-facing should leave the Command Center unless it is previewed, reviewed, approved, and audit-tracked.

This includes Free Scan summaries, Deep Review reports, Build Fix updates, Ongoing Control updates, delivery emails, and plan-change notes.

## Required flow

Customer-facing output should move through:

- draft
- reviewing
- approved
- sent

Blocked output should not be sent until the blocking issue is fixed and reviewed again.

## Preview requirements

The Command Center should support previewing:

- report body
- customer summary
- recommendation language
- delivery email subject
- delivery email body
- attachments or report links
- customer-safe output without private notes

## Required reviews

Depending on output type, reviews can include:

- truth review
- evidence review
- score-tier review
- methodology review
- customer-safe language review
- scope review
- proof review
- delivery review
- recipient review
- billing or plan state review

## Block conditions

Output should be blocked when there is:

- unsupported claim
- missing evidence link
- unreviewed recommendation
- missing score rationale
- private note included
- scope mismatch
- billing mismatch
- broken report link
- unapproved attachment

## Audit trail

Each output should record:

- draft created
- preview generated
- review completed
- approval status
- sent status
- delivery status when available

## Non-negotiables

- No customer-facing output without approval.
- No private notes in customer-facing output.
- No unsupported claim in customer-facing output.
- No unreviewed report delivery.
- No delivery email without recipient and link checks.
- No plan-change note without plan state review.
- Cendorq remains the source of truth.
