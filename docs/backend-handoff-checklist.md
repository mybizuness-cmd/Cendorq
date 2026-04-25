# Cendorq Backend Handoff Checklist

Use this checklist when backend ZIP files, API routes, databases, services, background jobs, authentication, payments, AI services, email, CRM, storage, webhooks, or server-side integrations are introduced.

The goal is simple: connect backend work only after the public buyer path, configuration, integration, privacy, operational, and AI-agent handoff guardrails are ready.

## Backend handoff principle

Backend work should make the product more reliable, not harder to trust. If a backend change exposes buyer data, creates unclear failure states, breaks the buyer path, or lacks recovery behavior, it is not production-ready.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required pre-handoff checks

Before unpacking or merging backend ZIP work, confirm:

- The ZIP source is known and expected.
- The ZIP contents are inspected before any code is run.
- Service credentials and private runtime values are kept out of the repository.
- Environment variables are listed in `.env.example` using safe placeholder values only.
- Public and private configuration boundaries are clear.
- API routes fail safely and do not expose implementation details.
- Form submissions avoid logging sensitive buyer content by default.
- Third-party services are documented and necessary.
- Database or storage assumptions are documented.
- Error states are buyer-friendly and recoverable.
- Health and smoke checks are updated when runtime behavior changes.
- Privacy, policy, integration, analytics, observability, and AI-agent handoff expectations are considered.

## ZIP intake checks

For each backend ZIP:

- Inspect the file tree before merging.
- Identify runtime, framework, package manager, and service dependencies.
- Identify entrypoints, API routes, jobs, scripts, migrations, and config files.
- Identify generated files, build outputs, logs, or local-only artifacts that should not be committed.
- Identify package or lockfile changes before installing.
- Identify network calls or third-party SDKs before running code.

## Security and privacy checks

Before running backend code, confirm:

- Private runtime values are not stored in the repo.
- Local environment files with real values are not committed.
- Webhook verification is planned when webhooks exist.
- Server-only values are not exposed client-side.
- Logs redact sensitive data.
- Production error responses stay safe and plain.

## Data handling checks

For data handling, confirm:

- Collected fields are necessary.
- Storage behavior is documented.
- Retention expectations are clear when relevant.
- Customer-sensitive information is not included in examples.
- Submitted form content is not sent to third parties unnecessarily.
- Analytics events do not include private form content.

## AI-agent handoff checks

Before handing backend work to another AI agent, ChatGPT chat, or developer, confirm:

- `docs/ai-agent-handoff.md` is current.
- The latest branch or PR status is clear.
- The current validation status is clear.
- The next intended backend step is stated.
- The backend ZIP intake status is stated.
- Required files to read first are listed.
- Known risks, open questions, and non-goals are written plainly.
- Future work is not described as already complete.

## Operational checks

Before production use, confirm:

- Health checks still work.
- Smoke checks cover changed public dependencies.
- Failure modes are visible without leaking private data.
- Rollback path is clear.
- Manual QA covers the changed flow.
- Release notes describe what changed without overpromising.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting backend changes, also run after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use backend work as a reason to add:

- unreviewed ZIP contents
- private runtime values in the repository
- unnecessary third-party services
- private data exposure
- unclear failure states
- unsupported automation claims
- frontend clutter
- technical language that reduces buyer clarity
