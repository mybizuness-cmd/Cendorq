import type { PlanPageData } from "@/components/plans/conversion-plan-page";

export const FREE_SCAN_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/free-check",
  label: "Free Scan",
  eyebrow: "Scan",
  title: "Find the first weak signal",
  gradient: "before deeper spend.",
  intro:
    "Free Scan is the entry point for owners who need a first authority-level read on whether public clarity, proof, trust, action, or AI-readiness may be weakening the business.",
  ctaHref: "/free-check",
  ctaLabel: "Start Free Scan",
  secondaryHref: "/plans/deep-review",
  secondaryLabel: "See AI Readiness Review",
  painTitle: "The first mistake is spending before the weak signal is known.",
  painCopy:
    "More ads, more content, more SEO, or a redesign can feel like progress while the real public signal stays broken. Free Scan gives the first disciplined read without pretending to be a full review.",
  stats: [
    { label: "Best for", value: "Owners who need the first real signal before deeper work." },
    { label: "Main result", value: "A first readiness signal and a safer next move." },
    { label: "Risk reduced", value: "Spending too early on the wrong repair." },
    { label: "Commitment", value: "Free guided first step." },
  ],
  features: [
    {
      title: "Read the public layer",
      copy: "Check what AI engines and customers can see first: clear facts, proof, trust, action paths, and the reason to choose.",
    },
    {
      title: "Expose the first gap",
      copy: "See whether the first visible weakness is clarity, proof, trust, action, or public signal consistency.",
    },
    {
      title: "Choose the right depth",
      copy: "Move to review, repair, or control only when the next step has a reason behind it.",
    },
  ],
  fit: {
    good: [
      "The business is real, but the public signal feels unclear or under-trusted.",
      "People visit, compare, ask questions, or disappear without choosing.",
      "You want the safest first step before deeper spend.",
    ],
    bad: [
      "You need a complete root-cause review today.",
      "You already know exactly what should be repaired next.",
      "You want guaranteed rankings, leads, revenue, or AI placement.",
    ],
  },
  finalTitle: "Start with Scan when the first weak signal is still unclear.",
  finalCopy:
    "It is the cleanest first move because it helps reveal what may be keeping AI engines and customers from understanding the business clearly.",
};

export const DEEP_REVIEW_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/deep-review",
  label: "AI Readiness Review",
  eyebrow: "Review",
  title: "Prove what is weakening readiness",
  gradient: "before the wrong move gets expensive.",
  intro:
    "AI Readiness Review is the evidence layer: a disciplined review of the signals that help AI engines and customers understand, trust, compare, and choose the business.",
  ctaHref: "/checkout/start?plan=deep-review",
  ctaLabel: "Start AI Readiness Review",
  secondaryHref: "/free-check",
  secondaryLabel: "Start Free Scan",
  painTitle: "Bigger changes without evidence can turn uncertainty into cost.",
  painCopy:
    "A redesign, more content, more ads, or random optimization can look serious while still missing the real reason the business is not understood, trusted, or chosen. Review protects the next decision by making the cause visible.",
  stats: [
    { label: "Best for", value: "Businesses that need evidence before bigger action." },
    { label: "Main result", value: "Cause-level priorities and a stronger repair path." },
    { label: "Risk reduced", value: "Repairing the wrong signal faster." },
    { label: "Comes after", value: "Free Scan or a strong internal first signal." },
  ],
  features: [
    {
      title: "Review the readiness layer",
      copy: "Connect public facts, website clarity, trust proof, reviews, action paths, and comparison friction into one evidence-backed view.",
    },
    {
      title: "Protect the budget",
      copy: "Avoid spending on work that looks impressive but does not solve why customers or AI engines hesitate.",
    },
    {
      title: "Prioritize the repair",
      copy: "Leave with a cleaner decision on whether the next move should be Signal Repair, Readiness Control, or no deeper work yet.",
    },
  ],
  fit: {
    good: [
      "You know something is wrong, but cannot explain the cause clearly.",
      "You are considering bigger changes and want evidence before spending.",
      "The business feels misunderstood, under-trusted, or too easy to compare away.",
    ],
    bad: [
      "You only need a quick first read and should start with Free Scan.",
      "You already know exactly what needs implementation next.",
      "You want reassurance instead of evidence.",
    ],
  },
  finalTitle: "Use Review when evidence is the missing piece before bigger work.",
  finalCopy:
    "This is the right layer when the business needs the real reason before it commits to repair or recurring control.",
};

