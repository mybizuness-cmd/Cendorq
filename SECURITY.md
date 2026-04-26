# Security Policy

Cendorq takes production safety, closed intelligence, data quality, and responsible disclosure seriously.

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
- closed intelligence boundaries
- no direct database exposure
- signed report access and private report surfaces
- least-privilege access expectations
- data quality, pure signal, and learning-memory protection risks

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
- closed intelligence
- private scoring and private report schemas
- AI-agent evidence gates
- no direct database exposure
- signed report access expectations
- least-privilege access expectations
- data quality and pure signal standards
- learning memory separation
- adaptive signal evolution
- resilience and continuity

## Closed intelligence and data protection

Cendorq's private engine must stay private.

Security-sensitive changes must not expose:

- direct database access
- public database browsers
- client-side database credentials
- public report indexes
- public evidence indexes
- private scoring logic
- private AI-agent prompts
- private report schemas
- client reports
- client evidence
- raw competitor datasets
- private outcome memory

Reports and sensitive intelligence should be controlled through signed report access, authenticated internal tools, or another approved server-side access boundary.

Data quality is part of security. Weak, noisy, stale, manipulated, or hallucinated data can contaminate long-term learning and should be labeled, confidence-scored, freshness-aware, and separated from authority memory unless it earns authority.

Pure signal standards, adaptive signal evolution, and learning memory must not create direct public access, secret leakage, report leakage, or new unaudited data paths.

## Public language safety

Security or production changes should not weaken the public buyer path, revive old public labels, or add homepage clutter. Keep the Free Scan path clear and protected.
