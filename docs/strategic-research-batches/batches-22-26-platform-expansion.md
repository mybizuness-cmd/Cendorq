# Cendorq Strategic Research Batches 22-26: Platform Expansion

These batches extend the prior research into the next necessary layers for a category-dominating AI Search Presence Repair company. They are source material for future agent work, dashboard work, report delivery, plan workflow, and implementation batches.

## Batch 22: Design system, component registry, and product surface consistency

Cendorq needs a strict product design system, not one-off screens.

Required direction:

- establish reusable dashboard/report components;
- define score cards, severity stacks, source matrices, comparison bars, timelines, report vault cards, delivery controls, and action panels;
- keep public, customer, operator, PDF, email, and support surfaces visually related but context-aware;
- use serious restrained motion only when it improves understanding;
- use responsive rules for phone, tablet, laptop, and desktop;
- avoid decorative charts, weak mockup cards, fake activity, and unexplainable visuals.

Agent instruction:

- The Report Designer and Visual Command agents must choose from approved modules.
- New visuals must answer a real decision question.
- No surface should look premium while communicating little.

Implementation implications:

- create a visual module registry;
- create report component contracts;
- create device-width review targets per surface;
- make dashboard and PDF share design tokens where possible.

## Batch 23: Mobile, tablet, PDF, and omnichannel experience

Cendorq must preserve meaning across every device and artifact.

Required direction:

- mobile dashboards should summarize state and next action first;
- desktop dashboards can show dense signal matrices and command panels;
- PDFs should be paginated and executive-ready, not screenshots of dashboard pages;
- emails should be short, clear, and route back to dashboard/PDF;
- report vault should work on mobile without losing access clarity.

Agent instruction:

- Every artifact must declare the target render mode: dashboard, mobile, PDF, email, vault, or support.
- Do not design a module that only works on desktop unless it has a mobile fallback.
- A phone user should still understand score, risk, next action, and report status.

Implementation implications:

- create mobile-first report summaries;
- create PDF-specific layout components;
- create email summary templates;
- add screenshot/device review for 390px, 430px, 768px, 1024px, and 1440px.

## Batch 24: Analytics warehouse, metrics layer, and business intelligence

Cendorq needs a governed metric layer for product, customer, and report operations.

Required direction:

- collect report lifecycle events;
- collect delivery events;
- collect customer journey events;
- collect plan conversion and activation events;
- collect agent QA failure reasons;
- separate internal analytics from customer-visible report metrics.

Core metrics:

- Free Scan submitted;
- First Signal Report viewed;
- Deep Review purchased;
- Deep Review delivered;
- PDF downloaded;
- Build Fix scope approved;
- Completion Report viewed;
- Ongoing Control active;
- Monthly Control Snapshot delivered;
- report-to-plan conversion;
- support tickets by topic;
- QA blocked reports by reason.

Agent instruction:

- The Metric Steward protects definitions.
- No report should redefine a metric silently.
- Customer-facing metrics must be distinct from internal business analytics.

Implementation implications:

- define event schemas;
- define analytics contracts;
- define report lifecycle tables;
- add dashboards for owner/operator visibility later.

## Batch 25: AI evaluation, red-team checks, and agent quality scoring

Cendorq agents must be evaluated, not trusted by tone.

Required direction:

- evaluate factual accuracy;
- evaluate evidence support;
- evaluate plan routing;
- evaluate customer-safe language;
- evaluate unsupported guarantee risk;
- evaluate chart usefulness;
- evaluate PDF/dashboard/email consistency.

Core evaluation checks:

- source support exists;
- uncertainty is stated where needed;
- competitor claims are supported;
- plan recommendation matches evidence depth;
- no private internals are exposed;
- no guaranteed rankings, leads, revenue, AI placement, or algorithm control;
- report visuals explain decisions;
- next CTA is evidence-led.

Agent instruction:

- The QA/Release Gate must block weak outputs.
- The Critic Agent must challenge every customer-facing finding.
- Failed reports should produce a reason and recovery path.

Implementation implications:

- create evaluation rubrics;
- create blocked-output categories;
- create agent trace review;
- create release status fields.

## Batch 26: Security, privacy, permissions, and customer data boundaries

Cendorq must protect customer reports, PDFs, evidence, billing state, support details, and operator notes.

Required direction:

- no blank dashboards for unknown visitors;
- no paid reports without entitlement;
- no report PDFs through unprotected public URLs;
- no raw intake payloads or private scoring internals in public/customer surfaces;
- no operator notes exposed unless rewritten and approved;
- no account-existence leakage;
- no provider login buttons until real callback runtime and session handling are live.

Access states:

- unknown visitor;
- scan-created customer;
- paid Deep Review customer;
- Build Fix customer;
- Ongoing Control customer;
- support-only access;
- internal operator.

Agent instruction:

- The Entitlement Agent decides access.
- The Evidence Access Agent decides visibility.
- The Secure Delivery Agent protects report artifacts.
- The Release Gate blocks unsafe exposure.

Implementation implications:

- enforce server-side access;
- create report entitlement checks;
- create delivery logs;
- create access-aware report vault;
- define secure PDF/link strategy before live customer data is released.

## Final batch command

Batches 22-26 make the system stronger at the foundation layer: visual consistency, device quality, analytics, agent evaluation, and security. These are not optional polish layers. They are required for Cendorq to behave like a category-dominating product rather than a collection of isolated pages.