export const BUILD_FIX_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/build-fix",
  label: "Signal Repair",
  eyebrow: "Repair",
  title: "Repair the signal",
  gradient: "customers judge first.",
  intro:
    "Signal Repair is scoped implementation for the page, message, proof, or action path that makes the business harder to understand, trust, or choose.",
  ctaHref: "/checkout/start?plan=build-fix",
  ctaLabel: "Start Signal Repair",
  secondaryHref: "/plans/deep-review",
  secondaryLabel: "See AI Readiness Review",
  painTitle: "The right repair matters more than more activity.",
  painCopy:
    "A business can look busy improving things and still leave the decisive weak signal untouched. Signal Repair focuses effort where customer choice and AI-readiness actually break.",
  stats: [
    { label: "Best for", value: "Businesses ready to move from evidence into implementation." },
    { label: "Main result", value: "A stronger public path with clearer customer movement." },
    { label: "Risk reduced", value: "Cosmetic changes that do not improve readiness." },
    { label: "Comes after", value: "AI Readiness Review or a clear internal first signal." },
  ],
  features: [
    {
      title: "Strengthen trust proof",
      copy: "Improve the parts that help people and AI systems read the business as credible, current, real, and safe to choose.",
    },
    {
      title: "Sharpen the message",
      copy: "Make the offer easier to understand and harder to confuse with every other option in the market.",
    },
    {
      title: "Clean the action path",
      copy: "Reduce friction so serious customers know what to do next and feel more confident doing it.",
    },
  ],
  fit: {
    good: [
      "The business knows which signal needs work and is ready to improve it.",
      "The website, message, proof, or page flow is making the business harder to choose.",
      "You want focused implementation, not more vague advice.",
    ],
    bad: [
      "The real problem is still unclear and needs Review first.",
      "You want random activity instead of focused priorities.",
      "You expect one repair pass to replace future improvement forever.",
    ],
  },
  finalTitle: "Use Repair when the weak signal is clear enough to improve.",
  finalCopy:
    "This is the right layer when the next value comes from strengthening the page, message, trust, proof, and action path customers actually use.",
};

export const ONGOING_CONTROL_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/ongoing-control",
  label: "Readiness Control",
  eyebrow: "Control",
  title: "Keep readiness under command",
  gradient: "as the market moves.",
  intro:
    "Readiness Control is the ongoing layer for businesses that need continued monitoring, direction, forecast refresh, and adjustment as AI engines, search surfaces, competitors, and customer expectations move.",
  ctaHref: "/checkout/start?plan=ongoing-control",
  ctaLabel: "Start Readiness Control",
  secondaryHref: "/plans",
  secondaryLabel: "Compare the path",
  painTitle: "A strong public signal can still weaken when nobody is watching it.",
  painCopy:
    "Markets change. Competitors move. Search surfaces shift. AI answers evolve. Customer expectations move. Readiness Control keeps the business from treating trust and clarity like a one-time project.",
  stats: [
    { label: "Best for", value: "Businesses with a strong enough base to maintain and improve." },
    { label: "Main result", value: "Continued direction, monitoring, and controlled adjustment." },
    { label: "Risk reduced", value: "Letting readiness decay after strong work." },
    { label: "Comes after", value: "Signal Repair or an already-strong internal base." },
  ],
  features: [
    {
      title: "Watch for drift",
      copy: "Keep attention on the public signals that can decay: clarity, proof, reviews, action paths, competitors, and AI-readiness posture.",
    },
    {
      title: "Adapt faster",
      copy: "Respond to changes in competitors, search behavior, AI answers, customer expectations, and business priorities.",
    },
    {
      title: "Protect the base",
      copy: "Keep the stronger system from getting stale or losing the clarity that made it work.",
    },
  ],
  fit: {
    good: [
      "The business already has a strong enough base to maintain and improve.",
      "You want continued direction instead of occasional emergency repairs.",
      "The business needs a steady system, not a one-time push.",
    ],
    bad: [
      "The business still needs a first scan or evidence-backed review.",
      "The foundation is too unclear for ongoing control to be useful yet.",
      "You want monthly work to replace the earlier clarity and repair stages.",
    ],
  },
  finalTitle: "Use Control when readiness needs to keep compounding.",
  finalCopy:
    "This is the right layer when the base is strong enough and the next challenge is continued attention, adjustment, and control over time.",
};

export const PLANS = [FREE_SCAN_PLAN, DEEP_REVIEW_PLAN, BUILD_FIX_PLAN, ONGOING_CONTROL_PLAN] as const;
