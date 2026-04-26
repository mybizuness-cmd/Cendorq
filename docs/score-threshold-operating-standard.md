# Cendorq Score Threshold Operating Standard

This standard defines how Cendorq should use percentages, score bands, signal thresholds, routing thresholds, quality levels, and action triggers without cluttering the public experience.

Scores are useful when they drive better decisions. Scores become harmful when they create noise, false certainty, or public confusion.

## Core rule

Use score bands internally to guide action. Use plain meaning publicly to guide the customer.

The customer should not be forced to decode a dashboard. The internal system should still know exactly what the numbers mean.

## Score purpose

Scores exist to help Cendorq decide:

- what is weak
- what is strong
- what needs review
- what can be automated
- what needs evidence
- what should be routed next
- what should be watched
- what should be fixed
- what can be promoted to stronger memory
- what should be quarantined or rejected

Scores should not be used as fake guarantees.

## Core score bands

Use these practical bands unless a specific workflow defines a stronger reason to adjust them.

### 0 to 24: reject or quarantine

Use when the signal is unusable, spammy, unsafe, fabricated, irrelevant, or too contaminated.

Action:

- reject or quarantine
- do not use in reports
- do not use in authority memory
- retain privately only when useful for abuse detection, security, deduplication, or auditability

### 25 to 49: weak signal

Use when there is some information, but it is too thin or unreliable to drive serious action.

Action:

- keep in low-authority storage
- ask for more detail when appropriate
- do not make serious findings from this alone
- do not promote to authority memory

### 50 to 64: exploration-grade

Use when the signal is useful for discovery but not strong enough to drive major decisions.

Action:

- allow agent exploration
- allow hypothesis generation
- require stronger evidence before reporting serious claims
- keep visible internally as incomplete or developing

### 65 to 69: watch-grade

Use when the signal is close to being operational but still needs caution.

This is the important bridge band. It should not be ignored and should not be overtrusted.

Action:

- show internally as watch-grade
- identify missing fields or missing evidence
- recommend the next data needed
- do not clutter public pages with the raw number
- allow limited workflow routing only with clear confidence labels

### 70 to 79: operational-grade

Use when the signal is strong enough to support active workflow decisions.

Action:

- route to likely next plan
- create tasks
- generate report sections with confidence labels
- allow automation with guardrails
- require evidence for serious claims
- keep promotion to authority memory separate

### 80 to 89: strong operational-grade

Use when the signal is strong, complete, and useful for confident workflow decisions.

Action:

- prioritize for review or automation
- route with stronger confidence
- generate fuller report output
- create fix plan candidates
- allow outcome tracking
- consider authority promotion after evidence and outcome checks

### 90 to 100: authority-grade candidate

Use when the signal is strong enough to be considered for durable learning, benchmarks, playbooks, or authority memory.

Action:

- require final authority checks
- verify source quality
- verify evidence strength
- verify freshness
- verify manipulation risk
- verify privacy class
- link to outcomes when relevant
- promote only when qualified

## Public display rule

Do not clutter public pages with too many raw scores.

Public pages should favor plain labels:

- needs more detail
- early signal
- watch this closely
- ready for deeper review
- ready for focused fix
- ready for ongoing control

Raw numbers may appear in reports only when they help the customer understand priority without creating false certainty.

## Internal display rule

Internal panels may show raw scores, but only with context.

Every important score should show:

- band
- meaning
- confidence
- freshness
- source quality
- next action
- missing evidence when relevant

A number without context is not intelligence.

## Recommended threshold labels

Use these labels in internal tooling:

- 0 to 24: quarantine
- 25 to 49: weak
- 50 to 64: exploration
- 65 to 69: watch
- 70 to 79: operational
- 80 to 89: strong
- 90 to 100: authority candidate

Use these labels in customer-facing output when needed:

- needs more detail
- early signal
- worth watching
- ready for deeper review
- ready for focused improvement
- strong enough for ongoing control

## Routing rules

Suggested routing posture:

- under 50: do not route to paid workflow without more detail
- 50 to 64: recommend more information or Free Scan completion
- 65 to 69: recommend watch or light review
- 70 to 79: route to Deep Review when the problem is not fully clear
- 80 to 89: route to Build Fix when the fix path is clear
- 90 and above: route to Ongoing Control only when the base is strong enough and the need is ongoing

Routing is not based on score alone. It must consider fit, evidence, business context, risk, and plan readiness.

## Alert rules

Alert internally when:

- a score drops below 70 after being operational
- a strong score has weak evidence
- a high score has high manipulation risk
- a report depends on watch-grade data
- Ongoing Control clients show repeated score decay
- an AI-answer snapshot changes materially
- a competitor becomes easier to choose in repeated scans
- data freshness becomes stale

## Automation rules

Automation may act more freely as scores rise, but must still respect protection rules.

Suggested automation levels:

- under 50: no serious automation beyond capture, validation, and quarantine
- 50 to 64: exploration only
- 65 to 69: limited automation with watch labels
- 70 to 79: workflow automation with evidence gates
- 80 to 89: stronger automation with review triggers
- 90 to 100: authority-candidate workflow with promotion checks

## No false precision rule

Do not pretend the score is mathematically perfect.

Scores should guide decisions, not replace judgment.

Use ranges, bands, confidence, and explanation instead of overclaiming exact certainty.

## No clutter rule

If a score would clutter the experience, hide the number and show the meaning.

Good public label:

- ready for deeper review

Bad public label:

- 67.4% exploratory-conversion-routing readiness score

## Report rule

Reports should only show scores when they help the buyer act.

When scores appear in reports, include:

- what it means
- why it matters
- what evidence supports it
- what action should happen next

## Final rule

Numbers should make Cendorq smarter, not noisier.

Internally, use precise score bands to route, alert, automate, and protect quality.
Publicly, translate those scores into simple, powerful next actions the customer can understand immediately.
