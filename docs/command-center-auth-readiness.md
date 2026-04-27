# Command Center Auth Readiness

This checklist protects the move from preview-gated Command Center shells toward real production identity, roles, and permissions.

## Principle

Authentication verifies identity. Cendorq authorization controls what that identity can do inside the private Command Center.

The Command Center must remain closed by default when auth is missing, misconfigured, or uncertain.

## Required server-only configuration

Required server-only configuration:

- `AUTH_PROVIDER`
- `AUTH_SECRET`

Do not expose auth configuration values in public output, client code, docs, logs, screenshots, or readiness responses.

## Provider direction

Clerk is an acceptable first provider because it is common with Next.js and Vercel. The implementation should still keep Cendorq authorization state internally through the Command Center schema.

The provider verifies identity. Cendorq owns:

- roles
- permissions
- user overrides
- access events
- invitations
- service access metadata
- policy checks

## Required capabilities

Before showing live private module data, auth must support:

- server-side session validation
- closed-by-default fallback
- role mapping
- permission enforcement
- access decision recording
- noindex private route metadata
- no client-only protection for sensitive data

## Preview gate rule

The preview-header gate is temporary bootstrap infrastructure. It must not become the permanent production auth model.

Keep it only until real private auth is configured and verified.

## Before wiring auth

Confirm:

- Command Center routes use the centralized access helper
- readiness route is protected
- production smoke confirms private routes stay closed without access
- access-control schema is present
- incident playbook and release gate are current

## After wiring auth

Confirm:

- unauthenticated users cannot view private modules
- authenticated users without the right role cannot view restricted modules
- access decisions are recorded server-side
- private routes remain noindex and nofollow
- no live records are fetched in client-only code
- production smoke still passes

## Non-negotiables

- No public auth secrets.
- No client-only protection for sensitive data.
- No public Command Center data.
- No bypass route for private modules.
- No weakening validation to make auth pass.
- No provider lock-in that prevents internal authorization records.
