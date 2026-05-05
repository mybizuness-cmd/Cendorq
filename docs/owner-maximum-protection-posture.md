# Owner Maximum Protection Posture

This owner-facing posture translates `docs/maximum-protection-standard.md` into daily operating decisions.

## Owner posture

Cendorq must stay open only where public conversion requires it and closed wherever customer context, reports, evidence, scoring, operator work, provider setup, launch readiness, billing posture, or internal review could expose private value or private risk.

Maximum protection does not mean slowing the company down. It means every public, customer, operator, support, billing, report, AI, and launch surface has the right boundary before scale.

## Required owner decisions

Before approving production launch, major report release, provider configuration, billing mapping, customer-facing claim changes, automation expansion, or public copy changes, owner review must confirm:

- The public surface teaches the category without exposing private mechanics.
- Protected customer and report surfaces require the correct verified access path.
- Operator surfaces remain private, metadata-first, and review-gated.
- AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.
- Evidence and report logic stay separated into verified facts, assumptions, inferences, limitations, confidence, and next actions.
- Sensitive operational details are summarized safely instead of copied into public, customer, or operator-visible text.
- Validation, Vercel, route-chain integrity, docs-index coverage, registry coverage, and rollback posture remain green before merge.

## Hard owner locks

Owner command should reject any change that:

- Treats private reports, evidence, customer context, operator review, provider setup, billing posture, or launch readiness as public material.
- Lets browser-side code become the authority for protected customer, report, support, billing, operator, or launch decisions.
- Lets external content, competitor pages, customer-submitted text, or model output override Cendorq system rules.
- Turns private doctrine, scoring rules, prompt material, or raw operational review into marketing copy.
- Claims impossible certainty, assured business outcomes, assured security outcomes, assured inbox placement, or risk-free operation.
- Skips validation, hides failures, weakens safeguards, removes rollback posture, or bypasses release-captain review.

## Operating rule

Maximum protection must be treated as a growth asset, not only a security rule. The more Cendorq can prove controlled access, truthful evidence handling, bounded claims, safe automation, clean customer ownership, and disciplined launch review, the stronger the brand becomes.

Every new major capability should answer:

1. What should be public?
2. What must stay customer-owned?
3. What must stay operator-only?
4. What must stay internal-only?
5. What validation proves the boundary still holds?
6. What rollback path exists if the boundary fails?
