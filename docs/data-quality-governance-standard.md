# Cendorq Data Quality Governance Standard

This standard protects the quality of the data Cendorq gathers, stores, learns from, reports on, and uses to improve over time.

The goal is not to reject every imperfect signal. The goal is to preserve learning while preventing weak, noisy, manipulated, stale, biased, hallucinated, or low-confidence data from corrupting the intelligence engine.

## Core rule

Cendorq must compound from trustworthy data, not just more data.

Every data point should be treated as a signal with context, source, confidence, freshness, and risk.

Data should not become permanent truth just because it was collected.

## Data quality principles

Cendorq data must be:

- source-aware
- confidence-scored
- freshness-aware
- evidence-linked when possible
- reversible when uncertain
- auditable when used in reports
- separated from interpretation
- protected from direct public access
- marked when self-reported
- marked when externally observed
- marked when AI-generated
- marked when human-reviewed
- allowed to improve over time

## Data classes

### Self-reported data

Data submitted by a business, prospect, partner, or user.

Self-reported data is useful, but it is not automatically verified truth.

It should be stored with:

- submission timestamp
- source context
- submitter context when available
- validation status
- confidence level
- verification status

### Externally observed data

Data gathered from public or connected sources.

Externally observed data should be stored with:

- source URL or source name
- capture timestamp
- query or prompt used
- retrieval method
- confidence level
- freshness label
- permission/access context where relevant

### AI-generated data

Data produced by AI agents or model-assisted workflows.

AI-generated data is never raw truth by itself.

It must be tied to:

- input evidence
- source context
- prompt/run metadata when appropriate
- confidence level
- review status
- uncertainty notes when needed

### Human-reviewed data

Data or findings reviewed by an approved operator.

Human review can raise confidence, but it should not erase original source context.

Human-reviewed records should preserve:

- reviewer identity or system role
- review timestamp
- review outcome
- notes or decision reason
- original unreviewed signal when safe to retain

## Signal confidence levels

Use practical confidence levels:

- high: directly observed, source-backed, fresh, and consistent
- medium: plausible and supported, but incomplete or partially inferred
- low: weak, stale, self-reported only, ambiguous, or externally inconsistent
- rejected: spam, fabricated, irrelevant, unsafe, duplicated, manipulated, or unusable

Low-confidence data may be used for exploration, but not as the sole basis for serious report claims, score changes, or client recommendations.

## Freshness rules

Data decays.

Every important external signal should include a freshness label:

- fresh
- aging
- stale
- unknown

Freshness should depend on the source and use case.

AI answer outputs, search result snapshots, review posture, competitor pages, website metadata, schema, sitemap, robots behavior, and source authority should all be treated as time-sensitive in different ways.

## Source quality rules

Not every source has equal weight.

Cendorq should prefer:

- primary business sources
- official profiles
- reputable review platforms
- search/AI outputs captured with query context
- directly observed website content
- consistent cross-source signals
- recent external evidence

Cendorq should treat carefully:

- anonymous claims
- outdated pages
- scraped fragments
- unsupported AI summaries
- user-submitted competitor claims
- low-quality directories
- manipulated review patterns
- inconsistent third-party profiles

## Outside data ingestion rule

Outside data is valuable, but it must not be blindly trusted.

Every outside-data workflow should capture:

- source
- timestamp
- query or prompt
- retrieval context
- source type
- confidence
- freshness
- whether it can be cited or shown in a report

When outside data conflicts, Cendorq should preserve the conflict rather than collapse it into a false certainty.

## AI-answer data rule

AI answer outputs are volatile.

AI-search and AI-answer data should be stored as point-in-time evidence, not permanent truth.

Every AI-answer capture should include:

- model or surface when known
- prompt/query
- timestamp
- answer excerpt or structured output
- cited sources if available
- brand mention status
- competitor mention status
- sentiment/position if used
- uncertainty or instability note when appropriate

## Data contamination risks

Cendorq must guard against:

- spam submissions
- duplicate submissions
- fabricated business details
- malicious competitor entries
- prompt-injection content
- review manipulation
- outdated search snapshots
- stale AI answer captures
- hallucinated AI interpretations
- poisoned source pages
- scraped low-quality directories
- overfitting to small samples
- confusing correlation with causation
- letting old data override fresh evidence

## Anti-contamination controls

Use layered controls:

- validation
- spam detection
- duplicate detection
- source labeling
- confidence scoring
- freshness labels
- outlier detection
- human-review flags
- evidence requirements
- source diversity checks
- audit logs
- reversible findings
- rejected-data retention only when safe and useful for abuse detection

## Report-use rules

A report finding should not rely on a single weak signal.

For serious findings, prefer at least one of:

- direct website evidence
- external source evidence
- search/AI output evidence
- review/local evidence
- cross-source consistency
- human-reviewed confirmation

Reports should distinguish:

- observed fact
- inferred issue
- recommended fix
- uncertain signal
- unsupported claim that should not be used

## Scoring-use rules

Scores should be explainable and resilient.

A score should not swing heavily from one low-confidence signal unless that signal indicates safety, spam, privacy, or severe trust risk.

Score inputs should preserve:

- input source
- input confidence
- input freshness
- input category
- whether the input was self-reported, externally observed, AI-generated, or human-reviewed

## Learning-use rules

Outcome memory is a moat only if it is clean.

Before data is allowed to influence long-term benchmarks, vertical playbooks, scoring improvements, or future recommendations, it should be checked for:

- source reliability
- sufficient sample size
- recency
- duplicate influence
- obvious manipulation
- outcome clarity
- whether the improvement can reasonably be associated with the fix

Weak data can remain useful as a weak signal, but it must not become a strong rule.

## Exploration versus authority

Cendorq should not be too strict to learn.

Use two zones:

### Exploration zone

Allows lower-confidence signals for discovery, hypothesis generation, pattern spotting, and agent research.

### Authority zone

Requires stronger evidence before influencing client reports, public claims, benchmarks, scoring changes, or long-term playbooks.

This lets Cendorq learn broadly while protecting the core intelligence system.

## Privacy and protection

Data quality and data protection work together.

High-quality data is still private if it contains client intelligence, report findings, evidence, business context, or proprietary scoring context.

Protect:

- raw intake data
- raw evidence
- report findings
- AI-agent runs
- score inputs
- outcome memory
- client history
- competitor intelligence
- rejected or suspicious data

Do not expose private data publicly just because it is useful.

## Operator review triggers

Flag for human or higher-confidence review when:

- data is contradictory
- source quality is low
- data could materially affect a report recommendation
- data could materially affect score tier
- data contains sensitive client context
- data suggests legal, compliance, or safety risk
- data suggests competitor manipulation
- AI output is confident but weakly sourced
- a major recommendation depends on one volatile signal

## Long-horizon compounding rule

Cendorq must be able to trust its own memory 5, 10, 20, and 50 years from now.

That requires:

- preserving source context
- preserving confidence levels
- preserving freshness
- separating evidence from interpretation
- tracking fixes and outcomes
- avoiding overfitting
- retaining auditability
- allowing stale data to decay
- preventing low-quality data from becoming authoritative

## Final rule

Collect broadly.
Label carefully.
Trust gradually.
Use evidence.
Preserve context.
Protect private data.
Let weak signals inform exploration, not authority.
Let strong, source-backed, outcome-linked signals compound the moat.
