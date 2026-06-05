# Cendorq Report Delivery and Plan Workflow Doctrine

This doctrine defines how Cendorq reports, dashboards, PDF files, emails, paid plan deliverables, repair work, and ongoing monthly control outputs must work together.

Cendorq reports are not one-off documents. They are part of the AI Search Presence Repair operating system: Scan, Review, Repair, Control.

## Core delivery rule

Every plan that produces work must create a customer-visible artifact in two places:

1. Customer Dashboard: the live, interactive version with status, charts, repair actions, evidence-safe findings, and next command.
2. Email/PDF Delivery: a polished file or link the customer can save, forward, and review later.

The dashboard and PDF must share the same source data, score logic, evidence boundary, plan routing, and customer-safe language. The PDF may be more narrative and executive-ready; the dashboard may be more interactive and action-oriented.

## Public benchmark principles to adapt

Use best-in-class public product/report patterns as learning material only:

- executive score and state first;
- severity grouping;
- charts tied to decisions;
- issue/finding tables;
- exportable/shareable reports;
- scheduled or recurring report delivery for ongoing monitoring;
- clear recommendations and fix instructions;
- drill-down views for deeper evidence;
- never present decorative visuals that do not support a decision.

Do not copy competitor UI, proprietary report templates, exact wording, private workflows, brand assets, or internal logic. Build a Cendorq-native system for AI Search Presence Repair.

## Report surfaces

### Dashboard report

The dashboard report is the active work surface. It must show:

- Presence Score;
- score meaning;
- signal severity;
- Choice Gap;
- source/signal matrix;
- competitor/context pressure when evidence supports it;
- Repair Priorities;
- Recommended Next Move;
- plan fit;
- status of requested work;
- available PDF/email artifacts;
- safe CTA to the next plan or action.

Dashboard CTAs must be evidence-first, not pressure-first. The report should teach the customer why the next plan matters before asking them to pay.

### PDF/email report

The PDF/email report is the portable artifact. It must include:

- branded cover/header;
- business name and report type;
- report date and plan depth;
- executive summary;
- Presence Score and meaning;
- key charts and tables;
- evidence-safe findings;
- Choice Gap explanation;
- Repair Priorities;
- recommended next command;
- what is included and excluded;
- safety boundary: no guaranteed rankings, leads, revenue, AI placement, or algorithm control.

The email must be concise and route the customer back to the dashboard for interactive review and next action.

## Plan-specific deliverables

### Free Scan

Dashboard artifact:

- first signal summary;
- light Presence Score or first-signal score;
- one or more likely weak areas;
- safe next command recommendation;
- CTA to Deep Review when evidence depth is needed.

Email/PDF artifact:

- short first-signal PDF or report summary;
- business state in one clear sentence;
- first weak public signal;
- what this may mean;
- why deeper Review may or may not be needed.

Free Scan must not pretend to be a full paid report.

### Deep Review

Dashboard artifact:

- full Presence Report;
- source/signal breakdown;
- Choice Gap;
- competitor/context pressure when evidence supports it;
- severity distribution;
- evidence confidence;
- Repair Priorities;
- recommendation to Build Fix, Ongoing Control, smaller action, or no paid next step yet.

PDF/email artifact:

- polished Deep Review Report;
- executive summary;
- charts/tables for Presence Score, severity, signals, comparison, Choice Gap, and repair priorities;
- evidence notes;
- recommended next command.

Deep Review exists to prove the cause before bigger work begins.

### Build Fix

Dashboard artifact before work:

- approved weak signal;
- fix objective;
- current state;
- implementation scope;
- expected decision improvement;
- status timeline.

Dashboard artifact after work:

- work completed;
- before/after comparison;
- changed copy, structure, page section, proof point, action path, or public signal;
- validation checklist;
- recommended next scan/review/control action.

PDF/email artifacts:

- Build Fix Work Plan before implementation;
- Build Fix Completion Report after implementation;
- before/after visuals or screenshots when available;
- scope boundaries and what remains unresolved.

Build Fix must remain scoped to the approved weak point. It is not unlimited implementation.

### Ongoing Control

Dashboard artifact:

- Control Snapshot;
- monthly signal health;
- drift alerts;
- competitor/context movement when evidence supports it;
- protected strengths;
- new risks;
- next monthly priorities;
- status of previous repairs.

PDF/email artifact:

- Monthly Control Report;
- score changes;
- severity movement;
- proof and public signal changes;
- drift notes;
- recommended next action;
- what was monitored and what was not.

Ongoing Control is not a substitute for Review or Build Fix. It monitors and compounds once the base is strong enough.

## Agent workflow by deliverable

Every deliverable must move through these agent stages:

1. Intake Scout: confirms business, location, category, service area, submitted context, and missing data.
2. Evidence Scout: gathers public evidence and labels source quality.
3. Business Truth Builder: separates approved facts, assumptions, restricted claims, and unknowns.
4. Presence Analyst: scores Findability, Understanding, Trust, Choice, Action, and Control.
5. Competitor/Context Analyst: compares against relevant alternatives only when evidence supports it.
6. Choice Gap Analyst: writes the customer-safe decision weakness.
7. Repair Architect: creates the repair plan, work scope, or monthly control priorities.
8. Plan Router: maps the next action to Free Scan, Deep Review, Build Fix, or Ongoing Control.
9. Report Designer: selects dashboard/PDF modules and graph types that fit the finding.
10. Customer-Safe Writer: rewrites output into plain, precise business language.
11. QA/Release Gate: blocks false claims, weak evidence, private internals, unsupported promises, or wrong plan routing.
12. Delivery Agent: publishes to dashboard, emails the customer, attaches/sends the PDF or secure link, and records the delivery event.

## Required chart types

Allowed chart types must explain decisions:

- Presence Score card;
- score lift path;
- severity stack;
- source health matrix;
- competitor pressure bars;
- before/after comparison;
- monthly drift line;
- repair status timeline;
- evidence confidence table;
- plan fit matrix.

Do not use meaningless decorative graphs. Every graph must answer: what changed, what is weak, what is strong, what pressure exists, what gets fixed first, or what needs control.

## Conversion doctrine

Conversion must be evidence-led:

- show the finding first;
- explain why it matters;
- show what the next command does;
- show what is included and excluded;
- then offer the next paid action.

Do not pressure customers before the report gives value. Do not hide the next step. Do not blur plan boundaries.

## PDF/email delivery requirements

Each email delivery should include:

- direct subject line naming the report type;
- short plain-language summary;
- dashboard link;
- PDF attachment or secure PDF link;
- next recommended action;
- scope boundary.

Each PDF should include:

- report type;
- plan depth;
- date;
- source/evidence confidence where relevant;
- charts/tables;
- next action;
- limitations.

## Future implementation implications

The codebase should eventually support:

- report package source shared by dashboard and PDF renderer;
- report versioning;
- delivery log;
- email template registry by plan type;
- PDF generation by report type;
- customer dashboard report vault;
- payment-triggered report creation and access;
- Build Fix before/after artifacts;
- Ongoing Control monthly scheduled reports;
- QA/release gate before customer delivery.

## Final command

Every paid Cendorq plan must produce real, plan-appropriate work and a plan-appropriate artifact. The customer should be able to see it in the dashboard, receive it by email, keep it as a PDF, and understand exactly what happened, why it matters, and what the safest next move is.
