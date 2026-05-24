# Public Route Product Path Ledger

## Purpose

Keep the public Cendorq buyer path consistent without fighting route validation or adding noisy public sections.

## Current public path

1. Free Scan
2. Product / Sample Report
3. Plans
4. Deep Review
5. Build Fix
6. Ongoing Control
7. FAQ
8. Contact Us
9. Customer Access

## Validator-safe navigation rule

The global header may use the validator-protected `Product` label while routing to `/sample-report`.

Do not rename that shared navigation label unless route validation is updated in the same batch.

## Product meaning

`/sample-report` is the public product proof surface. It shows how Cendorq turns the first signal into:

- Presence Report
- Choice Gap
- Evidence Boundary
- Repair Queue
- Next Move

## Page role boundaries

- `/free-check` starts the first signal.
- `/sample-report` demonstrates the product object.
- `/plans` helps choose depth.
- `/faq` removes hesitation.
- `/login` returns verified customers to existing context.
- `/connect` routes clear fit, scope, timing, or support questions.

## Non-goals

Do not use public route consistency work to add:

- homepage clutter
- competing CTAs
- fake dashboard behavior
- route-console language
- untested message boxes
- public outcome guarantees
- generic SEO-tool positioning

## Batch 9 lesson

A direct public header label change from `Product` to `Sample Report` failed Release Control. The validator-safe path is to preserve the protected label unless the validation rules are intentionally updated in the same PR.
