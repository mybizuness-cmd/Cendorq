"use client";

import { businessTypes } from "@/lib/free-check";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

import { requestFreeScanVerifyToViewHandoff, type FreeScanVerifyToViewClientHandoff } from "./free-scan-verify-to-view-client-handoff";

type RoutingHint = "scan-only" | "blueprint-candidate" | "infrastructure-review" | "command-review";
type FormValues = { fullName: string; email: string; businessName: string; websiteUrl: string; country: string; stateRegion: string; city: string; businessType: string; primaryOffer: string; audience: string; biggestIssue: string; competitors: string; notes: string };
type ApiResponse = { ok: true; message: string; intakeId: string; signalQuality: number; duplicate: boolean; routingHint?: RoutingHint } | { ok: false; error?: string; details?: string[] };
type SubmitState = { kind: "idle" } | { kind: "success"; message: string; quality: number; routingHint: RoutingHint; handoff: FreeScanVerifyToViewClientHandoff } | { kind: "error"; message: string; details: string[] };
type StepNumber = 0 | 1 | 2 | 3;
type Step = { eyebrow: string; title: string; copy: string; fields: Array<keyof FormValues> };

const INITIAL_VALUES: FormValues = { fullName: "", email: "", businessName: "", websiteUrl: "", country: "", stateRegion: "", city: "", businessType: "", primaryOffer: "", audience: "", biggestIssue: "", competitors: "", notes: "" };

const STEPS: readonly Step[] = [
  { eyebrow: "Business seen by customers", title: "Tell us what customers see first.", copy: "Use the business name, website, and contact tied to this scan. This gives Cendorq the first visibility and trust baseline.", fields: ["businessName", "websiteUrl", "fullName", "email"] },
  { eyebrow: "Market context", title: "Place the business where buyers compare it.", copy: "Location and category affect how customers, maps, reviews, directories, and AI/search systems understand the business.", fields: ["country", "stateRegion", "city", "businessType"] },
  { eyebrow: "Offer clarity", title: "Say what you sell and who should choose it.", copy: "Plain language helps Cendorq see whether the business is easy to understand, trust, compare, and act on.", fields: ["primaryOffer", "audience"] },
  { eyebrow: "Decision break", title: "Name what is making people hesitate.", copy: "Tell us what feels weak, confusing, or harder than it should be. This is where the first read becomes useful.", fields: ["biggestIssue", "competitors", "notes"] },
];

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "New Zealand", "Ireland", "Germany", "France", "Spain", "Italy", "Mexico", "Other"] as const;
const US_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"] as const;

const LABELS: Record<keyof FormValues, { label: string; helper: string; placeholder: string }> = {
  businessName: { label: "Business name", helper: "Use the name customers know.", placeholder: "Smith Family Dental" },
  websiteUrl: { label: "Website", helper: "Use the main website customers visit.", placeholder: "yourbusiness.com" },
  fullName: { label: "Your name", helper: "Who should we connect this scan to?", placeholder: "Jane Smith" },
  email: { label: "Business email", helper: "Your protected result opens after verification.", placeholder: "jane@business.com" },
  country: { label: "Country", helper: "Where does the business mainly operate?", placeholder: "Select country" },
  stateRegion: { label: "State / region", helper: "Use the main state, province, or region.", placeholder: "California" },
  city: { label: "City", helper: "Use the main city tied to the business.", placeholder: "Austin" },
  businessType: { label: "Business type", helper: "Choose the closest fit.", placeholder: "Select business type" },
  primaryOffer: { label: "What do you sell?", helper: "Explain it like a new customer needs to understand it fast.", placeholder: "High-end family dental care for busy adults and parents." },
  audience: { label: "Who is the best customer?", helper: "Describe who you want more of and what they care about.", placeholder: "Local families and working professionals who want trusted care without confusion." },
  biggestIssue: { label: "What feels wrong right now?", helper: "Be honest. This is what makes the scan useful.", placeholder: "People visit the site but do not book. Competitors feel easier to choose." },
  competitors: { label: "Who do customers compare you with?", helper: "Optional, but useful.", placeholder: "List competitors, directories, or alternatives." },
  notes: { label: "Anything else we should know?", helper: "Optional. Add what changed, what you tried, or what keeps getting misunderstood.", placeholder: "Add extra context here." },
};

const SUCCESS_NEXT_STEPS = ["Your answers are saved into the scan system.", "Your result stays protected until your email is confirmed.", "Your dashboard opens the Free Scan result and next step."] as const;
const RECOVERY_TILES = ["Your typed answers stay protected while you fix the issue.", "Check highlighted fields or retry if the connection failed.", "The safest next move is still to complete the Free Scan first."] as const;

