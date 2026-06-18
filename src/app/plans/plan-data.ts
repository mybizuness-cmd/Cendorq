import type { PlanPageData } from "@/components/plans/conversion-plan-page";

export const FREE_SCAN_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/free-check",
  label: "Free Scan",
  eyebrow: "Scan",
  title: "Start with the first AI Search Presence signal",
  gradient: "before paid depth.",
  intro:
    "Free Scan gives the business a clean first read on public presence: where it may be missing, unclear, under-trusted, harder to compare, or harder for customers and AI/search systems to choose.",
  ctaHref: "/free-check",
  ctaLabel: "Start Free Scan",
  secondaryHref: "/faq",
  secondaryLabel: "Read FAQ",
  painTitle: "The safest first move is to see what is weak before spending deeper.",
  painCopy:
    "More ads, more content, or a redesign can waste money when the real weak signal is still unknown. Free Scan gives the business a cleaner first Presence Report signal before paid work.",
  stats: [
    { label: "Best for", value: "Owners who want the safest first step." },
    { label: "Main result", value: "A clearer AI Search Presence signal before paid work." },
    { label: "Risk reduced", value: "Spending too early on the wrong repair." },
    { label: "Commitment", value: "Free guided first step." },
  ],
  features: [
    { title: "Find the signal", copy: "See where the business may be missing, unclear, under-trusted, harder to compare, or harder to choose." },
    { title: "Start safely", copy: "Use the first signal before paying for deeper Review or Repair work." },
    { title: "Choose the next command", copy: "If deeper help makes sense, the scan makes the next command easier to understand." },
  ],
  fit: {
    good: [
      "You know the business should be found or chosen faster, but you do not know what is weak first.",
      "Customers visit, compare, ask questions, or leave without acting.",
      "You want evidence before spending on bigger work.",
    ],
    bad: [
      "You already know the exact weak point and are ready for implementation.",
      "You need a complete evidence-backed Review instead of a first signal.",
      "You want guaranteed rankings, leads, revenue, or AI placement.",
    ],
  },
  finalTitle: "Start with Scan when the first weak signal is still unclear.",
  finalCopy:
    "It is the cleanest first move because it helps reveal what may be keeping customers and AI/search systems from finding, understanding, trusting, comparing, or choosing the business clearly.",
};

export const DEEP_REVIEW_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/deep-review",
  label: "Deep Review",
  eyebrow: "Review",
  title: "Prove what is weakening AI Search Presence",
  gradient: "before bigger work begins.",
  intro:
    "Deep Review turns the first signal into evidence: why customers and AI/search systems may not find, understand, trust, compare, or choose the business yet.",
  ctaHref: "/checkout/start?plan=deep-review",
  ctaLabel: "Start Deep Review",
  secondaryHref: "/free-check",
  secondaryLabel: "Start Free Scan",
  painTitle: "Bigger changes without proof can make the wrong problem more expensive.",
  painCopy:
    "A redesign, more ads, or random optimization can look productive while still missing the reason customers and AI answers hesitate. Deep Review keeps the business in Review until the likely cause is clear enough to choose Repair, Control, or no paid next step yet.",
  stats: [
    { label: "Best for", value: "Businesses that need cause proof before bigger action." },
    { label: "Main result", value: "Evidence, Decision Gap, priorities, and a clearer next command." },
    { label: "Risk reduced", value: "Repairing the wrong problem faster." },
    { label: "Comes after", value: "Free Scan or a strong internal first signal." },
  ],
  features: [
    { title: "Prove the Decision Gap", copy: "Separate visibility weakness from decision weakness so the business can see whether the issue is findability, clarity, trust proof, comparison friction, or action path confusion." },
    { title: "Protect the budget", copy: "Review before Repair when the cause still needs proof, so bigger work does not chase the wrong signal." },
    { title: "Create the Repair Queue", copy: "Leave with a cleaner decision on whether the next step should be Build Fix, Ongoing Control, or a smaller no-pressure action first." },
  ],
  fit: {
    good: [
      "You know something is off, but cannot explain the cause clearly.",
      "You are considering bigger changes and want evidence before spending.",
      "The business feels unseen, misunderstood, under-trusted, or too easy to compare away.",
    ],
    bad: [
      "You only need a quick first signal and should start with Free Scan.",
      "You already know exactly what needs to be repaired next.",
      "You want reassurance instead of an honest evidence-backed Review.",
    ],
  },
  finalTitle: "Use Deep Review when proof is the missing piece before bigger work.",
  finalCopy:
    "This is the right depth when the business needs the real reason before it commits to Build Fix, Ongoing Control, or another customer-facing repair path.",
};

