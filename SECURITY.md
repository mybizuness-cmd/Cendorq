# Security Policy

Cendorq takes production safety and responsible disclosure seriously.

## Reporting a vulnerability

Report security concerns through the public Connect path:

- https://cendorq.com/connect

For automated scanners and security tooling, the public security contact file is available at:

- https://cendorq.com/.well-known/security.txt

Please include:

- a clear description of the issue
- affected route, file, endpoint, or workflow
- steps to reproduce
- expected impact
- screenshots or logs if helpful
- whether the issue is public or actively exploitable

Do not include secrets, private credentials, personal data, or exploit payloads beyond what is needed to explain the issue.

## Scope

In scope:

- public Cendorq web routes
- public discovery files
- production headers and caching behavior
- public API health behavior
- repository CI and production validation workflows
- dependency and GitHub Actions maintenance risks

Out of scope:

- spam, social engineering, or physical attacks
- denial-of-service testing
- attempts to access data you are not authorized to access
- destructive testing
- issues that require compromised credentials or local device access unrelated to Cendorq

## Production posture

Security-sensitive production behavior is protected by route validation and CI. Before merging changes, run:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

After deployment, run:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Protected surfaces

The repository protects:

- canonical buyer routes
- production security headers
- API no-store and noindex behavior
- health endpoint response shape
- robots.txt
- sitemap.xml
- llms.txt
- security.txt
- manifest metadata
- production smoke checks
- issue and pull request quality gates
- Dependabot maintenance config

## Public language safety

Security or production changes should not weaken the public buyer path, revive old public labels, or add homepage clutter. Keep the Free Scan path clear and protected.
