# Cendorq Learning Memory Standard

This standard defines how Cendorq learns over time without contaminating the long-term intelligence engine.

Cendorq should learn aggressively from broad signals, but it should only compound authority from the cleanest, best-labeled, source-backed, confidence-scored, outcome-linked data.

## Core rule

Learn broadly.
Promote carefully.
Compound only from trusted memory.

The system may explore many signals, but the system must not let noisy, manipulated, stale, hallucinated, weak, or unverified data become long-term truth.

## Memory layers

Cendorq memory should be separated into layers.

### Raw memory

Raw collected signals before quality decisions.

Examples:

- intake submissions
- website captures
- search snapshots
- AI-answer outputs
- review excerpts
- competitor observations
- agent notes
- report drafts
- rejected signals

Raw memory is useful for traceability, abuse detection, reprocessing, and context, but it should not directly control scores or long-term benchmarks.

### Exploration memory

Signals used for hypothesis generation, pattern spotting, agent research, and early insight.

Exploration memory may include low- or medium-confidence signals when clearly labeled.

It should not directly become public claims, benchmark rules, report conclusions, or scoring weights.

### Operational memory

Signals used for current client workflows.

Examples:

- active report findings
- current evidence
- current score inputs
- fix tasks
- current client status
- ongoing-control cycle state

Operational memory should be fresh, traceable, and auditable.

### Authority memory

High-quality memory allowed to influence long-term scoring, benchmarks, vertical playbooks, recommendations, and future system improvements.

Authority memory requires stronger standards:

- source-backed
- confidence-scored
- freshness-aware
- deduplicated
- outcome-linked when relevant
- reviewed or cross-validated when material
- separated from unsupported interpretation

### Rejected memory

Signals that should not influence business recommendations or long-term learning.

Examples:

- spam
- malicious submissions
- fabricated claims
- poisoned inputs
- duplicate abuse
- irrelevant data
- unsupported AI hallucinations
- unsafe or unusable content

Rejected memory may be retained privately when useful for abuse detection, security, deduplication, or quality controls.

## Promotion ladder

Data should move through a promotion ladder:

1. collected
2. labeled
3. confidence-scored
4. freshness-scored
5. source-linked
6. deduplicated
7. cross-checked when needed
8. used operationally
9. outcome-linked
10. promoted to authority memory when qualified

Promotion should be reversible when later evidence contradicts the signal.

## Purity gates

Before any data can influence long-term learning, scoring improvements, benchmarks, vertical packs, or durable recommendations, it should pass purity gates:

- source quality gate
- confidence gate
- freshness gate
- duplicate gate
- manipulation gate
- evidence gate
- outcome clarity gate
- sample-size gate where relevant
- privacy gate
- conflict-resolution gate when sources disagree

## Fast learning without contamination

Cendorq should be able to learn fast without corrupting authority memory.

Use separate channels:

- fast exploration channel for discovery and hypothesis generation
- controlled operational channel for active reports and fixes
- strict authority channel for long-term memory and benchmarks

This lets the system take advantage of new opportunities while preventing weak signals from becoming permanent doctrine.

## Outcome-linked learning

The strongest learning comes from linked outcomes.

Where possible, connect:

- initial signal
- finding
- recommendation
- fix shipped
- score movement
- search/AI/review change
- buyer action
- plan conversion
- retention signal
- operator review

A signal becomes more valuable when Cendorq can see what happened after acting on it.

## Data decay

Memory must decay when it becomes stale.

Search snapshots, AI answers, reviews, competitor pages, local listings, website metadata, and crawler behavior should not stay authoritative forever.

Cendorq should preserve old memory for history while lowering its influence when it becomes stale.

## Conflict handling

Conflicting data should not be forced into false certainty.

When sources disagree, preserve:

- both claims
- both sources
- timestamps
- confidence levels
- interpretation notes
- recommended verification path

Reports should explain material uncertainty when it affects a recommendation.

## Manipulation defense

Cendorq must assume some data can be manipulated.

Protect against:

- fake intakes
- competitor sabotage
- review manipulation
- prompt-injection content
- poisoned webpages
- low-quality directory spam
- duplicated evidence
- model hallucination
- scraped stale content
- coordinated reputation manipulation

Suspicious data should be isolated until verified.

## Privacy and retention

Learning memory must stay private by default.

Long-term memory should never expose private client information, raw evidence, reports, score inputs, or business-sensitive data publicly.

Use redaction, aggregation, anonymization, and access control when turning private memory into public insights or benchmarks.

## Public insight rule

Cendorq may publish category insights, but public insights should be:

- aggregated
- anonymized
- redacted
- stripped of private report logic
- stripped of client-sensitive context
- free of exact scoring weights
- free of private AI-agent prompts

## Quality labels

Every meaningful memory item should support labels such as:

- source type
- source reliability
- confidence
- freshness
- evidence status
- review status
- privacy class
- learning eligibility
- authority eligibility
- decay status

## No-downtime learning principle

Learning systems should be additive and reversible.

New learning pipelines should not block the buyer path, public pages, intake route, report access, or production health.

If a learning workflow fails, the product should degrade safely:

- keep intake available
- preserve existing reports
- avoid exposing partial private data
- mark missing evidence as unavailable
- retry later through controlled workflows
- log failures privately

## System protection principle

Learning must not create a new attack surface.

Do not expose:

- raw memory APIs
- public training data dumps
- public report indexes
- direct database queries
- private evidence URLs
- client history
- internal confidence labels when not intended
- private benchmark tables
- agent prompts
- scoring weights

## Final rule

Cendorq should learn from everything it safely can, but only trust what earns trust.

The learning moat is built from purified memory:

- source-aware
- evidence-backed
- confidence-scored
- freshness-aware
- outcome-linked
- private by default
- reversible when contradicted
- protected from manipulation
- strong enough to compound for decades