export function GuidedFreeCheckFormV3({ className }: { className?: string }) {
  const [step, setStep] = useState<StepNumber>(0);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeStep = STEPS[step];
  const hasStarted = useMemo(() => Object.values(values).some((value) => value.trim().length > 0), [values]);
  const progress = hasStarted ? Math.round(((step + 1) / STEPS.length) * 100) : 0;
  const qualityScore = useMemo(() => buildQualityScore(values), [values]);
  const likelyMove = useMemo(() => buildNextMove(qualityScore, values), [qualityScore, values]);

  function updateValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const key = event.target.name as keyof FormValues;
    setValues((current) => ({ ...current, [key]: event.target.value, ...(key === "country" ? { stateRegion: "" } : {}) }));
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
      const submittedEmail = values.email;
      const response = await fetch("/api/free-check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, websiteUrl: normalizeWebsite(values.websiteUrl), source: "free-check" }) });
      const data = (await response.json().catch(() => null)) as ApiResponse | null;
      if (!response.ok || !data || data.ok === false) {
        const failure = data && data.ok === false ? data : null;
        setSubmitState({ kind: "error", message: failure?.error || "The scan could not be submitted yet.", details: failure?.details || [] });
        return;
      }

      const handoff = await requestFreeScanVerifyToViewHandoff({ signupEmail: submittedEmail, intakeId: data.intakeId, requestedDestination: "/dashboard/reports/free-scan", verificationTokenIssued: true, safeReleaseReady: false });
      setSubmitState({ kind: "success", message: data.message, quality: data.signalQuality, routingHint: data.routingHint || likelyMove.routingHint, handoff });
      setValues(INITIAL_VALUES);
      setErrors({});
      setStep(0);
    } catch {
      setSubmitState({ kind: "error", message: "The scan was saved, but Cendorq could not prepare the confirmation handoff yet. Check your inbox for Cendorq Support <support@cendorq.com> or try again.", details: [] });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="free-check-intake" className={className}>
      <div className="grid gap-4 lg:grid-cols-[1fr_18rem] lg:items-start">
        <div className="system-panel-authority relative overflow-hidden rounded-[1.55rem] p-4 shadow-[0_24px_80px_rgba(8,47,73,0.2)] sm:p-6 md:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_34%)]" />
          <div className="relative z-10">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100">{activeStep.eyebrow}</div>
                <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{activeStep.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{activeStep.copy}</p>
              </div>
              <div className="rounded-[1.25rem] border border-cyan-300/18 bg-cyan-300/10 px-4 py-3 sm:min-w-[10rem]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100">Scan strength</div>
                <div className="mt-1 text-3xl font-semibold text-white">{qualityScore}%</div>
                <div className="mt-1 text-xs leading-5 text-slate-300">Clearer answers improve the first read.</div>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"><span>Step {step + 1} of {STEPS.length}</span><span>{progress}% complete</span></div>
              <div className="system-status-bar mt-2 h-2"><span style={{ width: `${progress}%` }} /></div>
              <p className="mt-3 text-xs leading-5 text-slate-500">Current step only. No noisy four-step badge row.</p>
            </div>

            <form className="mt-6" onSubmit={submit} noValidate>
              <div className="grid gap-4 md:grid-cols-2">{activeStep.fields.map((field) => <FieldControl key={field} field={field} values={values} errors={errors} onChange={updateValue} />)}</div>
              <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3">
                  {step > 0 ? <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1) as StepNumber)} className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">Back</button> : null}
                  {step < STEPS.length - 1 ? <button type="button" onClick={nextStep} className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">Continue</button> : <button type="submit" disabled={isSubmitting} className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? "Submitting scan..." : "Submit free scan"}</button>}
                </div>
                <div className="text-sm leading-6 text-slate-400">Safe business context only. No passwords, cards, keys, or tokens.</div>
              </div>
              {submitState.kind === "success" ? <SuccessState state={submitState} /> : null}
              {submitState.kind === "error" ? <ErrorState state={submitState} /> : null}
            </form>
          </div>
        </div>
        <aside className="grid gap-3 lg:sticky lg:top-28">
          <InfoCard eyebrow="First read" title="Focused, not noisy." copy="The form keeps the old working setup but improves the questions, flow, and handoff so the customer can finish faster." />
          <InfoCard eyebrow="Likely next move" title={likelyMove.title} copy={likelyMove.copy} />
          <div className="sr-only">Free Scan form v3 preserves API payload, validation, signal quality, routing hint, verify-to-view handoff, dashboard Free Scan result path, inbox guidance, plan-fit CTA, compare plans CTA, recovery guidance, and safe-data warnings. It removes the visible four-step badge row.</div>
        </aside>
      </div>
    </section>
  );
}

