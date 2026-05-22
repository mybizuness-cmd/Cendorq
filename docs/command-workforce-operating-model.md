# Cendorq Command Workforce Operating Model

This document defines how Cendorq coordinates owner direction, release-captain execution, chief-lane review, scoped scouting, validation, and handoff memory.

The goal is category ownership through better proof, better customer clarity, stronger visual command, stronger validation, and fewer disconnected work batches.

## Hierarchy

1. Owner command sets category direction and launch posture.
2. Release captain controls the active branch, validation, merge readiness, and final acceptance of findings.
3. Chief lanes coordinate domain review and filter weak findings.
4. Scoped scouts research, pressure-test, draft, and document findings inside narrow lanes.
5. Validators turn non-negotiable standards into repeatable gates.
6. Handoff memory records what changed, why it changed, what must not regress, and what should be inspected next.

## Chief lanes

- Report truth lane
- Customer command experience lane
- Visual command lane
- Security and command lane
- Market forecast lane

## Scout lanes

- Report truth scout
- Evidence conflict scout
- Industry context scout
- Visual hierarchy scout
- Report design quality scout
- Mobile command clarity scout
- Customer journey scout
- Validation drift scout
- Operator command scout
- Analytics and growth scout
- Business change forecasting scout

## Required finding shape

Every finding should include an id, lane, claim, evidence basis, risk level, customer impact, category impact, files or routes affected, recommended action, validator need, confidence, and release-captain decision.

## Big-batch rule

Use bigger batches when changes form one coherent operating layer and can be validated together. Use smaller batches when the change touches high-risk runtime, customer-facing truth, or live configuration.
