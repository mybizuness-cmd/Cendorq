export const CENDORQ_EXPERIENCE_SYSTEM = {
  pageShell: "min-h-screen overflow-hidden bg-slate-50 text-slate-950",
  atmosphericShell: "relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-slate-50",
  maxWidth: "mx-auto max-w-7xl",
  heroGrid: "relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
  eyebrow: "inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur",
  headline: "text-[clamp(3rem,7.3vw,6.95rem)] font-semibold leading-[0.9] tracking-[-0.086em] text-slate-950",
  sectionHeadline: "text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl",
  body: "text-base leading-7 text-slate-600 sm:text-lg sm:leading-8",
  primaryButton: "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
  secondaryButton: "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white/70 px-8 py-4 text-base font-semibold text-slate-700 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
  glassPanel: "rounded-[3rem] border border-white/80 bg-white/60 p-3 shadow-2xl backdrop-blur-2xl",
  whitePanel: "rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-8",
  darkPanel: "rounded-[3rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl sm:p-8 lg:p-12",
  card: "rounded-[1.85rem] border border-slate-200 bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
} as const;

export const CENDORQ_EXPERIENCE_GUARDRAILS = [
  "World-class visual experience without copying another brand's layout, imagery, animation, or identity.",
  "Uncluttered pages with one clear customer action at a time.",
  "Cendorq-specific signal language: clarity, trust, proof, choice, readiness, and control.",
  "Public pages stay simple while private dashboards feel like the same premium product system.",
] as const;

export const CENDORQ_SIGNAL_WORDS = ["Clarity", "Trust", "Proof", "Choice"] as const;