function FieldControl({ field, values, errors, onChange }: { field: keyof FormValues; values: FormValues; errors: Partial<Record<keyof FormValues, string>>; onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void }) {
  const copy = LABELS[field];
  const wide = ["audience", "biggestIssue", "competitors", "notes"].includes(field);
  return <div className={wide ? "md:col-span-2" : undefined}><label htmlFor={field} className="mb-2 block text-sm font-semibold text-white">{copy.label}</label>{renderInput(field, values, onChange)}<p className="mt-2 text-xs leading-5 text-slate-400">{copy.helper}</p>{errors[field] ? <p className="mt-2 text-sm font-semibold text-rose-200">{errors[field]}</p> : null}</div>;
}

function renderInput(field: keyof FormValues, values: FormValues, onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void) {
  const commonClass = "w-full rounded-[1.05rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-slate-950";
  const copy = LABELS[field];
  if (field === "country") return <select id={field} name={field} value={values[field]} onChange={onChange} className={commonClass}><option value="">Select country</option>{COUNTRIES.map((item) => <option key={item} value={item}>{item}</option>)}</select>;
  if (field === "stateRegion" && values.country === "United States") return <select id={field} name={field} value={values[field]} onChange={onChange} className={commonClass}><option value="">Select a state</option>{US_STATES.map((item) => <option key={item} value={item}>{item}</option>)}</select>;
  if (field === "businessType") return <select id={field} name={field} value={values[field]} onChange={onChange} className={commonClass}><option value="">Select business type</option>{businessTypes.map((item) => <option key={item} value={item}>{item}</option>)}</select>;
  if (["audience", "biggestIssue", "competitors", "notes"].includes(field)) return <textarea id={field} name={field} value={values[field]} onChange={onChange} placeholder={copy.placeholder} rows={field === "biggestIssue" ? 6 : 4} className={`${commonClass} resize-y leading-7`} />;
  return <input id={field} name={field} value={values[field]} onChange={onChange} placeholder={copy.placeholder} type={field === "email" ? "email" : "text"} className={commonClass} autoComplete={autocompleteFor(field)} />;
}

function SuccessState({ state }: { state: Extract<SubmitState, { kind: "success" }> }) {
  const nextMove = successNextMove(state.routingHint);
  const handoff = state.handoff.handoff;
  return <div className="system-note-success mt-6 overflow-hidden rounded-[1.5rem] p-5 sm:p-6"><div className="inline-flex rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-100">Scan received · verify to view</div><h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">Confirm your email to open the result in your dashboard.</h3><p className="mt-3 text-sm leading-7 text-slate-200">{state.message}</p><div className="mt-5 grid gap-3 md:grid-cols-3">{SUCCESS_NEXT_STEPS.map((item) => <div key={item} className="rounded-[1.1rem] border border-white/10 bg-white/[0.045] px-4 py-4 text-sm font-semibold leading-6 text-white">{item}</div>)}</div><div className="mt-5 grid gap-3 md:grid-cols-3"><MiniMetric label="Scan quality" value={`${state.quality}%`} detail="Signal strength from your submitted context." /><MiniMetric label="Check your inbox" value={handoff.senderDisplay} detail={handoff.checkInboxCopy} /><MiniMetric label="Email subject" value={handoff.subject} detail={handoff.preheader} /></div><div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100">After confirmation</div><p className="mt-2 text-sm leading-7 text-slate-200">{handoff.safeCustomerMessage}</p><p className="mt-2 text-xs leading-6 text-slate-400">{handoff.reportVisibilityRule}</p></div><div className="mt-5 rounded-[1.25rem] border border-cyan-300/16 bg-cyan-300/10 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100">Recommended direction after your first read</div><div className="mt-2 text-lg font-semibold text-white">{nextMove.title}</div><p className="mt-2 text-sm leading-7 text-slate-200">{nextMove.copy}</p></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href={handoff.verifiedDestination} className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">{handoff.primaryCta}</Link><Link href={nextMove.href} className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">{nextMove.cta}</Link><Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">Compare all plans</Link></div></div>;
}

function ErrorState({ state }: { state: Extract<SubmitState, { kind: "error" }> }) {
  return <div className="system-note-danger mt-6 rounded-[1.5rem] p-5 sm:p-6"><div className="inline-flex rounded-full border border-rose-200/20 bg-rose-200/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-100">Scan not sent yet</div><h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">Nothing is lost. Fix the issue and send it again.</h3><p className="mt-3 text-sm leading-7 text-rose-100">{state.message}</p>{state.details.length ? <div className="mt-4 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-rose-100">{detail}</div>)}</div> : null}<div className="mt-5 grid gap-3 md:grid-cols-3">{RECOVERY_TILES.map((item) => <div key={item} className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-semibold leading-6 text-white">{item}</div>)}</div></div>;
}