export const BUILD_FIX_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/build-fix",
  label: "Build Fix",
  eyebrow: "Repair",
  title: "Repair the signal",
  gradient: "customers notice first.",
  intro:
    "Build Fix turns one approved weak point into scoped Repair: a page, message, proof point, public presence gap, Decision Gap, or action path that needs to be clearer before customers act.",
  ctaHref: "/checkout/start?plan=build-fix",
  ctaLabel: "Start Build Fix",
  secondaryHref: "/plans",
  secondaryLabel: "View Plans",
  painTitle: "Focused Repair matters more than more activity.",
  painCopy:
    "More content, more design changes, or more tools can still leave the decision gap untouched. Build Fix keeps the work focused on the specific customer-facing signal that Review or clear internal evidence says should be repaired next.",
  stats: [
    { label: "Best for", value: "Businesses ready to move from evidence into scoped action." },
    { label: "Main result", value: "A stronger customer-facing and AI-readable path." },
    { label: "Risk reduced", value: "Broad rebuilds, cosmetic work, or fixes that do not improve decisions." },
    { label: "Comes after", value: "Deep Review, Free Scan, or a clear approved repair priority." },
  ],
  features: [
    { title: "Repair the approved weak point", copy: "Improve the page, message, proof, Decision Gap, or action path that is most likely to affect customer understanding, trust, comparison, or action." },
    { title: "Strengthen proof and clarity", copy: "Make the offer easier to understand, easier to believe, and harder to confuse with every similar option in the market." },
    { title: "Keep the scope controlled", copy: "Focus on the selected repair path without implying unlimited implementation, full rebuilds, guaranteed rankings, leads, revenue, or AI placement." },
  ],
  fit: {
    good: [
      "The weak point is clear enough to improve without another full Review first.",
      "The website, message, proof, or page flow is making the business harder to understand, trust, compare, or choose.",
      "You want focused Repair with a clear customer decision purpose, not more vague activity.",
    ],
    bad: [
      "The real problem is still unclear and needs Review before Repair.",
      "You want a full rebuild, unlimited implementation, or open-ended revision cycles.",
      "You expect one Repair pass to guarantee rankings, leads, revenue, AI placement, or permanent improvement forever.",
    ],
  },
  finalTitle: "Use Build Fix when the next weak point is clear enough to repair.",
  finalCopy:
    "This is the right depth when evidence has already pointed to the repair path and the next value comes from strengthening the page, message, trust, proof, presence, or action step customers actually use.",
};

export const ONGOING_CONTROL_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/ongoing-control",
  label: "Ongoing Control",
  eyebrow: "Control",
  title: "Keep AI Search Presence from drifting",
  gradient: "as search and customers change.",
  intro:
    "Ongoing Control keeps visibility, clarity, trusted proof, public signals, AI/search understanding, Decision Gap risk, and customer action paths under ongoing review.",
  ctaHref: "/checkout/start?plan=ongoing-control",
  ctaLabel: "Start Ongoing Control",
  secondaryHref: "/plans",
  secondaryLabel: "View Plans",
  painTitle: "A strong business signal can weaken when nobody is watching it.",
  painCopy:
    "Markets change. Competitors move. Search surfaces shift. AI answers evolve. Customer expectations move. Ongoing Control keeps the business from treating trust, visibility, and public presence like a one-time project.",
  stats: [
    { label: "Best for", value: "Businesses with a strong enough base to maintain and improve." },
    { label: "Main result", value: "Continued direction, monitoring, and controlled adjustment." },
    { label: "Risk reduced", value: "Letting the customer-facing signal decay after strong work." },
    { label: "Comes after", value: "Build Fix or an already-strong internal base." },
  ],
  features: [
    { title: "Keep improving", copy: "Give the business steady attention instead of waiting until the signal feels weak again." },
    { title: "Adapt faster", copy: "Respond to changes in competitors, search behavior, AI answers, customer expectations, and business priorities." },
    { title: "Protect the base", copy: "Keep the stronger system from drifting, getting stale, or losing the clarity that made it work." },
  ],
  fit: {
    good: [
      "The business already has a strong enough base to maintain and improve.",
      "You want continued direction instead of occasional emergency fixes.",
      "The business needs a steady system, not a one-time push.",
    ],
    bad: [
      "The business still needs a first Scan or evidence-backed Review.",
      "The foundation is too unclear for ongoing Control to be useful yet.",
      "You want monthly work to replace the earlier clarity and Repair stages.",
    ],
  },
  finalTitle: "Use Ongoing Control when the business is ready to keep compounding.",
  finalCopy:
    "This is the right depth when the base is strong enough and the next challenge is continued attention, adjustment, public presence, and control over time.",
};

export const PLANS = [FREE_SCAN_PLAN, DEEP_REVIEW_PLAN, BUILD_FIX_PLAN, ONGOING_CONTROL_PLAN] as const;
