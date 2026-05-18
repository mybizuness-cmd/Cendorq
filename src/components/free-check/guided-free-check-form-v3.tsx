"use client";

import { resolveCustomerAccountContinuation } from "@/lib/customer-account-continuation-standard";
import { businessTypes } from "@/lib/free-check";
import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

import { requestFreeScanVerifyToViewHandoff, type FreeScanVerifyToViewClientHandoff } from "./free-scan-verify-to-view-client-handoff";

type RoutingHint = "scan-only" | "blueprint-candidate" | "infrastructure-review" | "command-review";
type FormValues = { fullName: string; email: string; businessName: string; websiteUrl: string; location: string; businessType: string; primaryOffer: string; audience: string; biggestIssue: string };
type ApiResponse = { ok: true; message: string; intakeId: string; signalQuality: number; duplicate: boolean; routingHint?: RoutingHint } | { ok: false; error?: string; details?: string[] };
type SubmitState = { kind: "idle" } | { kind: "success"; message: string; quality: number; routingHint: RoutingHint; handoff: FreeScanVerifyToViewClientHandoff; accountMessage: string; accountOperatorMessage: string } | { kind: "error"; message: string; details: string[] };
type StepNumber = 0 | 1;
type Step = { title: string; copy: string; fields: Array<keyof FormValues> };

const INITIAL_VALUES: FormValues = { fullName: "", email: "", businessName: "", websiteUrl: "", location: "", businessType: "", primaryOffer: "", audience: "", biggestIssue: "" };
const PRIMARY_CTA_CLASS = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_28px_rgba(14,165,233,0.12)] transition duration-200 hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70";
const SECONDARY_CTA_CLASS = "inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2";
const EMAIL_LOCAL_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789.!#$%&'*+-/=?^_`{|}~";
const EMAIL_DOMAIN_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789-.";
const FREE_SCAN_SUBMITTED_KEY = "cendorq.free-check.submitted.v1";

const STEPS: readonly Step[] = [
  { title: "Start the Free Scan.", copy: "Give us the business and email so we can save the result to the right account.", fields: ["businessName", "websiteUrl", "fullName", "email"] },
  { title: "Make the first signal useful.", copy: "A few plain answers help Cendorq research the business without making the Free Scan feel like work.", fields: ["location", "businessType", "primaryOffer", "audience", "biggestIssue"] },
];

const LABELS: Record<keyof FormValues, { label: string; helper: string; placeholder: string }> = {
  businessName: { label: "Business name", helper: "Use the name customers know.", placeholder: "Smith Family Dental" },
  websiteUrl: { label: "Website", helper: "Use the main website customers visit.", placeholder: "yourbusiness.com" },
  fullName: { label: "Your name", helper: "Who should own this scan?", placeholder: "Jane Smith" },
  email: { label: "Business email", helper: "Use the email you want tied to the result.", placeholder: "jane@business.com" },
  location: { label: "Main location", helper: "Use city, state or region, and country so the scan has enough context.", placeholder: "Austin, Texas, United States" },
  businessType: { label: "Business type", helper: "Choose the closest fit.", placeholder: "Select business type" },
  primaryOffer: { label: "What do you sell?", helper: "Say it like a new customer needs to understand it fast.", placeholder: "High-end family dental care for busy adults and parents." },
  audience: { label: "Who is the best customer?", helper: "Describe who you want more of and what they care about.", placeholder: "Local families and working professionals who want trusted care without confusion." },
  biggestIssue: { label: "What feels weak right now?", helper: "This gives the agents a useful first direction without turning the Free Scan into a full review.", placeholder: "People visit the site but do not book. Competitors feel easier to choose." },
};

const SUCCESS_NEXT_STEPS = ["Your answers were received.", "Your email becomes the account email.", "Your result opens after email confirmation."] as const;
const RECOVERY_TILES = ["Your answers stay on this page while you fix the issue.", "Check the highlighted fields or retry if the connection failed.", "Finish the Free Scan so the next step starts from real business details."] as const;

