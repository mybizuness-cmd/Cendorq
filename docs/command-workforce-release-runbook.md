# Command Workforce Release Runbook

This runbook turns findings into scoped, reviewable, validated work.

## Finding intake

A finding should name the lane, claim, evidence basis, customer impact, category impact, affected files or routes, recommended action, validator need, confidence, and release-captain decision.

## Review lanes

- Report truth lane: evidence, claims, proof, and report calibration.
- Customer command experience lane: journey clarity, next action, and customer wording.
- Visual command lane: hierarchy, mobile clarity, report readability, and dashboard command clarity.
- Security and command lane: access, private data posture, approval gates, and safe projection.
- Market forecast lane: platform shifts, competitive movement, and category timing.

## Batch sizing

Use larger batches when one operating layer can be validated together. Use smaller batches when work touches high-risk runtime or customer-facing truth.

## Acceptance

A batch is ready for review when it has a clear purpose, named source-of-truth files, validator coverage, passing CI, passing Release Control, passing CodeQL, green Vercel, and updated handoff notes when operating posture changes.

## Memory

Every meaningful batch should record what changed, why it changed, what must not regress, what validators protect it, what risks remain, and what to inspect next.
