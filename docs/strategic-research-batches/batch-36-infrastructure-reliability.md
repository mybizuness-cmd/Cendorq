# Cendorq Strategic Research Batch 36: Infrastructure Reliability

Cendorq must be built to handle many customers, reports, paid workflows, repair jobs, PDFs, emails, support events, and monthly Control snapshots without chaos.

## Infrastructure requirements

- durable server-side customer records;
- report package storage;
- evidence record storage;
- entitlement checks;
- PDF rendering queue;
- email delivery queue;
- workflow run log;
- agent trace log;
- retry and failure handling;
- monitoring and alerting;
- backup and recovery posture.

## Release requirements

Before important changes are marked complete:

- routes validated;
- Presence Report system validated;
- command workforce validated;
- lint passes;
- typecheck passes;
- build passes;
- Vercel is green;
- device-width review completed for major visual surfaces.

## Agent instruction

- Do not turn on risky live workflows before storage, access, release gates, and delivery controls are ready.
- Bigger batches are acceptable only when coherent and safe.
- If a write is blocked, split the batch without reducing the standard.
- Never lower quality because a connector blocks a payload.
- Use contracts first, validators second, UI third, live data and external integrations after gates exist.

## Failure states to support

- payment succeeded but report generation failed;
- report approved but PDF render failed;
- PDF rendered but email failed;
- customer email mismatch;
- evidence too weak to release;
- report package blocked by QA;
- Build Fix scope missing;
- monthly Control evidence stale;
- dashboard publish failed.

Every failure should produce an internal alert and a customer-safe status when the customer is affected.

## Final command

Infrastructure reliability is category quality. Cendorq must not ship fragile live workflows. It should ship controlled layers that can scale from first customers to many businesses without losing evidence safety, access control, delivery reliability, or report trust.