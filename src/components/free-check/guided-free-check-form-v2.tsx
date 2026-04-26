"use client";

import { businessTypes } from "@/lib/free-check";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type RoutingHint = "scan-only" | "blueprint-candidate" | "infrastructure-review" | "command-review";

type FormValues = {
  fullName: string;
  email: string;
  businessName: string;
  websiteUrl: string;
  country: string;
  stateRegion: string;
  city: string;
  businessType: string;
  primaryOffer: string;
  audience: string;
  biggestIssue: string;
  competitors: string;
  notes: string;
};

type ApiSuccess = {
  ok: true;
  message: string;
  intakeId: string;
  signalQuality: number;
  duplicate: boolean;
  routingHint?: RoutingHint;
  reportPath?: string;
};

type ApiFailure = {
  ok: false;
  error?: string;
  details?: string[];
};

type ApiResponse = ApiSuccess | ApiFailure;

type SubmitState =
  | { kind: "idle" }
  | { kind: "success"; message: string; quality: number; reportPath?: string; routingHint: RoutingHint }
  | { kind: "error"; message: string; details: string[] };

type StepNumber = 0 | 1 | 2 | 3;

type Step = {
  eyebrow: string;
  title: string;
  copy: string;
  fields: Array<keyof FormValues>;
};

const INITIAL_VALUES: FormValues = {
  fullName: "",
  email: "",
  businessName: "",
  websiteUrl: "",
  country: "United States",
  stateRegion: "",
  city: "",
  businessType: "",
  primaryOffer: "",
  audience: "",
  biggestIssue: "",
  competitors: "",
  notes: "",
};

const STEPS: Step[] = [
  {
    eyebrow: "Step 01",
    title: "Show us the business people actually see.",
    copy: "Start with the name, website, and person tied to this scan. The better the first details, the sharper the read.",
    fields: ["businessName", "websiteUrl", "fullName", "email"],
  },
  {
    eyebrow: "Step 02",
    title: "Place the business in the real market.",
    copy: "Location and category change how customers compare, judge, and choose. Keep it simple and accurate.",
    fields: ["country", "stateRegion", "city", "businessType"],
  },
  {
    eyebrow: "Step 03",
    title: "Explain what you sell in plain words.",
    copy: "Say what the business offers and who it helps. Clear answers here make the scan more useful.",
    fields: ["primaryOffer", "audience"],
  },
  {
    eyebrow: "Step 04",
    title: "Name what is making people hesitate.",
    copy: "Tell us what feels weak, confusing, or harder than it should be. This is where the first read gets powerful.",
    fields: ["biggestIssue", "competitors", "notes"],
  },
];

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "New Zealand", "Ireland", "Germany", "France", "Spain", "Italy", "Mexico", "Other"];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const LABELS: Record<keyof FormValues, { label: string; helper: string; placeholder: string }> = {
  fullName: { label: "Your name", helper: "Who should we connect this scan to?", placeholder: "Jane Smith" },
  email: { label: "Business email", helper: "Use the best email for follow-up.", placeholder: "jane@business.com" },
  businessName: { label: "Business name", helper: "Use the name customers know.", placeholder: "Smith Family Dental" },
  websiteUrl: { label: "Website", helper: "Use the main website customers visit.", placeholder: "yourbusiness.com" },
  country: { label: "Country", helper: "Where does the business mainly operate?", placeholder: "United States" },
  stateRegion: { label: "State / region", helper: "Use the main state, province, or region.", placeholder: "California" },
  city: { label: "City", helper: "Use the main city tied to the business.", placeholder: "Austin" },
  businessType: { label: "Business type", helper: "Choose the closest fit.", placeholder: "Select business type" },
  primaryOffer: { label: "What do you sell?", helper: "Explain it like a new customer needs to understand it fast.", placeholder: "Example: High-end family dental care for busy adults and parents." },
  audience: { label: "Who is the best customer?", helper: "Describe who you want more of and what they care about.", placeholder: "Example: Local families and working professionals who want trusted care without confusion." },
  biggestIssue: { label: "What feels wrong right now?", helper: "Be honest. This is what makes the scan useful.", placeholder: "Example: People visit the site but do not book. Competitors feel easier to choose." },
  competitors: { label: "Who do customers compare you with?", helper: "Optional, but useful.", placeholder: "List competitors, directories, or alternatives." },
  notes: { label: "Anything else we should know?", helper: "Optional. Add what keeps getting misunderstood.", placeholder: "Add what changed, what you tried, or what feels off." },
};

const SUCCESS_NEXT_STEPS = [
  "Your answers are saved into the scan system.",
  "The business can now be read through trust, clarity, comparison, and action pressure.",
  "If the scan shows a deeper issue, the next move becomes easier to choose.",
] as const;

