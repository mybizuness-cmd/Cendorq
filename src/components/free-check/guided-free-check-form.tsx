"use client";

import Link from "next/link";
import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { businessTypes } from "../../lib/free-check";

type RoutingHint =
  | "scan-only"
  | "blueprint-candidate"
  | "infrastructure-review"
  | "command-review";

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

type FormErrors = Partial<Record<keyof FormValues, string>>;

type ApiResponse =
  | {
      ok: true;
      message: string;
      intakeId: string;
      signalQuality: number;
      duplicate: boolean;
      routingHint?: RoutingHint;
      reportPath?: string;
    }
  | {
      ok: false;
      error?: string;
      details?: string[];
    };

type SubmitState =
  | { kind: "idle" }
  | { kind: "success"; message: string; quality: number; reportPath?: string; routingHint: RoutingHint }
  | { kind: "error"; message: string; details: string[] };

type StepNumber = 1 | 2 | 3 | 4;

type StepDefinition = {
  step: StepNumber;
  eyebrow: string;
  title: string;
  plainTitle: string;
  copy: string;
  microcopy: string;
  fields: readonly (keyof FormValues)[];
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

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Ireland",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Mexico",
  "Other",
] as const;

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

const STEPS: readonly StepDefinition[] = [
  {
    step: 1,
    eyebrow: "Step 01",
    title: "Tell us who we are looking at.",
    plainTitle: "Business basics",
    copy: "Start with the real business, the real website, and the real person we should connect the scan to.",
    microcopy: "This keeps the scan grounded in the business people actually see online.",
    fields: ["businessName", "websiteUrl", "fullName", "email"],
  },
  {
    step: 2,
    eyebrow: "Step 02",
    title: "Show us where the business serves people.",
    plainTitle: "Location and category",
    copy: "Location and business type change how customers compare, judge, and choose you.",
    microcopy: "Use the main location and the closest business type. Simple is better than perfect.",
    fields: ["country", "stateRegion", "city", "businessType"],
  },
  {
    step: 3,
    eyebrow: "Step 03",
    title: "Explain what you sell and who should want it.",
    plainTitle: "Offer and customer",
    copy: "This is where the scan starts to see whether people can quickly understand the business and why it matters.",
    microcopy: "Say it like you would explain it to a smart customer in one minute.",
    fields: ["primaryOffer", "audience"],
  },
  {
    step: 4,
    eyebrow: "Step 04",
    title: "Name what feels broken or weaker than it should be.",
    plainTitle: "Problem and pressure",
    copy: "The best scans come from honest answers. Tell us what is not working, what feels unclear, and who people compare you against.",
    microcopy: "This is the part that helps us point you toward the right next move.",
    fields: ["biggestIssue", "competitors", "notes"],
  },
] as const;

const QUALITY_MARKERS = [
  "Guided step by step",
  "Built for serious businesses",
  "Clear next move after submission",
] as const;

const FIELD_COPY: Record<keyof FormValues, { label: string; helper: string; placeholder: string }> = {
  fullName: {
    label: "Your name",
    helper: "Who should we connect this scan to?",
    placeholder: "Jane Smith",
  },
  email: {
    label: "Business email",
    helper: "Use the best email for follow-up.",
    placeholder: "jane@business.com",
  },
  businessName: {
    label: "Business name",
    helper: "Use the name customers know.",
    placeholder: "Smith Family Dental",
  },
  websiteUrl: {
    label: "Website",
    helper: "Use the main website customers visit.",
    placeholder: "yourbusiness.com",
  },
  country: {
    label: "Country",
    helper: "Where does the business mainly operate?",
    placeholder: "United States",
  },
  stateRegion: {
    label: "State / region",
    helper: "Use the main state, province, or region.",
    placeholder: "California",
  },
  city: {
    label: "City",
    helper: "Use the main city tied to the business.",
    placeholder: "Austin",
  },
  businessType: {
    label: "Business type",
    helper: "Choose the closest fit.",
    placeholder: "Select business type",
  },
  primaryOffer: {
    label: "What do you sell?",
    helper: "Make it clear enough that a new customer would understand it fast.",
    placeholder: "Example: High-end family dental care for busy adults and parents",
  },
  audience: {
    label: "Who is the best customer?",
    helper: "Describe who you want more of and what they care about.",
    placeholder: "Example: Local families and working professionals who want trusted dental care without feeling rushed or confused.",
  },
  biggestIssue: {
    label: "What feels wrong right now?",
    helper: "Be honest. This is what makes the scan useful.",
    placeholder: "Example: People visit the site but do not book. They may not understand why we are different, and cheaper competitors feel easier to choose.",
  },
  competitors: {
    label: "Who do customers compare you with?",
    helper: "Optional, but useful when people keep choosing someone else.",
    placeholder: "List competitors, nearby businesses, directories, or alternatives.",
  },
  notes: {
    label: "Anything else we should know?",
    helper: "Optional. Add details that would help us understand the situation faster.",
    placeholder: "Add what you have tried, what changed, or what keeps getting misunderstood.",
  },
};