function InfoCard({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <div className="system-surface rounded-[1.25rem] p-4"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100">{eyebrow}</p><h3 className="mt-2 text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p></div>; }
function MiniMetric({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="rounded-[1.25rem] border border-cyan-300/16 bg-cyan-300/10 p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100">{label}</div><div className="mt-2 text-base font-semibold text-white">{value}</div><p className="mt-2 text-xs leading-5 text-slate-300">{detail}</p></div>; }

function successNextMove(routingHint: RoutingHint) {
  if (routingHint === "command-review") return { title: "Ongoing Control may fit later.", copy: "Use it when the business needs recurring direction, monitoring, and monthly decision support.", href: "/plans/ongoing-control", cta: "See Ongoing Control" };
  if (routingHint === "infrastructure-review") return { title: "Build Fix may fit later.", copy: "Use it when a specific weak point is ready for scoped improvement.", href: "/plans/build-fix", cta: "See Build Fix" };
  if (routingHint === "blueprint-candidate") return { title: "Deep Review may be the right next depth.", copy: "Use it when the scan shows you need a cause-level diagnosis before paying for a fix.", href: "/plans/deep-review", cta: "See Deep Review" };
  return { title: "Start with the first read before spending deeper.", copy: "The Free Scan keeps the next move safer when the business still needs a clear first signal.", href: "/plans", cta: "Compare plans" };
}

function validateFields(values: FormValues, fields: Array<keyof FormValues>) { const errors: Partial<Record<keyof FormValues, string>> = {}; for (const field of fields) { if (field === "fullName" && values.fullName.trim().length < 2) errors.fullName = "Enter your name."; if (field === "email" && !looksLikeEmail(values.email)) errors.email = "Enter a valid business email."; if (field === "businessName" && values.businessName.trim().length < 2) errors.businessName = "Enter the business name."; if (field === "websiteUrl" && !looksLikeWebsite(values.websiteUrl)) errors.websiteUrl = "Enter the main website."; if (field === "country" && values.country.trim().length < 2) errors.country = "Choose a country."; if (field === "stateRegion" && values.stateRegion.trim().length < 2) errors.stateRegion = "Enter a state or region."; if (field === "city" && values.city.trim().length < 2) errors.city = "Enter the main city."; if (field === "businessType" && values.businessType.trim().length < 3) errors.businessType = "Choose the business type."; if (field === "primaryOffer" && values.primaryOffer.trim().length < 10) errors.primaryOffer = "Explain what the business sells."; if (field === "audience" && values.audience.trim().length < 30) errors.audience = "Describe the best customer in more detail."; if (field === "biggestIssue" && values.biggestIssue.trim().length < 45) errors.biggestIssue = "Explain what feels wrong in more detail."; } return errors; }
function buildQualityScore(values: FormValues) { const checks = [values.fullName.length >= 2, looksLikeEmail(values.email), values.businessName.length >= 2, looksLikeWebsite(values.websiteUrl), values.country.length >= 2, values.stateRegion.length >= 2, values.city.length >= 2, values.businessType.length >= 3, values.primaryOffer.length >= 10, values.audience.length >= 30, values.biggestIssue.length >= 45, values.competitors.length >= 8, values.notes.length >= 10]; return Math.min(100, Math.round((checks.filter(Boolean).length / checks.length) * 100)); }
function buildNextMove(score: number, values: FormValues) { const text = `${values.primaryOffer} ${values.audience} ${values.biggestIssue} ${values.notes}`.toLowerCase(); if (score >= 86 && /(ongoing|monthly|monitor|maintain|manage|support)/.test(text)) return { routingHint: "command-review" as RoutingHint, title: "Possible Ongoing Control fit", copy: "Recurring pressure may need continued direction after the first result." }; if (score >= 78 && /(website|booking|calls|leads|trust|confusing|unclear|conversion|choose)/.test(text)) return { routingHint: "infrastructure-review" as RoutingHint, title: "Possible Build Fix fit", copy: "A specific page, message, proof point, or action path may need scoped improvement." }; if (score >= 60) return { routingHint: "blueprint-candidate" as RoutingHint, title: "Likely Deep Review fit", copy: "There may be enough detail to diagnose what is holding the business back." }; return { routingHint: "scan-only" as RoutingHint, title: "Keep building the first read", copy: "A little more clear detail will make the scan more useful." }; }
function normalizeWebsite(value: string) { const trimmed = value.trim(); if (!trimmed) return ""; return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`; }
function looksLikeEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()); }
function looksLikeWebsite(value: string) { try { const url = new URL(normalizeWebsite(value)); return Boolean(url.hostname.includes(".") && ["http:", "https:"].includes(url.protocol)); } catch { return false; } }
function autocompleteFor(field: keyof FormValues) { if (field === "fullName") return "name"; if (field === "email") return "email"; if (field === "businessName") return "organization"; if (field === "websiteUrl") return "url"; if (field === "country") return "country-name"; if (field === "stateRegion") return "address-level1"; if (field === "city") return "address-level2"; return "off"; }