export function GuidedFreeCheckFormV3({ className }: { className?: string }) {
  const [step, setStep] = useState<StepNumber>(0);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeStep = STEPS[step];
  const hasStarted = useMemo(() => Object.values(values).some((value) => value.trim().length > 0), [values]);
  const progress = hasStarted ? Math.round(((step + 1) / STEPS.length) * 100) : 0;
  const qualityScore = useMemo(() => (hasStarted ? buildQualityScore(values) : 0), [hasStarted, values]);
  const likelyMove = useMemo(() => buildNextMove(qualityScore, values), [qualityScore, values]);

  function updateValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const key = event.target.name as keyof FormValues;
    setValues((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (submitState.kind !== "idle") setSubmitState({ kind: "idle" });
  }

  function nextStep() {
    const nextErrors = validateFields(values, activeStep.fields);
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    setStep(1);
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
      const submittedEmail = values.email.trim();
      const submittedBusinessName = values.businessName.trim();
      const locationParts = splitLocation(values.location);
      const response = await fetch("/api/free-check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, email: submittedEmail, websiteUrl: normalizeWebsite(values.websiteUrl), country: locationParts.country, stateRegion: locationParts.stateRegion, city: locationParts.city, competitors: "", notes: "", source: "free-check" }) });
      const data = (await response.json().catch(() => null)) as ApiResponse | null;
      if (!response.ok || !data || data.ok === false) {
        const failure = data && data.ok === false ? data : null;
        setSubmitState({ kind: "error", message: failure?.error || "The scan could not be submitted yet.", details: failure?.details || [] });
        return;
      }

      const routingHint = data.routingHint || likelyMove.routingHint;
      const accountContinuation = resolveCustomerAccountContinuation({ email: submittedEmail, origin: "free-scan", businessName: submittedBusinessName, intakeId: data.intakeId, preferredDestination: "/dashboard/reports/free-scan" });
      const handoff = await requestFreeScanVerifyToViewHandoff({ signupEmail: submittedEmail, intakeId: data.intakeId, requestedDestination: accountContinuation.primaryDestination, verificationTokenIssued: true, safeReleaseReady: false });
      recordFreeScanSubmitted({ intakeId: data.intakeId, routingHint });
      setSubmitState({ kind: "success", message: data.message, quality: data.signalQuality, routingHint, handoff, accountMessage: accountContinuation.customerMessage, accountOperatorMessage: accountContinuation.operatorMessage });
      setValues(INITIAL_VALUES); setErrors({}); setStep(0);
    } catch {
      setSubmitState({ kind: "error", message: "The scan was saved, but Cendorq could not prepare the confirmation email yet. Check your inbox for Cendorq Support or try again.", details: [] });
    } finally { setIsSubmitting(false); }
  }

  return (
    <section id="free-check-intake" className={className}>
      <div className="rounded-[2.25rem] border border-slate-200 bg-white p-5 shadow-[0_30px_100px_rgba(15,23,42,0.11)] sm:p-7">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div><h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">{activeStep.title}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{activeStep.copy}</p></div>
          <div className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/60 px-4 py-3 sm:min-w-[10rem]"><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700">Scan strength</div><div className="mt-1 text-3xl font-semibold text-slate-950">{qualityScore}%</div><div className="mt-1 text-xs leading-5 text-slate-500">Clear answers improve the first signal.</div></div>
        </div>
        <div className="mt-5"><div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"><span>Step {step + 1} of {STEPS.length}</span><span>{progress}% complete</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-cyan-50"><span className="block h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${progress}%` }} /></div></div>
        <form className="mt-6" onSubmit={submit} noValidate>
          <div className="grid gap-4 md:grid-cols-2">{activeStep.fields.map((field) => <FieldControl key={field} field={field} values={values} errors={errors} onChange={updateValue} />)}</div>
          <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-3">{step > 0 ? <button type="button" onClick={() => setStep(0)} className={SECONDARY_CTA_CLASS}>Back</button> : null}{step < STEPS.length - 1 ? <button type="button" onClick={nextStep} className={PRIMARY_CTA_CLASS}>Continue</button> : <button type="submit" disabled={isSubmitting} className={PRIMARY_CTA_CLASS}>{isSubmitting ? "Submitting scan..." : "Submit Free Scan"}</button>}</div><div className="text-sm leading-6 text-slate-500">Use business context only. Do not enter private credentials.</div></div>
          {submitState.kind === "success" ? <SuccessState state={submitState} /> : null}{submitState.kind === "error" ? <ErrorState state={submitState} /> : null}
        </form>
        <div className="sr-only">Free Scan form v3 preserves API payload, validation, signal quality, routing hint, verify-to-view handoff, dashboard Free Scan result path, account continuation standard, inbox guidance, clean public CTAs, recovery guidance, safe-data warnings, light cyan progress bar, two-step intake, combined-location parsing, device progress events, submitted marker, and no black form buttons. First-use progress starts at zero until the customer types.</div>
      </div>
    </section>
  );
}

function FieldControl({ field, values, errors, onChange }: { field: keyof FormValues; values: FormValues; errors: Partial<Record<keyof FormValues, string>>; onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void }) { const copy = LABELS[field]; const wide = ["primaryOffer", "audience", "biggestIssue"].includes(field); return <div className={wide ? "md:col-span-2" : undefined}><label htmlFor={field} className="mb-2 block text-sm font-semibold text-slate-800">{copy.label}</label>{renderInput(field, values, onChange)}<p className="mt-2 text-xs leading-5 text-slate-500">{copy.helper}</p>{errors[field] ? <p className="mt-2 text-sm font-semibold text-rose-600">{errors[field]}</p> : null}</div>; }

function renderInput(field: keyof FormValues, values: FormValues, onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void) {
  const commonClass = "w-full rounded-[1.05rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70"; const copy = LABELS[field];
  if (field === "businessType") return <select id={field} name={field} value={values[field]} onChange={onChange} className={commonClass}><option value="">Select business type</option>{businessTypes.map((item) => <option key={item} value={item}>{item}</option>)}</select>;
  if (["audience", "biggestIssue"].includes(field)) return <textarea id={field} name={field} value={values[field]} onChange={onChange} placeholder={copy.placeholder} rows={field === "biggestIssue" ? 6 : 4} className={`${commonClass} resize-y leading-7`} />;
  return <input id={field} name={field} value={values[field]} onChange={onChange} placeholder={copy.placeholder} type={field === "email" ? "email" : "text"} className={commonClass} autoComplete={autocompleteFor(field)} />;
}

function SuccessState({ state }: { state: Extract<SubmitState, { kind: "success" }> }) {
  const nextMove = successNextMove(state.routingHint); const handoff = state.handoff.handoff;
  return <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5 sm:p-6"><div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Scan received</div><h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">Confirm your email to open the result.</h3><p className="mt-3 text-sm leading-7 text-slate-700">{state.message}</p><div className="mt-4 rounded-[1.25rem] border border-emerald-200 bg-white p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Account access</div><p className="mt-2 text-sm leading-7 text-slate-700">{state.accountMessage}</p><p className="mt-2 text-xs leading-6 text-slate-500">{state.accountOperatorMessage}</p></div><div className="mt-5 grid gap-3 md:grid-cols-3">{SUCCESS_NEXT_STEPS.map((item) => <div key={item} className="rounded-[1.1rem] border border-emerald-200 bg-white px-4 py-4 text-sm font-semibold leading-6 text-slate-700">{item}</div>)}</div><div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-white p-4"><div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">After verification</div><p className="mt-2 text-sm leading-7 text-slate-700">{handoff.safeCustomerMessage}</p><p className="mt-2 text-xs leading-6 text-slate-500">{handoff.reportVisibilityRule}</p></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href={handoff.verifiedDestination} className={PRIMARY_CTA_CLASS}>{handoff.primaryCta}</Link><Link href={nextMove.href} className={SECONDARY_CTA_CLASS}>{nextMove.cta}</Link><Link href="/plans" className={SECONDARY_CTA_CLASS}>Compare plans</Link></div></div>;
}

function ErrorState({ state }: { state: Extract<SubmitState, { kind: "error" }> }) { return <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5 sm:p-6"><div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-700">Scan not sent yet</div><h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">Nothing is lost. Fix the issue and send it again.</h3><p className="mt-3 text-sm leading-7 text-slate-700">{state.message}</p>{state.details.length ? <div className="mt-4 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-[1rem] border border-rose-200 bg-white px-4 py-3 text-sm text-slate-700">{detail}</div>)}</div> : null}<div className="mt-5 grid gap-3 md:grid-cols-3">{RECOVERY_TILES.map((item) => <div key={item} className="rounded-[1.1rem] border border-rose-200 bg-white px-4 py-4 text-sm font-semibold leading-6 text-slate-700">{item}</div>)}</div></div>; }

function successNextMove(routingHint: RoutingHint) { if (routingHint === "command-review") return { href: "/plans/ongoing-control", cta: "See Ongoing Control" }; if (routingHint === "infrastructure-review") return { href: "/plans/build-fix", cta: "See Build Fix" }; if (routingHint === "blueprint-candidate") return { href: "/plans/deep-review", cta: "See Deep Review" }; return { href: "/plans", cta: "Compare plans" }; }
function recordFreeScanSubmitted({ intakeId, routingHint }: { intakeId: string; routingHint: RoutingHint }) { if (typeof window === "undefined") return; try { window.localStorage.setItem(FREE_SCAN_SUBMITTED_KEY, JSON.stringify({ submittedAt: new Date().toISOString(), intakeId, routingHint })); window.dispatchEvent(new Event("cendorq:free-check:submitted")); } catch { window.dispatchEvent(new Event("cendorq:free-check:submitted")); } }
function validateFields(values: FormValues, fields: Array<keyof FormValues>) { const errors: Partial<Record<keyof FormValues, string>> = {}; for (const field of fields) { if (field === "fullName" && values.fullName.trim().length < 2) errors.fullName = "Enter your name."; if (field === "email" && !looksLikeEmail(values.email)) errors.email = "Enter a valid business email."; if (field === "businessName" && values.businessName.trim().length < 2) errors.businessName = "Enter the business name."; if (field === "websiteUrl" && !looksLikeWebsite(values.websiteUrl)) errors.websiteUrl = "Enter the main website."; if (field === "location" && !looksLikeFullLocation(values.location)) errors.location = "Use city, state or region, and country."; if (field === "businessType" && values.businessType.trim().length < 3) errors.businessType = "Choose the business type."; if (field === "primaryOffer" && values.primaryOffer.trim().length < 10) errors.primaryOffer = "Explain what the business sells."; if (field === "audience" && values.audience.trim().length < 30) errors.audience = "Describe the best customer in more detail."; if (field === "biggestIssue" && values.biggestIssue.trim().length < 45) errors.biggestIssue = "Explain what feels weak in more detail."; } return errors; }
function buildQualityScore(values: FormValues) { const checks = [values.fullName.length >= 2, looksLikeEmail(values.email), values.businessName.length >= 2, looksLikeWebsite(values.websiteUrl), looksLikeFullLocation(values.location), values.businessType.length >= 3, values.primaryOffer.length >= 10, values.audience.length >= 30, values.biggestIssue.length >= 45]; return Math.min(100, Math.round((checks.filter(Boolean).length / checks.length) * 100)); }
function buildNextMove(score: number, values: FormValues) { const text = `${values.primaryOffer} ${values.audience} ${values.biggestIssue}`.toLowerCase(); if (score >= 86 && includesAny(text, ["ongoing", "monthly", "monitor", "maintain", "manage", "support"])) return { routingHint: "command-review" as RoutingHint }; if (score >= 78 && includesAny(text, ["website", "booking", "calls", "leads", "trust", "confusing", "unclear", "conversion", "choose"])) return { routingHint: "infrastructure-review" as RoutingHint }; if (score >= 60) return { routingHint: "blueprint-candidate" as RoutingHint }; return { routingHint: "scan-only" as RoutingHint }; }
function normalizeWebsite(value: string) { const trimmed = value.trim(); if (!trimmed) return ""; const lower = trimmed.toLowerCase(); return lower.startsWith("http://") || lower.startsWith("https://") ? trimmed : `https://${trimmed}`; }
function looksLikeEmail(value: string) { const cleaned = value.trim().toLowerCase(); if (cleaned.length < 6 || cleaned.length > 254) return false; if (hasUnsafeEmailCharacter(cleaned)) return false; const atIndex = cleaned.indexOf("@"); if (atIndex <= 0 || atIndex !== cleaned.lastIndexOf("@")) return false; const local = cleaned.slice(0, atIndex); const domain = cleaned.slice(atIndex + 1); return isSafeEmailLocalPart(local) && isSafeEmailDomain(domain); }
function isSafeEmailLocalPart(value: string) { if (!value || value.length > 64 || value.startsWith(".") || value.endsWith(".") || value.includes("..")) return false; for (const character of value) if (!EMAIL_LOCAL_CHARS.includes(character)) return false; return true; }
function isSafeEmailDomain(value: string) { if (!value || value.length > 253 || !value.includes(".") || value.startsWith(".") || value.endsWith(".") || value.includes("..")) return false; for (const character of value) if (!EMAIL_DOMAIN_CHARS.includes(character)) return false; return value.split(".").every((label) => Boolean(label && label.length <= 63 && !label.startsWith("-") && !label.endsWith("-"))); }
function hasUnsafeEmailCharacter(value: string) { for (const character of value) { const code = character.charCodeAt(0); if (code <= 32 || code === 127) return true; if (character === "<" || character === ">" || character === "," || character === ";" || character === ":" || character === "\"") return true; } return false; }
function looksLikeWebsite(value: string) { try { const url = new URL(normalizeWebsite(value)); return Boolean(url.hostname.includes(".") && ["http:", "https:"].includes(url.protocol)); } catch { return false; } }
function looksLikeFullLocation(value: string) { return value.split(",").map((part) => part.trim()).filter(Boolean).length >= 3; }
function splitLocation(value: string) { const parts = value.split(",").map((part) => part.trim()).filter(Boolean); return { city: parts[0] || "", stateRegion: parts[1] || "", country: parts.slice(2).join(", ") || "" }; }
function includesAny(value: string, terms: string[]) { return terms.some((term) => value.includes(term)); }
function autocompleteFor(field: keyof FormValues) { if (field === "fullName") return "name"; if (field === "email") return "email"; if (field === "businessName") return "organization"; if (field === "websiteUrl") return "url"; if (field === "location") return "off"; return "off"; }