export function GuidedFreeCheckForm({ className }: { className?: string }) {
  const [step, setStep] = useState<StepNumber>(1);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeStep = STEPS[step - 1];
  const progress = Math.round((step / STEPS.length) * 100);
  const qualityScore = useMemo(() => buildQualityScore(values), [values]);
  const isUnitedStates = values.country === "United States";
  const nextMove = useMemo(() => buildNextMove(qualityScore, values), [qualityScore, values]);

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    const key = name as keyof FormValues;

    setValues((current) => {
      const next = { ...current, [key]: value };
      if (key === "country") next.stateRegion = "";
      return next;
    });

    setErrors((current) => ({ ...current, [key]: undefined }));

    if (submitState.kind !== "idle") {
      setSubmitState({ kind: "idle" });
    }
  }

  function goNext() {
    const nextErrors = validateStep(values, activeStep, isUnitedStates);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStep((current) => Math.min(4, current + 1) as StepNumber);
  }

  function goBack() {
    setStep((current) => Math.max(1, current - 1) as StepNumber);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateAll(values, isUnitedStates);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStep(findFirstErrorStep(nextErrors));
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ kind: "idle" });

    try {
      const response = await fetch("/api/free-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          websiteUrl: normalizeWebsite(values.websiteUrl),
          source: "free-check",
        }),
      });

      const data = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || !data || !data.ok) {
        setSubmitState({
          kind: "error",
          message: data?.error || "The scan could not be submitted yet.",
          details: !data || data.ok ? [] : data.details || [],
        });
        return;
      }

      setSubmitState({
        kind: "success",
        message: data.message,
        quality: data.signalQuality,
        reportPath: data.reportPath,
        routingHint: data.routingHint || nextMove.routingHint,
      });
      setValues(INITIAL_VALUES);
      setErrors({});
      setStep(1);
    } catch {
      setSubmitState({
        kind: "error",
        message: "The scan could not connect right now. Please try again.",
        details: [],
      });
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
                <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                  {activeStep.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                  {activeStep.copy}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-cyan-300/18 bg-cyan-300/10 px-5 py-4 lg:min-w-[13rem]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100">
                  Scan strength
                </div>
                <div className="mt-2 text-4xl font-semibold text-white">{qualityScore}%</div>
                <div className="mt-1 text-xs leading-5 text-slate-300">More clear detail creates a stronger first read.</div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {STEPS.map((item) => (
                <StepButton
                  key={item.step}
                  item={item}
                  active={item.step === step}
                  complete={item.step < step}
                  onClick={() => setStep(item.step)}
                />
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                <span>{activeStep.plainTitle}</span>
                <span>{progress}% complete</span>
              </div>
              <div className="system-status-bar mt-2 h-2">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <p className="mt-5 rounded-[1.3rem] border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-7 text-slate-300">
              {activeStep.microcopy}
            </p>

            <form className="mt-7" onSubmit={onSubmit} noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                {activeStep.fields.map((field) => (
                  <FormField
                    key={field}
                    field={field}
                    values={values}
                    errors={errors}
                    isUnitedStates={isUnitedStates}
                    onChange={onChange}
                  />
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                    >
                      Back
                    </button>
                  ) : null}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting scan..." : "Submit free scan"}
                    </button>
                  )}
                </div>

                <div className="text-sm leading-6 text-slate-400">
                  Step {step} of {STEPS.length}. No giant form. No guesswork.
                </div>
              </div>

              {submitState.kind === "success" ? (
                <div className="system-note-success mt-6 rounded-[1.6rem] p-5">
                  <h3 className="text-xl font-semibold text-white">Your scan has been received.</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{submitState.message}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <ResultTile label="Scan strength" value={`${submitState.quality}%`} />
                    <ResultTile label="Likely next move" value={humanizeRoutingHint(submitState.routingHint)} />
                    <ResultTile label="Status" value="Captured" />
                  </div>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    {submitState.reportPath ? (
                      <Link href={submitState.reportPath} className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">
                        View scan report
                      </Link>
                    ) : null}
                    <Link href="/pricing" className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition">
                      See the full path
                    </Link>
                  </div>
                </div>
              ) : null}

              {submitState.kind === "error" ? (
                <div className="system-note-danger mt-6 rounded-[1.6rem] p-5">
                  <h3 className="text-lg font-semibold text-white">Something needs attention.</h3>
                  <p className="mt-2 text-sm leading-7 text-rose-100">{submitState.message}</p>
                  {submitState.details.length > 0 ? (
                    <div className="mt-4 grid gap-2">
                      {submitState.details.map((detail) => (
                        <div key={detail} className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-rose-100">
                          {detail}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </form>
          </div>
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-28">
          <div className="system-panel-authority rounded-[1.8rem] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">Why this works</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">We guide the customer one clear move at a time.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              The scan does not throw a wall of fields at people. It collects the right details in the right order so the first read feels serious, focused, and easy to finish.
            </p>
          </div>

          <div className="grid gap-3">
            {QUALITY_MARKERS.map((item) => (
              <div key={item} className="system-surface rounded-[1.25rem] px-4 py-4 text-sm font-semibold leading-6 text-white">
                {item}
              </div>
            ))}
          </div>

          <div className="system-surface rounded-[1.5rem] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Likely next move</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{nextMove.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{nextMove.copy}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FormField({
  field,
  values,
  errors,
  isUnitedStates,
  onChange,
}: {
  field: keyof FormValues;
  values: FormValues;
  errors: FormErrors;
  isUnitedStates: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}) {
  const copy = FIELD_COPY[field];
  const error = errors[field];
  const wide = field === "audience" || field === "biggestIssue" || field === "competitors" || field === "notes";

  return (
    <Field wide={wide}>
      <Label htmlFor={field}>{copy.label}</Label>
      {renderControl(field, values, isUnitedStates, onChange)}
      <FieldHelper>{copy.helper}</FieldHelper>
      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
}

function renderControl(
  field: keyof FormValues,
  values: FormValues,
  isUnitedStates: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
) {
  const copy = FIELD_COPY[field];

  if (field === "country") {
    return (
      <Select id={field} name={field} value={values[field]} onChange={onChange}>
        {COUNTRIES.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </Select>
    );
  }

  if (field === "stateRegion" && isUnitedStates) {
    return (
      <Select id={field} name={field} value={values[field]} onChange={onChange}>
        <option value="">Select a state</option>
        {US_STATES.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </Select>
    );
  }

  if (field === "businessType") {
    return (
      <Select id={field} name={field} value={values[field]} onChange={onChange}>
        <option value="">{copy.placeholder}</option>
        {businessTypes.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </Select>
    );
  }

  if (field === "audience" || field === "biggestIssue" || field === "competitors" || field === "notes") {
    return (
      <Textarea
        id={field}
        name={field}
        value={values[field]}
        onChange={onChange}
        placeholder={copy.placeholder}
        rows={field === "biggestIssue" ? 7 : 4}
      />
    );
  }

  return (
    <Input
      id={field}
      name={field}
      value={values[field]}
      onChange={onChange}
      placeholder={copy.placeholder}
      type={field === "email" ? "email" : "text"}
      autoComplete={autocompleteFor(field)}
    />
  );
}

function StepButton({
  item,
  active,
  complete,
  onClick,
}: {
  item: StepDefinition;
  active: boolean;
  complete: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-[1.25rem] border px-4 py-4 text-left transition duration-200",
        active
          ? "border-cyan-300/24 bg-cyan-300/12 text-white"
          : complete
            ? "border-white/12 bg-white/[0.05] text-slate-200"
            : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-cyan-300/20 hover:bg-white/[0.05] hover:text-white",
      ].join(" ")}
    >
      <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{item.eyebrow}</span>
      <span className="mt-2 block text-sm font-semibold">{item.plainTitle}</span>
    </button>
  );
}

function Field({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={wide ? "md:col-span-2" : undefined}>{children}</div>;
}

function Label({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className="mb-2 block text-sm font-semibold text-white">{children}</label>;
}

function FieldHelper({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-xs leading-5 text-slate-400">{children}</p>;
}

function FieldError({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-sm font-semibold text-rose-200">{children}</p>;
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-[1.1rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-slate-950"
    />
  );
}

function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-[1.1rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50 focus:bg-slate-950"
    />
  );
}

function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full resize-y rounded-[1.1rem] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-slate-950"
    />
  );
}

function ResultTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function validateAll(values: FormValues, isUnitedStates: boolean) {
  return STEPS.reduce<FormErrors>((all, item) => ({
    ...all,
    ...validateStep(values, item, isUnitedStates),
  }), {});
}

function validateStep(values: FormValues, step: StepDefinition, isUnitedStates: boolean) {
  const errors: FormErrors = {};

  for (const field of step.fields) {
    if (field === "fullName" && values.fullName.trim().length < 2) errors.fullName = "Enter your name.";
    if (field === "email" && !looksLikeEmail(values.email)) errors.email = "Enter a valid business email.";
    if (field === "businessName" && values.businessName.trim().length < 2) errors.businessName = "Enter the business name.";
    if (field === "websiteUrl" && !looksLikeWebsite(values.websiteUrl)) errors.websiteUrl = "Enter the main website.";
    if (field === "country" && values.country.trim().length < 2) errors.country = "Choose a country.";
    if (field === "stateRegion" && values.stateRegion.trim().length < 2) errors.stateRegion = isUnitedStates ? "Choose a state." : "Enter a region.";
    if (field === "city" && values.city.trim().length < 2) errors.city = "Enter the main city.";
    if (field === "businessType" && values.businessType.trim().length < 3) errors.businessType = "Choose the business type.";
    if (field === "primaryOffer" && values.primaryOffer.trim().length < 10) errors.primaryOffer = "Explain what the business sells.";
    if (field === "audience" && values.audience.trim().length < 30) errors.audience = "Describe the best customer in more detail.";
    if (field === "biggestIssue" && values.biggestIssue.trim().length < 45) errors.biggestIssue = "Explain what feels wrong in more detail.";
  }

  return errors;
}

function findFirstErrorStep(errors: FormErrors): StepNumber {
  const first = STEPS.find((item) => item.fields.some((field) => Boolean(errors[field])));
  return first?.step || 1;
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
    return {
      routingHint: "command-review" as RoutingHint,
      title: "Possible ongoing support fit",
      copy: "The business may need more than a one-time fix if the problem keeps changing or needs continued control.",
    };
  }
  if (score >= 78 && /(website|booking|calls|leads|trust|confusing|unclear|conversion|choose)/.test(text)) {
    return {
      routingHint: "infrastructure-review" as RoutingHint,
      title: "Possible build-layer fit",
      copy: "The business may need stronger pages, clearer messaging, or a better path for people to take action.",
    };
  }
  if (score >= 60) {
    return {
      routingHint: "blueprint-candidate" as RoutingHint,
      title: "Likely deeper review fit",
      copy: "There may be enough detail here to decide what is holding the business back and what should happen next.",
    };
  }
  return {
    routingHint: "scan-only" as RoutingHint,
    title: "Keep building the first read",
    copy: "A little more clear detail will make the scan more useful and easier to act on.",
  };
}

function humanizeRoutingHint(value: RoutingHint) {
  if (value === "command-review") return "Ongoing support review";
  if (value === "infrastructure-review") return "Build-layer review";
  if (value === "blueprint-candidate") return "Deeper review";
  return "First read only";
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
