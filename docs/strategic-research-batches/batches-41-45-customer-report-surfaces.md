# Cendorq Strategic Research Batches 41-45: Customer Report Surfaces

These batches define the customer-facing report and dashboard surfaces that convert research into useful product experience.

## Batch 41: Customer Dashboard Information Architecture

The customer dashboard should not be a generic account page. It should guide the customer through Scan, Review, Repair, and Control.

Primary sections:

- Command Center;
- Reports;
- Report Vault;
- Repair Workroom;
- Control Center;
- Billing and Plan;
- Delivery History;
- Support and Status.

Dashboard first screen:

- current plan state;
- latest report artifact;
- next recommended command;
- report delivery status;
- open work items;
- support/status shortcut.

Agent instruction:

- The Journey Agent must show where the customer is in the plan path.
- The dashboard should always make the safest next action obvious.

## Batch 42: Presence Intelligence Report Vault

The report vault is where all customer artifacts live.

Vault entries:

- Free Scan Signal Report;
- Deep Review Presence Report;
- Build Fix Work Plan;
- Build Fix Completion Report;
- Monthly Control Snapshot;
- support/correction-linked report notes.

Vault card fields:

- report title;
- plan type;
- date;
- status;
- delivery state;
- available actions;
- next command.

Agent instruction:

- The Report Vault Agent must keep report access tied to customer entitlement.
- The vault must not expose reports to unknown or unpaid users.

## Batch 43: PDF and Email Template Standard

Cendorq needs polished plan-specific PDFs and concise emails.

PDF sections:

- cover/header;
- business and date;
- plan depth;
- executive summary;
- Presence Score;
- signal severity;
- Choice Gap;
- signal matrix;
- competitor/context pressure when supported;
- Repair Priorities;
- recommended next command;
- scope and limits.

Email sections:

- report type in subject;
- short summary;
- dashboard link;
- PDF link or attachment;
- next recommended action;
- support link;
- scope boundary.

Agent instruction:

- The PDF and email should be generated from the same approved report package.
- Email should never over-explain; it should route back to dashboard and PDF.

## Batch 44: Build Fix Repair Workroom

Build Fix needs a controlled workroom, not a vague promise.

Workroom states:

- paid;
- scope pending;
- scope approved;
- evidence ready;
- in repair;
- QA review;
- completed;
- completion report delivered;
- Control recommended.

Workroom modules:

- approved weak signal;
- before evidence;
- work scope;
- implementation notes;
- after evidence;
- validation checklist;
- completion report;
- next command.

Agent instruction:

- Repair Architect creates scope.
- Implementation Agent performs approved work.
- QA/Release Gate validates before completion report delivery.

## Batch 45: Ongoing Control Center

Ongoing Control is the recurring monitoring product.

Control modules:

- latest Control Snapshot;
- monthly signal health;
- drift alerts;
- competitor/context pressure;
- protected strengths;
- new risks;
- previous repair status;
- next monthly priorities;
- delivery schedule.

Agent instruction:

- Control Monitor checks for signal drift.
- Alert Agent raises meaningful drift only.
- Delivery Agent sends monthly snapshot artifacts.

## Final command

Batches 41-45 define the customer report surfaces. The customer should always know what was found, what they paid for, what was delivered, what is happening now, and what the safest next command is.