export function GuidedFreeCheckForm({ className }: { className?: string }) {
  const [step, setStep] = useState<StepNumber>(0);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeStep = STEPS[step];
  const progress = Math.round(((step + 1) / STEPS.length) * 100);
  const qualityScore = useMemo(() => buildQualityScore(values), [values]);
  const likelyMove = useMemo(() => buildNextMove(qualityScore, values), [qualityScore, values]);

  function updateValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const key = event.target.name as keyof FormValues;
    const nextValue = event.target.value;

    setValues((current) => ({
      ...current,
      [key]: nextValue,
      ...(key === "country" ? { stateRegion: "" } : {}),
    }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (submitState.kind !== "idle") setSubmitState({ kind: "idle" });
  }

  function nextStep() {
    const nextErrors = validateFields(values, activeStep.fields);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setStep((current) => Math.min(STEPS.length - 1, current + 1) as StepNumber);
  }

  function previousStep() {
    setStep((current) => Math.max(0, current - 1) as StepNumber);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFields(values, STEPS.flatMap((item) => item.fields));
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      const firstBadStep = STEPS.findIndex((item) => item.fields.some((field) => nextErrors[field]));
      setStep((firstBadStep < 0 ? 0 : firstBadStep) as StepNumber);
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ kind: "idle" });

    try {
      const response = await fetch("/api/free-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, websiteUrl: normalizeWebsite(values.websiteUrl), source: "free-check" }),
      });
      const data = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || !data || data.ok === false) {
        const failure = data && data.ok === false ? data : null;
        setSubmitState({
          kind: "error",
          message: failure?.error || "The scan could not be submitted yet.",
          details: failure?.details || [],
        });
        return;
      }

      setSubmitState({
        kind: "success",
        message: data.message,
        quality: data.signalQuality,
        reportPath: data.reportPath,
        routingHint: data.routingHint || likelyMove.routingHint,
      });
      setValues(INITIAL_VALUES);
      setErrors({});
      setStep(0);
    } catch {
      setSubmitState({ kind: "error", message: "The scan could not connect right now. Please try again.", details: [] });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="free-check-intake" className={className}>
      <div className="grid gap-6 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
        <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-5 shadow-[0_28px_90px_rgba(8,47,73,0.22)] sm:p-7 md:p-9">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.13),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(125,211,252,0.09),transparent_32%)]" />
          <div className="relative z-10">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                  Premium free scan
                </div>
                <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{activeStep.title}</h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{activeStep.copy}</p>
              </div>
              <div className="rounded-[1.5rem] border border-cyan-300/18 bg-cyan-300/10 px-5 py-4 lg:min-w-[13rem]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100">Scan strength</div>
                <div className="mt-2 text-4xl font-semibold text-white">{qualityScore}%</div>
                <div className="mt-1 text-xs leading-5 text-slate-300">More clear detail creates a stronger first read.</div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {STEPS.map((item, index) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  onClick={() => setStep(index as StepNumber)}
                  className={[
                    "rounded-[1.25rem] border px-4 py-4 text-left transition duration-200",
                    index === step
                      ? "border-cyan-300/24 bg-cyan-300/12 text-white"
                      : index < step
                        ? "border-white/12 bg-white/[0.05] text-slate-200"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-cyan-300/20 hover:bg-white/[0.05] hover:text-white",
                  ].join(" ")}
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{item.eyebrow}</span>
                  <span className="mt-2 block text-sm font-semibold">{stepLabel(index)}</span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                <span>{stepLabel(step)}</span>
                <span>{progress}% complete</span>
              </div>
              <div className="system-status-bar mt-2 h-2"><span style={{ width: `${progress}%` }} /></div>
            </div>

            <form className="mt-7" onSubmit={submit} noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                {activeStep.fields.map((field) => (
                  <FieldControl key={field} field={field} values={values} errors={errors} onChange={updateValue} />
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3">
                  {step > 0 ? <button type="button" onClick={previousStep} className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">Back</button> : null}
                  {step < STEPS.length - 1 ? (
                    <button type="button" onClick={nextStep} className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">Continue</button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70">
                      {isSubmitting ? "Submitting scan..." : "Submit free scan"}
                    </button>
                  )}
                </div>
                <div className="text-sm leading-6 text-slate-400">Step {step + 1} of {STEPS.length}. Guided. Clear. Built to finish.</div>
              </div>

              {submitState.kind === "success" ? <SuccessState state={submitState} /> : null}
              {submitState.kind === "error" ? <ErrorState state={submitState} /> : null}
            </form>
          </div>
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-28">
          <div className="system-panel-authority rounded-[1.8rem] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">Why this works</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">One clear move at a time.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">The scan collects the right details in the right order so the first read feels serious, focused, and easy to finish.</p>
          </div>
          {[
            "Guided step by step",
            "Built for serious businesses",
            "Clear next move after submission",
          ].map((item) => <div key={item} className="system-surface rounded-[1.25rem] px-4 py-4 text-sm font-semibold leading-6 text-white">{item}</div>)}
          <div className="system-surface rounded-[1.5rem] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Likely next move</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{likelyMove.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{likelyMove.copy}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FieldControl({ field, values, errors, onChange }: { field: keyof FormValues; values: FormValues; errors: Partial<Record<keyof FormValues, string>>; onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void }) {
  const copy = LABELS[field];
  const wide = ["audience", "biggestIssue", "competitors", "notes"].includes(field);
  return (
    <div className={wide ? "md:col-span-2" : undefined}>
      <label htmlFor={field} className="mb-2 block text-sm font-semibold text-white">{copy.label}</label>
      {renderInput(field, values, onChange)}
      <p className="mt-2 text-xs leading-5 text-slate-400">{copy.helper}</p>
      {errors[field] ? <p className="mt-2 text-sm font-semibold text-rose-200">{errors[field]}</p> : null}
    </div>
  );
}

function renderInput(field: keyof FormValues, values: FormValues, onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void) {
  const commonClass = "w-full rounded-[1.1rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-slate-950";
  const copy = LABELS[field];

  if (field === "country") {
    return <select id={field} name={field} value={values[field]} onChange={onChange} className={commonClass}>{COUNTRIES.map((item) => <option key={item} value={item}>{item}</option>)}</select>;
  }
  if (field === "stateRegion" && values.country === "United States") {
    return <select id={field} name={field} value={values[field]} onChange={onChange} className={commonClass}><option value="">Select a state</option>{US_STATES.map((item) => <option key={item} value={item}>{item}</option>)}</select>;
  }
  if (field === "businessType") {
    return <select id={field} name={field} value={values[field]} onChange={onChange} className={commonClass}><option value="">Select business type</option>{businessTypes.map((item) => <option key={item} value={item}>{item}</option>)}</select>;
  }
  if (["audience", "biggestIssue", "competitors", "notes"].includes(field)) {
    return <textarea id={field} name={field} value={values[field]} onChange={onChange} placeholder={copy.placeholder} rows={field === "biggestIssue" ? 7 : 4} className={`${commonClass} resize-y leading-7`} />;
  }
  return <input id={field} name={field} value={values[field]} onChange={onChange} placeholder={copy.placeholder} type={field === "email" ? "email" : "text"} className={commonClass} autoComplete={autocompleteFor(field)} />;
}

function SuccessState({ state }: { state: Extract<SubmitState, { kind: "success" }> }) {
  const nextMove = successNextMove(state.routingHint);

  return (
    <div className="system-note-success mt-6 overflow-hidden rounded-[1.8rem] p-0">
      <div className="relative p-5 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(103,232,249,0.16),transparent_35%)]" />
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-100">
            Scan received
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">Your scan is in. The next step is clearer now.</h3>
          <p className="mt-3 text-sm leading-7 text-slate-200">{state.message}</p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {SUCCESS_NEXT_STEPS.map((item) => (
              <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/[0.045] px-4 py-4 text-sm font-semibold leading-6 text-white">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.35rem] border border-cyan-300/16 bg-cyan-300/10 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100">Recommended direction</div>
            <div className="mt-2 text-lg font-semibold text-white">{nextMove.title}</div>
            <p className="mt-2 text-sm leading-7 text-slate-200">{nextMove.copy}</p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {state.reportPath ? <Link href={state.reportPath} className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">View scan report</Link> : null}
            <Link href={nextMove.href} className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">{nextMove.cta}</Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">Compare all plans</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ state }: { state: Extract<SubmitState, { kind: "error" }> }) {
  return (
    <div className="system-note-danger mt-6 rounded-[1.8rem] p-5 sm:p-6">
      <div className="inline-flex rounded-full border border-rose-200/20 bg-rose-200/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-100">
        Scan not sent yet
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">Nothing is lost. Fix the issue and send it again.</h3>
      <p className="mt-3 text-sm leading-7 text-rose-100">{state.message}</p>
      {state.details.length ? <div className="mt-4 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-rose-100">{detail}</div>)}</div> : null}
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <RecoveryTile value="Your typed answers stay protected while you fix the issue." />
        <RecoveryTile value="Check the highlighted fields or try again if the connection failed." />
        <RecoveryTile value="The safest next move is still to complete the scan first." />
      </div>
    </div>
  );
}

function RecoveryTile({ value }: { value: string }) {
  return <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-semibold leading-6 text-white">{value}</div>;
}

function successNextMove(routingHint: RoutingHint) {
  if (routingHint === "command-review") {
    return {
      title: "Ongoing Control may be the stronger conversation.",
      copy: "Use this when the business already has enough pressure to need continued direction, updates, and control.",
      href: "/plans/ongoing-control",
      cta: "See Ongoing Control",
    };
  }

  if (routingHint === "infrastructure-review") {
    return {
      title: "Build Fix may be the strongest next path.",
      copy: "Use this when the business likely needs stronger pages, clearer wording, better trust, or a cleaner action path.",
      href: "/plans/build-fix",
      cta: "See Build Fix",
    };
  }

  if (routingHint === "blueprint-candidate") {
    return {
      title: "Deep Review may be the right deeper step.",
      copy: "Use this when the scan shows the business needs a sharper explanation of what is weakening trust, clarity, and choice.",
      href: "/plans/deep-review",
      cta: "See Deep Review",
    };
  }

  return {
    title: "Start with the first read before spending deeper.",
    copy: "The free scan is built to keep the next move safer when the business still needs a clearer first signal.",
    href: "/plans",
    cta: "Compare plans",
  };
}

function validateFields(values: FormValues, fields: Array<keyof FormValues>) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  for (const field of fields) {
    if (field === "fullName" && values.fullName.trim().length < 2) errors.fullName = "Enter your name.";
    if (field === "email" && !looksLikeEmail(values.email)) errors.email = "Enter a valid business email.";
    if (field === "businessName" && values.businessName.trim().length < 2) errors.businessName = "Enter the business name.";
    if (field === "websiteUrl" && !looksLikeWebsite(values.websiteUrl)) errors.websiteUrl = "Enter the main website.";
    if (field === "country" && values.country.trim().length < 2) errors.country = "Choose a country.";
    if (field === "stateRegion" && values.stateRegion.trim().length < 2) errors.stateRegion = "Enter a state or region.";
    if (field === "city" && values.city.trim().length < 2) errors.city = "Enter the main city.";
    if (field === "businessType" && values.businessType.trim().length < 3) errors.businessType = "Choose the business type.";
    if (field === "primaryOffer" && values.primaryOffer.trim().length < 10) errors.primaryOffer = "Explain what the business sells.";
    if (field === "audience" && values.audience.trim().length < 30) errors.audience = "Describe the best customer in more detail.";
    if (field === "biggestIssue" && values.biggestIssue.trim().length < 45) errors.biggestIssue = "Explain what feels wrong in more detail.";
  }
  return errors;
}

function buildQualityScore(values: FormValues) {
  const checks = [
    values.fullName.length >= 2,
    looksLikeEmail(values.email),
    values.businessName.length >= 2,
    looksLikeWebsite(values.websiteUrl),
    values.country.length >= 2,
    values.stateRegion.length >= 2,
    values.city.length >= 2,
    values.businessType.length >= 3,
    values.primaryOffer.length >= 10,
    values.audience.length >= 30,
    values.biggestIssue.length >= 45,
    values.competitors.length >= 8,
    values.notes.length >= 10,
  ];
  return Math.min(100, Math.round((checks.filter(Boolean).length / checks.length) * 100));
}

function buildNextMove(score: number, values: FormValues) {
  const text = `${values.primaryOffer} ${values.audience} ${values.biggestIssue} ${values.notes}`.toLowerCase();
  if (score >= 86 && /(ongoing|monthly|monitor|maintain|manage|support)/.test(text)) {
    return { routingHint: "command-review" as RoutingHint, title: "Possible Ongoing Control fit", copy: "The business may need continued direction if the problem keeps changing or requires recurring control." };
  }
  if (score >= 78 && /(website|booking|calls|leads|trust|confusing|unclear|conversion|choose)/.test(text)) {
    return { routingHint: "infrastructure-review" as RoutingHint, title: "Possible Build Fix fit", copy: "The business may need stronger pages, clearer messaging, or a better path to action." };
  }
  if (score >= 60) {
    return { routingHint: "blueprint-candidate" as RoutingHint, title: "Likely Deep Review fit", copy: "There may be enough detail here to decide what is holding the business back." };
  }
  return { routingHint: "scan-only" as RoutingHint, title: "Keep building the first read", copy: "A little more clear detail will make the scan more useful." };
}

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function looksLikeWebsite(value: string) {
  try {
    const parsed = new URL(normalizeWebsite(value));
    return parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function autocompleteFor(field: keyof FormValues) {
  if (field === "fullName") return "name";
  if (field === "email") return "email";
  if (field === "businessName") return "organization";
  if (field === "websiteUrl") return "url";
  if (field === "city") return "address-level2";
  if (field === "stateRegion") return "address-level1";
  return undefined;
}

function stepLabel(step: number) {
  if (step === 0) return "Business basics";
  if (step === 1) return "Market context";
  if (step === 2) return "Offer and buyer";
  return "Problem pressure";
}
