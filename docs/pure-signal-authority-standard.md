# Cendorq Pure Signal Authority Standard

This standard defines what Cendorq means by a pure signal.

A pure signal is not a perfect signal. A pure signal is a well-labeled, source-aware, evidence-backed, freshness-aware, confidence-scored signal that is clean enough to influence reports, scores, learning memory, benchmarks, playbooks, and long-term operating intelligence.

The purpose of this standard is to help Cendorq learn fast without letting weak, noisy, manipulated, stale, hallucinated, or poorly labeled data corrupt the system.

## Core rule

Pure signals earn authority.

Signals do not become authoritative because they were collected, repeated, or produced by AI. They become authoritative only after they meet measurable quality conditions.

## Pure signal dimensions

Every meaningful signal should be evaluated across these dimensions:

1. source quality
2. evidence strength
3. freshness
4. independence
5. consistency
6. context completeness
7. confidence
8. manipulation risk
9. privacy class
10. outcome linkage
11. authority eligibility
12. decay status

## Source quality

A signal is stronger when it comes from a reliable source.

Preferred source types include:

- directly observed website content
- official business profiles
- official public policy or trust pages
- reputable review platforms
- captured search result pages or snippets with query context
- captured AI answer outputs with prompt context
- verified client-provided materials
- human-reviewed evidence
- consistent cross-source facts

Weaker source types include:

- anonymous claims
- unsupported AI summaries
- low-quality directories
- outdated scraped snippets
- competitor-submitted claims
- unverified user comments
- isolated social posts
- stale pages without context

## Evidence strength

A pure signal should be tied to evidence whenever possible.

Evidence may include:

- source URL
- screenshot
- captured text excerpt
- query used
- prompt used
- timestamp
- cited source
- review excerpt
- page metadata
- schema output
- crawl result
- operator note

Signals without evidence may be useful for exploration, but they should not become authority memory unless verified later.

## Freshness

A pure signal must know its age.

Freshness labels:

- fresh
- aging
- stale
- unknown

Signals that change often, such as AI answers, search results, reviews, local listings, and competitor pages, should decay faster than stable identity facts.

A stale signal may remain useful for history, but it should lose authority unless revalidated.

## Independence

A signal is stronger when it is supported by independent sources.

Examples:

- website claim plus official profile agreement
- review theme plus repeated review excerpts
- search result plus cited page
- AI answer plus source citation
- self-reported business fact plus public page confirmation

A repeated claim from copied directories should not be treated as truly independent without source review.

## Consistency

A signal is stronger when it agrees with other high-quality signals.

When signals conflict, Cendorq should preserve the conflict rather than collapse it into false certainty.

Conflict should trigger:

- confidence reduction
- verification flag
- source comparison
- freshness check
- human-review flag when material

## Context completeness

A pure signal should preserve enough context to be understood later.

Minimum context should include:

- source type
- capture method
- timestamp
- query or prompt when relevant
- business or competitor entity
- related report or scan
- data class
- confidence label
- privacy class

Without context, even accurate data becomes dangerous over time.

## Confidence

Use confidence levels consistently:

- high: source-backed, fresh, consistent, and context-rich
- medium: plausible and partially supported, but incomplete or inferred
- low: weak, stale, isolated, ambiguous, or unsupported
- rejected: spam, manipulated, fabricated, unsafe, irrelevant, or unusable

Only high-confidence and selected medium-confidence signals should influence authority memory.

Low-confidence signals may inform exploration only.

## Manipulation risk

Every signal should be evaluated for manipulation risk.

Manipulation risks include:

- spam submissions
- competitor sabotage
- fake reviews
- paid/low-quality directory noise
- prompt-injection content
- poisoned source pages
- duplicated evidence
- scraped stale content
- coordinated reputation manipulation
- AI hallucination

High manipulation risk should prevent authority promotion unless verified through stronger independent evidence.

## Privacy class

Signal quality does not override privacy.

A high-quality signal can still be private, confidential, or restricted.

Use privacy classes:

- public
- internal
- confidential
- restricted

Client reports, evidence, score inputs, private notes, raw intakes, agent runs, and outcome memory should remain private by default.

## Outcome linkage

The strongest signals are linked to outcomes.

Outcome linkage may connect:

- initial signal
- finding
- recommendation
- fix shipped
- score movement
- search/AI/review movement
- buyer action
- plan conversion
- retention signal
- operator review

Outcome-linked signals should receive stronger learning value than isolated observations.

## Authority eligibility

A signal may become authority-eligible only when it has enough quality to influence durable systems.

Authority-eligible signals may influence:

- score model improvements
- report recommendations
- vertical playbooks
- benchmarks
- future agent guidance
- long-term outcome memory
- strategic insights

Authority eligibility requires:

- source quality label
- evidence or verification path
- freshness label
- confidence label
- manipulation-risk review
- privacy class
- context completeness
- conflict status
- outcome linkage when relevant

## Pure signal score

When a numeric quality score is useful, use a practical pure signal score from 0 to 100.

Suggested dimensions:

- source quality: 0 to 20
- evidence strength: 0 to 20
- freshness: 0 to 15
- independence: 0 to 10
- consistency: 0 to 10
- context completeness: 0 to 10
- manipulation risk: 0 to 10, scored higher when risk is lower
- outcome linkage: 0 to 5

Suggested bands:

- 85 to 100: authority-grade
- 70 to 84: operational-grade
- 50 to 69: exploration-grade
- 25 to 49: weak signal
- 0 to 24: reject or quarantine

These bands should guide treatment, not replace judgment.

## Authority-grade signal

Authority-grade signals may influence long-term learning and durable system improvements.

They should be:

- source-backed
- evidence-backed
- fresh or properly revalidated
- context-rich
- low manipulation risk
- consistent or conflict-labeled
- privacy-classified
- confidence-scored
- reviewable later

## Operational-grade signal

Operational-grade signals may be used in active workflows, reports, and recommendations when properly labeled.

They may require review before influencing long-term memory.

## Exploration-grade signal

Exploration-grade signals may help agents notice patterns or generate hypotheses.

They must not become public claims, benchmarks, scoring rules, or strong recommendations without better evidence.

## Weak signal

Weak signals should not drive decisions.

They may be stored for context, abuse detection, or future comparison when safe.

## Rejected or quarantined signal

Rejected or quarantined signals should not influence reports, scores, recommendations, or memory.

They may be retained privately only when useful for security, deduplication, abuse detection, or auditability.

## Promotion rule

Promotion from exploration to operational to authority memory should be explicit and reversible.

A signal should be demoted when:

- it becomes stale
- stronger conflicting evidence appears
- source quality drops
- manipulation is detected
- privacy concerns increase
- outcome linkage fails
- operator review rejects it

## Final rule

Pure does not mean perfect.
Pure means clean enough, labeled enough, sourced enough, fresh enough, safe enough, and trustworthy enough for the level of influence it is given.

Cendorq should collect broadly, explore safely, promote carefully, and compound only from signals that earn authority.
