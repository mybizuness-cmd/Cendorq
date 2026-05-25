export const CENDORQ_EXPERIENCE_SYSTEM = {
  pageShell:
    "min-h-screen overflow-hidden bg-[radial-gradient(circle_at_0%_0%,rgba(251,207,232,0.30),transparent_30%),radial-gradient(circle_at_100%_10%,rgba(125,211,252,0.38),transparent_34%),linear-gradient(180deg,#fffaff_0%,#e8fbff_24%,#f7fcff_62%,#ffffff_100%)] text-slate-950",
  atmosphericShell:
    "relative overflow-hidden bg-[radial-gradient(circle_at_0%_0%,rgba(251,207,232,0.30),transparent_30%),radial-gradient(circle_at_100%_10%,rgba(125,211,252,0.38),transparent_34%),linear-gradient(180deg,#fffaff_0%,#e8fbff_24%,#f7fcff_62%,#ffffff_100%)]",
  heroAtmosphere:
    "absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(251,207,232,0.30),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(125,211,252,0.38),transparent_36%),linear-gradient(180deg,#fffaff,#eafcff_54%,#ffffff)]",
  softSection:
    "rounded-[2.2rem] border border-white/85 bg-white/84 p-5 shadow-[0_22px_70px_rgba(14,165,233,0.08)] backdrop-blur sm:rounded-[2.7rem] sm:p-7",
  signalCard:
    "rounded-[1.35rem] border border-cyan-100 bg-white/86 p-4 shadow-[0_12px_36px_rgba(14,165,233,0.055)] backdrop-blur",
  softChecklistCard:
    "rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-5 text-slate-700",
  maxWidth: "mx-auto max-w-7xl",
  heroGrid: "relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
  eyebrow:
    "inline-flex rounded-full border border-cyan-100 bg-white/82 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-700 shadow-sm backdrop-blur",
  heroHeadline:
    "text-[clamp(3.15rem,15vw,6.45rem)] font-semibold leading-[0.86] tracking-[-0.088em] text-slate-950 sm:text-[clamp(3.6rem,8vw,6.45rem)] lg:text-[clamp(3.5rem,6.2vw,6.45rem)]",
  pageHeadline:
    "text-[clamp(2.85rem,13vw,5.9rem)] font-semibold leading-[0.9] tracking-[-0.082em] text-slate-950 sm:text-[clamp(3.2rem,7vw,5.9rem)] lg:text-[clamp(3rem,5.8vw,5.9rem)]",
  sectionHeadline:
    "text-[clamp(2.25rem,9vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.072em] text-slate-950 sm:text-[clamp(2.65rem,5.8vw,4.75rem)] lg:text-[clamp(2.45rem,4.4vw,4.75rem)]",
  cardHeadline: "text-3xl font-semibold leading-tight tracking-[-0.055em] text-slate-950",
  body: "text-base font-semibold leading-8 text-slate-600 sm:text-lg sm:leading-8",
  supportText: "text-sm font-medium leading-7 text-slate-600",
  mutedText: "text-sm font-medium leading-7 text-slate-500",
  mobileActionRow: "grid gap-3 sm:flex sm:flex-row",
  mobileTouchButton: "min-h-14 w-full sm:w-auto",
  primaryButton:
    "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-white px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 active:translate-y-0 sm:w-auto",
  secondaryButton:
    "inline-flex min-h-14 items-center justify-center rounded-full border border-white/90 bg-white/72 px-8 py-4 text-base font-bold text-slate-800 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 active:translate-y-0 sm:w-auto",
  textLink:
    "text-sm font-black text-cyan-700 underline decoration-cyan-200 underline-offset-4 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2",
  glassPanel:
    "rounded-[2.2rem] border border-white/80 bg-white/74 p-2.5 shadow-[0_28px_90px_rgba(14,165,233,0.12)] backdrop-blur-2xl sm:rounded-[3rem] sm:p-3",
  whitePanel:
    "rounded-[2rem] border border-white/85 bg-white/86 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.065)] backdrop-blur sm:rounded-[2.5rem] sm:p-8",
  darkPanel:
    "rounded-[2.25rem] border border-cyan-100 bg-white/86 p-5 text-slate-950 shadow-[0_22px_70px_rgba(14,165,233,0.08)] backdrop-blur sm:rounded-[3rem] sm:p-8 lg:p-12",
  card:
    "rounded-[1.6rem] border border-white/85 bg-white/86 p-5 shadow-[0_16px_48px_rgba(15,23,42,0.055)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_22px_70px_rgba(14,165,233,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 active:translate-y-0 sm:rounded-[1.85rem]",
} as const;

export const CENDORQ_TYPOGRAPHY_STANDARD = {
  hero: "Use only on the main homepage-level emotional idea. Large and cinematic, but capped for laptop and mobile readability.",
  page: "Use on major subpage heroes such as Plans, Free Scan, and Login. Use a strong headline with one cyan emphasis line.",
  section: "Use for chapter headings and decision sections. Big enough to feel premium without overwhelming cards.",
  body: "Use medium-to-semibold weight and readable contrast. Customer copy must explain the next decision, not internal doctrine.",
  support: "Use for card and form support copy. Keep at least text-sm with font-medium and leading-7.",
} as const;

export const CENDORQ_MOBILE_EXPERIENCE_STANDARD = {
  priority: "Mobile is a first-class experience because most traffic is expected to come from phones.",
  hero: "Mobile first fold must show the core message, primary action, and enough visual depth without requiring awkward sideways scanning.",
  actions: "Primary actions must be thumb-friendly, full-width when stacked, and at least min-h-14.",
  cards: "Cards must stack cleanly, avoid long clutter walls, and keep text readable at mobile widths.",
  forms: "Forms must feel guided, calm, and easy to complete with clear touch targets.",
  motion: "Use visual depth carefully; do not add heavy effects that slow mobile interaction.",
} as const;

export const CENDORQ_EXPERIENCE_GUARDRAILS = [
  "World-class visual experience without copying another brand's layout, imagery, animation, or identity.",
  "Uncluttered pages with one clear customer action at a time.",
  "Cendorq-specific signal language: clarity, trust, proof, choice, readiness, and control.",
  "Public pages stay simple while private dashboards feel like the same premium product system.",
  "Typography is cinematic but capped so laptop and mobile screens do not crop awkwardly.",
  "Body copy stays readable with medium-to-semibold weight and enough contrast.",
  "Mobile is a first-class premium experience with thumb-friendly actions and clean stacking.",
  "Public CTAs must stay readable, soft, and cyan/white aligned.",
  "Public pages should speak to customers, not internal operators.",
] as const;

export const CENDORQ_SIGNAL_WORDS = ["Clarity", "Trust", "Proof", "Choice"] as const;
