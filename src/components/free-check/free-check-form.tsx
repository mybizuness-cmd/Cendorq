"use client";

import Link from "next/link";
import {
    useEffect,
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

type FreeCheckFormValues = {
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

type FormErrors = Partial<Record<keyof FreeCheckFormValues, string>>;

type RoutingHint =
    | "scan-only"
    | "blueprint-candidate"
    | "infrastructure-review"
    | "command-review";

type ApiSuccessResponse = {
    ok: true;
    message: string;
    intakeId: string;
    signalQuality: number;
    duplicate: boolean;
    routingHint?: RoutingHint;
    riskFlags?: string[];
};

type ApiErrorResponse = {
    ok: false;
    error?: string;
    details?: string[];
};

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

type SubmitState =
    | { kind: "idle" }
    | {
          kind: "success";
          message: string;
          intakeId: string;
          signalQuality: number;
          duplicate: boolean;
          routingHint: RoutingHint;
          riskFlags: string[];
      }
    | {
          kind: "error";
          message: string;
          details: string[];
      };

type StepNumber = 1 | 2 | 3;

type DraftEnvelope = {
    version: 1;
    savedAt: string;
    values: FreeCheckFormValues;
};

type FreeCheckFormProps = {
    className?: string;
    storageKey?: string;
    source?: "search-presence-scan" | "free-check";
};

const BRAND_NAME = "Cendorq";
const PRIMARY_LAYER_NAME = "Search Presence Scan";
const DEFAULT_STORAGE_KEY = "cendorq-component-search-presence-scan-draft-v1";

const INITIAL_VALUES: FreeCheckFormValues = {
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

const COUNTRY_OPTIONS = [
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

const STEP_CONTENT = [
    {
        step: 1 as StepNumber,
        label: "Identity layer",
        title: "Ground the signal in the real business first.",
        description:
            "The system starts by anchoring the read in the real operator, the real business, and the real public-facing website so the first layer is not forced to guess from weak input.",
        helper:
            "Use the real business contact, the real business email, and the exact website customers actually see.",
    },
    {
        step: 2 as StepNumber,
        label: "Context layer",
        title: "Give the system enough context to read the business correctly.",
        description:
            "Business type, offer clarity, and intended audience shape how the market is reading the company. Strong context creates a stronger first signal.",
        helper:
            "Be plain and specific. Sharp detail creates more value than polished filler.",
    },
    {
        step: 3 as StepNumber,
        label: "Pressure layer",
        title: "Name the real pressure without softening it.",
        description:
            "This is where the signal gets sharper. The more honestly the business names what feels weak, the more valuable the next read becomes.",
        helper:
            "Do not dilute the problem. Say where trust, clarity, positioning, or action feels broken.",
    },
] as const;

const SIDE_NOTES = [
    {
        title: "What this form is for",
        copy:
            "This is the structured first-read layer inside Cendorq. It exists to improve the quality of the next decision before deeper action gets chosen.",
    },
    {
        title: "Best fit",
        copy:
            "Businesses that still need a stronger first signal before heavier strategic or implementation depth makes sense.",
    },
    {
        title: "What happens next",
        copy:
            "If the signal is strong enough, the likely next move becomes Visibility Blueprint rather than random escalation into the wrong layer.",
    },
] as const;

export function FreeCheckForm({
    className,
    storageKey = DEFAULT_STORAGE_KEY,
    source = "search-presence-scan",
}: FreeCheckFormProps) {
    const [step, setStep] = useState<StepNumber>(1);
    const [values, setValues] = useState<FreeCheckFormValues>(INITIAL_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
    const [draftLoaded, setDraftLoaded] = useState(false);
    const [draftRestored, setDraftRestored] = useState(false);

    const isUnitedStates = values.country === "United States";
    const activeStep = STEP_CONTENT[step - 1];

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const raw = window.sessionStorage.getItem(storageKey);
            if (!raw) {
                setDraftLoaded(true);
                return;
            }

            const parsed = JSON.parse(raw) as Partial<DraftEnvelope> | null;
            const restored = sanitizeDraft(parsed?.values ?? {});

            setValues((current) => ({
                ...current,
                ...restored,
            }));

            if (hasMeaningfulDraft(restored)) {
                setDraftRestored(true);
            }
        } catch {
            // Ignore malformed session drafts.
        } finally {
            setDraftLoaded(true);
        }
    }, [storageKey]);

    useEffect(() => {
        if (!draftLoaded || typeof window === "undefined") return;

        const envelope: DraftEnvelope = {
            version: 1,
            savedAt: new Date().toISOString(),
            values,
        };

        try {
            window.sessionStorage.setItem(storageKey, JSON.stringify(envelope));
        } catch {
            // Ignore storage failures.
        }
    }, [values, draftLoaded, storageKey]);

    const progress = useMemo(() => {
        if (step === 1) return 34;
        if (step === 2) return 67;
        return 100;
    }, [step]);

    const signalScore = useMemo(() => buildSignalPreview(values), [values]);
    const websiteHostname = useMemo(() => extractHostname(values.websiteUrl), [values.websiteUrl]);
    const readinessLane = useMemo(
        () => buildReadinessLane(values, signalScore),
        [values, signalScore],
    );

    const signalLabel = useMemo(() => {
        if (signalScore >= 86) return "Strong signal";
        if (signalScore >= 66) return "Building well";
        if (signalScore >= 46) return "Needs more detail";
        return "Weak signal";
    }, [signalScore]);

    const weakAreas = useMemo(() => {
        const list: string[] = [];

        if (!looksLikeWebsite(values.websiteUrl)) {
            list.push("Website signal still needs a valid public-facing site.");
        }
        if (values.primaryOffer.trim().length < 12) {
            list.push("The offer still needs to be stated more clearly.");
        }
        if (values.audience.trim().length < 35) {
            list.push("The audience still needs more precise detail.");
        }
        if (values.biggestIssue.trim().length < 50) {
            list.push("The core business pressure is still under-explained.");
        }

        return list.slice(0, 3);
    }, [values]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const validation = validateAll(values, isUnitedStates);
        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            setStep(resolveFirstInvalidStep(validation));
            scrollToTop();
            return;
        }

        setIsSubmitting(true);
        setSubmitState({ kind: "idle" });

        try {
            const response = await fetch("/api/free-check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    websiteUrl: normalizeWebsite(values.websiteUrl),
                    source,
                }),
            });

            const data = (await response.json().catch(() => null)) as ApiResponse | null;

            if (!response.ok || !data || !data.ok) {
                const details =
                    data && "details" in data && Array.isArray(data.details) && data.details.length > 0
                        ? data.details
                        : [
                              data && "error" in data && typeof data.error === "string"
                                  ? data.error
                                  : "The intake route returned an unexpected response.",
                          ];

                setSubmitState({
                    kind: "error",
                    message:
                        "The Search Presence Scan could not be submitted cleanly yet. Please review the details and try again.",
                    details,
                });
                setIsSubmitting(false);
                return;
            }

            setSubmitState({
                kind: "success",
                message: data.message,
                intakeId: data.intakeId,
                signalQuality: data.signalQuality,
                duplicate: data.duplicate,
                routingHint: data.routingHint ?? readinessLane.routingHint,
                riskFlags: Array.isArray(data.riskFlags) ? data.riskFlags : [],
            });

            setValues(INITIAL_VALUES);
            setErrors({});
            setStep(1);
            setDraftRestored(false);

            if (typeof window !== "undefined") {
                window.sessionStorage.removeItem(storageKey);
            }

            scrollToTop();
        } catch {
            setSubmitState({
                kind: "error",
                message:
                    "The intake service could not be reached right now. Please try again in a moment.",
                details: [],
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) {
        const { name, value } = event.target;
        const key = name as keyof FreeCheckFormValues;

        setValues((current) => {
            const next = { ...current, [key]: value };
            if (key === "country") {
                next.stateRegion = "";
            }
            return next;
        });

        setErrors((current) => ({
            ...current,
            [key]: undefined,
        }));

        if (submitState.kind !== "idle") {
            setSubmitState({ kind: "idle" });
        }
    }

    function handleNextStep() {
        const validation = validateStep(values, step, isUnitedStates);
        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return;
        }

        if (step < 3) {
            setStep((current) => (current + 1) as StepNumber);
            scrollToTop();
        }
    }

    function handlePreviousStep() {
        if (step > 1) {
            setStep((current) => (current - 1) as StepNumber);
            scrollToTop();
        }
    }

    function handleResetDraft() {
        setValues(INITIAL_VALUES);
        setErrors({});
        setSubmitState({ kind: "idle" });
        setStep(1);
        setDraftRestored(false);

        if (typeof window !== "undefined") {
            window.sessionStorage.removeItem(storageKey);
        }
    }

    const nextMove =
        submitState.kind === "success"
            ? nextMoveFromRoutingHint(submitState.routingHint)
            : nextMoveFromRoutingHint(readinessLane.routingHint);

    return (
        <section className={className}>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 md:p-8">
                    <div className="border-b border-white/8 pb-6">
                        <p className="text-sm font-semibold text-white">
                            Step {step} of 3 — {PRIMARY_LAYER_NAME}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-400">
                            {activeStep.description}
                        </p>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-4">
                        <StatusTile label="Progress" value={`${progress}%`} highlighted />
                        <StatusTile label="Signal build" value={`${signalScore}%`} />
                        <StatusTile label="Signal status" value={signalLabel} />
                        <StatusTile
                            label="Readiness"
                            value={humanizeRoutingHint(readinessLane.routingHint)}
                        />
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                            <span>Scan progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="system-status-bar mt-2 h-2">
                            <span style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    {draftRestored ? (
                        <div className="system-note-success mt-6 rounded-[1.4rem] p-4">
                            <p className="text-sm leading-7 text-slate-200">
                                A saved in-session draft was restored so the first signal did not get lost.
                            </p>
                        </div>
                    ) : null}

                    <form className="mt-8 space-y-8" onSubmit={onSubmit} noValidate>
                        {step === 1 ? (
                            <fieldset className="grid gap-6 md:grid-cols-2">
                                <legend className="sr-only">Identity layer fields</legend>

                                <Field>
                                    <Label htmlFor="fullName">Full name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        placeholder="Jane Smith"
                                        autoComplete="name"
                                        aria-invalid={Boolean(errors.fullName)}
                                    />
                                    <FieldHelper text="Use the real business contact." />
                                    <FieldError message={errors.fullName} />
                                </Field>

                                <Field>
                                    <Label htmlFor="email">Business email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="jane@business.com"
                                        autoComplete="email"
                                        aria-invalid={Boolean(errors.email)}
                                    />
                                    <FieldHelper text="Use the main business email." />
                                    <FieldError message={errors.email} />
                                </Field>

                                <Field>
                                    <Label htmlFor="businessName">Business name</Label>
                                    <Input
                                        id="businessName"
                                        name="businessName"
                                        value={values.businessName}
                                        onChange={handleChange}
                                        placeholder="Smith Family Dental"
                                        autoComplete="organization"
                                        aria-invalid={Boolean(errors.businessName)}
                                    />
                                    <FieldHelper text="Use the real business name." />
                                    <FieldError message={errors.businessName} />
                                </Field>

                                <Field>
                                    <Label htmlFor="websiteUrl">Website URL</Label>
                                    <Input
                                        id="websiteUrl"
                                        name="websiteUrl"
                                        value={values.websiteUrl}
                                        onChange={handleChange}
                                        placeholder="yourbusiness.com"
                                        autoComplete="url"
                                        aria-invalid={Boolean(errors.websiteUrl)}
                                    />
                                    <FieldHelper
                                        text={`Current host read: ${websiteHostname || "waiting for site URL"}`}
                                    />
                                    <FieldError message={errors.websiteUrl} />
                                </Field>

                                <Field>
                                    <Label htmlFor="country">Country</Label>
                                    <Select
                                        id="country"
                                        name="country"
                                        value={values.country}
                                        onChange={handleChange}
                                        aria-invalid={Boolean(errors.country)}
                                    >
                                        {COUNTRY_OPTIONS.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Select>
                                    <FieldHelper text="Choose the main operating country." />
                                    <FieldError message={errors.country} />
                                </Field>

                                <Field>
                                    <Label htmlFor="stateRegion">
                                        {isUnitedStates ? "State" : "Region / Province"}
                                    </Label>
                                    {isUnitedStates ? (
                                        <Select
                                            id="stateRegion"
                                            name="stateRegion"
                                            value={values.stateRegion}
                                            onChange={handleChange}
                                            aria-invalid={Boolean(errors.stateRegion)}
                                        >
                                            <option value="">Select a state</option>
                                            {US_STATES.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Select>
                                    ) : (
                                        <Input
                                            id="stateRegion"
                                            name="stateRegion"
                                            value={values.stateRegion}
                                            onChange={handleChange}
                                            placeholder="Ontario"
                                            autoComplete="address-level1"
                                            aria-invalid={Boolean(errors.stateRegion)}
                                        />
                                    )}
                                    <FieldHelper text="Enter the main state, province, or region." />
                                    <FieldError message={errors.stateRegion} />
                                </Field>

                                <div className="md:col-span-2">
                                    <Field>
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={values.city}
                                            onChange={handleChange}
                                            placeholder="Austin"
                                            autoComplete="address-level2"
                                            aria-invalid={Boolean(errors.city)}
                                        />
                                        <FieldHelper text="Enter the main city tied to the business." />
                                        <FieldError message={errors.city} />
                                    </Field>
                                </div>
                            </fieldset>
                        ) : null}

                        {step === 2 ? (
                            <fieldset className="grid gap-6">
                                <legend className="sr-only">Context layer fields</legend>

                                <Field>
                                    <Label htmlFor="businessType">Business type</Label>
                                    <Select
                                        id="businessType"
                                        name="businessType"
                                        value={values.businessType}
                                        onChange={handleChange}
                                        aria-invalid={Boolean(errors.businessType)}
                                    >
                                        <option value="">Select business type</option>
                                        {businessTypes.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Select>
                                    <FieldHelper text="Choose the closest fit for the business." />
                                    <FieldError message={errors.businessType} />
                                </Field>

                                <Field>
                                    <Label htmlFor="primaryOffer">Primary offer</Label>
                                    <Input
                                        id="primaryOffer"
                                        name="primaryOffer"
                                        value={values.primaryOffer}
                                        onChange={handleChange}
                                        placeholder="High-end family dental care for busy adults and parents"
                                        aria-invalid={Boolean(errors.primaryOffer)}
                                    />
                                    <FieldHelper text="State clearly what the business actually sells." />
                                    <FieldError message={errors.primaryOffer} />
                                </Field>

                                <Field>
                                    <Label htmlFor="audience">Who do you want to reach?</Label>
                                    <Textarea
                                        id="audience"
                                        name="audience"
                                        value={values.audience}
                                        onChange={handleChange}
                                        placeholder="Describe the people or companies you want to reach, what they care about, what they compare, and what makes someone a strong-fit customer."
                                        aria-invalid={Boolean(errors.audience)}
                                    />
                                    <FieldHelper text="The clearer the audience, the cleaner the first read." />
                                    <FieldError message={errors.audience} />
                                </Field>
                            </fieldset>
                        ) : null}

                        {step === 3 ? (
                            <fieldset className="grid gap-6">
                                <legend className="sr-only">Pressure layer fields</legend>

                                <Field>
                                    <Label htmlFor="biggestIssue">What feels most wrong right now?</Label>
                                    <Textarea
                                        id="biggestIssue"
                                        name="biggestIssue"
                                        value={values.biggestIssue}
                                        onChange={handleChange}
                                        placeholder="Explain what feels weak. Are people not trusting the business enough, not understanding the offer fast enough, comparing you away too easily, or failing to take action the way they should?"
                                        rows={8}
                                        aria-invalid={Boolean(errors.biggestIssue)}
                                    />
                                    <FieldHelper text="This is the most important field in the form." />
                                    <FieldError message={errors.biggestIssue} />
                                </Field>

                                <Field>
                                    <Label htmlFor="competitors">
                                        Competitors or alternatives people compare you against
                                    </Label>
                                    <Textarea
                                        id="competitors"
                                        name="competitors"
                                        value={values.competitors}
                                        onChange={handleChange}
                                        placeholder="List competitors, alternatives, or nearby businesses customers may be choosing instead."
                                        rows={4}
                                        aria-invalid={Boolean(errors.competitors)}
                                    />
                                    <FieldHelper text="Optional, but useful if competitive pressure is part of the problem." />
                                    <FieldError message={errors.competitors} />
                                </Field>

                                <Field>
                                    <Label htmlFor="notes">Anything else the system should know?</Label>
                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        value={values.notes}
                                        onChange={handleChange}
                                        placeholder="Add extra context that helps explain the business, the pressure, what has already been tried, or what keeps getting misread."
                                        rows={5}
                                        aria-invalid={Boolean(errors.notes)}
                                    />
                                    <FieldHelper text="Optional extra signal for a sharper first read." />
                                    <FieldError message={errors.notes} />
                                </Field>
                            </fieldset>
                        ) : null}

                        <div className="system-surface rounded-[1.5rem] p-5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                                Readiness lane
                            </p>
                            <h3 className="mt-3 text-xl font-semibold text-white">
                                {readinessLane.title}
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                                {readinessLane.copy}
                            </p>
                            {weakAreas.length > 0 ? (
                                <div className="mt-4 grid gap-2">
                                    {weakAreas.map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap gap-3">
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={handlePreviousStep}
                                        className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                    >
                                        Back
                                    </button>
                                ) : null}

                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                    >
                                        Continue to step {step + 1}
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSubmitting
                                            ? "Submitting Search Presence Scan..."
                                            : "Submit Search Presence Scan"}
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={handleResetDraft}
                                    className="system-button-ghost inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                >
                                    Clear draft
                                </button>
                            </div>

                            <div className="text-sm text-slate-400">
                                Current signal build: {signalScore}%
                            </div>
                        </div>

                        {submitState.kind === "success" ? (
                            <div className="system-note-success rounded-[1.6rem] p-5">
                                <p className="text-sm font-semibold text-white">{submitState.message}</p>

                                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                    <InfoCard
                                        label="Signal quality"
                                        value={`${submitState.signalQuality}%`}
                                    />
                                    <InfoCard
                                        label="Routing hint"
                                        value={humanizeRoutingHint(submitState.routingHint)}
                                    />
                                    <InfoCard
                                        label="Submission state"
                                        value={submitState.duplicate ? "Updated" : "New"}
                                    />
                                </div>

                                <div className="system-surface mt-5 rounded-[1.3rem] p-4">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                                        Strongest next move
                                    </p>
                                    <h4 className="mt-2 text-lg font-semibold text-white">
                                        {nextMove.title}
                                    </h4>
                                    <p className="mt-2 text-sm leading-7 text-slate-300">
                                        {nextMove.copy}
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href={nextMove.href}
                                        className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                    >
                                        {nextMove.cta}
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                    >
                                        Review full system path
                                    </Link>
                                </div>
                            </div>
                        ) : null}

                        {submitState.kind === "error" ? (
                            <div className="system-note-danger rounded-[1.6rem] p-5">
                                <p className="text-sm font-semibold text-white">{submitState.message}</p>
                                {submitState.details.length > 0 ? (
                                    <div className="mt-4 grid gap-2">
                                        {submitState.details.map((detail) => (
                                            <div
                                                key={detail}
                                                className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-rose-100"
                                            >
                                                {detail}
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                    </form>
                </div>

                <aside className="space-y-5">
                    {SIDE_NOTES.map((item, index) => (
                        <InfoPanel
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                            Strongest route after this
                        </p>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            Most businesses should still move into Visibility Blueprint before heavier implementation or recurring command. The first signal exists to make that choice cleaner.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function validateAll(values: FreeCheckFormValues, isUnitedStates: boolean) {
    return {
        ...validateStep(values, 1, isUnitedStates),
        ...validateStep(values, 2, isUnitedStates),
        ...validateStep(values, 3, isUnitedStates),
    };
}

function validateStep(
    values: FreeCheckFormValues,
    step: StepNumber,
    isUnitedStates: boolean,
) {
    const errors: FormErrors = {};

    if (step === 1) {
        if (values.fullName.trim().length < 2) {
            errors.fullName = "Please enter the real business contact name.";
        }
        if (!looksLikeEmail(values.email)) {
            errors.email = "Please enter a valid business email.";
        }
        if (values.businessName.trim().length < 2) {
            errors.businessName = "Please enter the real business name.";
        }
        if (!looksLikeWebsite(values.websiteUrl)) {
            errors.websiteUrl = "Please enter the main business website.";
        }
        if (!values.country.trim()) {
            errors.country = "Please choose the main business country.";
        }
        if (!values.stateRegion.trim()) {
            errors.stateRegion = isUnitedStates
                ? "Please choose the business state."
                : "Please enter the main state, province, or region.";
        }
        if (!values.city.trim()) {
            errors.city = "Please enter the main business city.";
        }
    }

    if (step === 2) {
        if (values.businessType.trim().length < 3) {
            errors.businessType = "Please identify the type of business more clearly.";
        }
        if (values.primaryOffer.trim().length < 12) {
            errors.primaryOffer =
                "Please explain what the business actually sells in clearer language.";
        }
        if (values.audience.trim().length < 35) {
            errors.audience =
                "Please describe who the business wants to reach in more useful detail.";
        }
    }

    if (step === 3) {
        if (values.biggestIssue.trim().length < 50) {
            errors.biggestIssue =
                "Please explain the core pressure in more detail so the first read is strong enough to matter.";
        }
        if (values.competitors.trim().length > 0 && values.competitors.trim().length < 8) {
            errors.competitors = "Please add more useful detail here or leave this field empty.";
        }
        if (values.notes.trim().length > 0 && values.notes.trim().length < 10) {
            errors.notes = "Please add a little more detail here or leave this field empty.";
        }
    }

    return errors;
}

function resolveFirstInvalidStep(errors: FormErrors): StepNumber {
    const identityFields: readonly (keyof FreeCheckFormValues)[] = [
        "fullName",
        "email",
        "businessName",
        "websiteUrl",
        "country",
        "stateRegion",
        "city",
    ];

    const contextFields: readonly (keyof FreeCheckFormValues)[] = [
        "businessType",
        "primaryOffer",
        "audience",
    ];

    if (identityFields.some((field) => errors[field])) return 1;
    if (contextFields.some((field) => errors[field])) return 2;
    return 3;
}

function buildSignalPreview(values: FreeCheckFormValues) {
    let score = 0;

    score += scoreField(values.fullName, 2, 6);
    score += looksLikeEmail(values.email) ? 8 : 0;
    score += scoreField(values.businessName, 2, 8);
    score += looksLikeWebsite(values.websiteUrl) ? 10 : 0;
    score += scoreField(values.country, 2, 5);
    score += scoreField(values.stateRegion, 2, 5);
    score += scoreField(values.city, 2, 5);
    score += scoreField(values.businessType, 3, 8);
    score += scoreField(values.primaryOffer, 12, 14);
    score += scoreField(values.audience, 35, 16);
    score += scoreField(values.biggestIssue, 50, 18);
    score += optionalScore(values.competitors, 10, 3);
    score += optionalScore(values.notes, 12, 2);

    if (extractHostname(values.websiteUrl)) score += 2;
    if (!looksDisposable(values.email)) score += 2;
    if (hasSpecificLanguage(values.primaryOffer)) score += 2;
    if (hasSpecificLanguage(values.audience)) score += 2;
    if (hasSpecificLanguage(values.biggestIssue)) score += 2;

    return Math.min(100, score);
}

function buildReadinessLane(values: FreeCheckFormValues, signalScore: number) {
    const pressureText = `${values.biggestIssue} ${values.notes} ${values.audience}`.toLowerCase();

    if (
        signalScore >= 88 &&
        containsAny(pressureText, [
            "monthly",
            "ongoing",
            "maintain",
            "monitor",
            "monitoring",
            "continuity",
            "recurring",
        ])
    ) {
        return {
            routingHint: "command-review" as RoutingHint,
            title: "Command-readiness appears later, not first.",
            copy:
                "The business may eventually benefit from recurring continuity, but the strongest use of this layer is still creating the first serious signal cleanly.",
        };
    }

    if (
        signalScore >= 80 &&
        containsAny(pressureText, [
            "conversion",
            "book",
            "bookings",
            "calls",
            "website",
            "messaging",
            "offer",
            "clarity",
            "trust",
            "positioning",
        ])
    ) {
        return {
            routingHint: "infrastructure-review" as RoutingHint,
            title: "Infrastructure-relevant pressure is already visible.",
            copy:
                "The signal suggests the business may eventually need concentrated strengthening, but the next clean step is still usually a deeper explanation layer first.",
        };
    }

    if (signalScore >= 62) {
        return {
            routingHint: "blueprint-candidate" as RoutingHint,
            title: "Visibility Blueprint looks like the most likely next layer.",
            copy:
                "The intake is getting strong enough that a deeper strategic explanation layer may be justified after the first signal is captured.",
        };
    }

    return {
        routingHint: "scan-only" as RoutingHint,
        title: "The intake still needs stronger first-signal detail.",
        copy:
            "Right now the strongest move is still improving the first read so the platform is not forced to reason from thin input.",
    };
}

function nextMoveFromRoutingHint(routingHint: RoutingHint) {
    if (routingHint === "command-review") {
        return {
            title: "Review Presence Command after the path is clearer",
            copy:
                "Recurring continuity becomes valuable only after the business is already clear enough to use ongoing direction well.",
            href: "/pricing/monthly-partner",
            cta: "View Presence Command",
        };
    }

    if (routingHint === "infrastructure-review") {
        return {
            title: "Visibility Blueprint is still the strongest next move",
            copy:
                "Even when stronger implementation pressure may be needed later, the cleaner next move is usually deeper explanation before concentrated strengthening.",
            href: "/pricing/full-diagnosis",
            cta: "View Visibility Blueprint",
        };
    }

    if (routingHint === "blueprint-candidate") {
        return {
            title: "Visibility Blueprint is the likely next layer",
            copy:
                "The first signal looks strong enough that the business may now benefit from a deeper strategic explanation of what is actually weakening response.",
            href: "/pricing/full-diagnosis",
            cta: "View Visibility Blueprint",
        };
    }

    return {
        title: "Review the full system path before going deeper",
        copy:
            "The strongest move is usually to understand the system sequence clearly before assuming the business should jump into a heavier layer.",
        href: "/pricing",
        cta: "Review System Layers",
    };
}

function sanitizeDraft(value: Partial<FreeCheckFormValues>) {
    return {
        fullName: safeDraftValue(value.fullName),
        email: safeDraftValue(value.email),
        businessName: safeDraftValue(value.businessName),
        websiteUrl: safeDraftValue(value.websiteUrl),
        country: safeDraftValue(value.country) || INITIAL_VALUES.country,
        stateRegion: safeDraftValue(value.stateRegion),
        city: safeDraftValue(value.city),
        businessType: safeDraftValue(value.businessType),
        primaryOffer: safeDraftValue(value.primaryOffer),
        audience: safeDraftValue(value.audience),
        biggestIssue: safeDraftValue(value.biggestIssue),
        competitors: safeDraftValue(value.competitors),
        notes: safeDraftValue(value.notes),
    } satisfies FreeCheckFormValues;
}

function hasMeaningfulDraft(value: FreeCheckFormValues) {
    return Object.values(value).some((item) => item.trim().length > 0);
}

function safeDraftValue(value: unknown) {
    return typeof value === "string" ? value : "";
}

function scrollToTop() {
    if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function looksLikeEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function looksDisposable(value: string) {
    const domain = value.trim().toLowerCase().split("@")[1] || "";
    return [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "icloud.com",
        "protonmail.com",
        "proton.me",
    ].includes(domain);
}

function looksLikeWebsite(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return false;

    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
        const parsed = new URL(normalized);
        return Boolean(parsed.hostname && parsed.hostname.includes("."));
    } catch {
        return false;
    }
}

function normalizeWebsite(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function extractHostname(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return "";

    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
        return new URL(normalized).hostname.replace(/^www\./i, "");
    } catch {
        return "";
    }
}

function hasSpecificLanguage(value: string) {
    return [
        /\bpatients?\b/i,
        /\bclients?\b/i,
        /\bcustomers?\b/i,
        /\bleads?\b/i,
        /\bbook(ing)?\b/i,
        /\bappointments?\b/i,
        /\btrust\b/i,
        /\bclarity\b/i,
        /\bpositioning\b/i,
        /\bconversion\b/i,
    ].some((pattern) => pattern.test(value));
}

function containsAny(value: string, needles: string[]) {
    return needles.some((needle) => value.includes(needle));
}

function scoreField(value: string, minLength: number, maxPoints: number) {
    const length = value.trim().length;
    if (length < minLength) return 0;
    if (length >= minLength * 4) return maxPoints;
    return Math.round((length / (minLength * 4)) * maxPoints);
}

function optionalScore(value: string, minLength: number, maxPoints: number) {
    const length = value.trim().length;
    if (!length) return 0;
    if (length < minLength) return Math.round(maxPoints * 0.34);
    if (length >= minLength * 4) return maxPoints;
    return Math.round((length / (minLength * 4)) * maxPoints);
}

function humanizeRoutingHint(value: RoutingHint) {
    if (value === "scan-only") return "Scan only";
    if (value === "blueprint-candidate") return "Blueprint candidate";
    if (value === "infrastructure-review") return "Infrastructure review";
    return "Command review";
}

function Field({ children }: { children: ReactNode }) {
    return <div className="space-y-2">{children}</div>;
}

function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-slate-200 ${props.className ?? ""}`}
        />
    );
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`system-field w-full rounded-2xl px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 ${props.className ?? ""}`}
        />
    );
}

function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`system-field w-full rounded-2xl px-4 py-3 text-sm text-white outline-none transition ${props.className ?? ""}`}
        />
    );
}

function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            rows={props.rows ?? 5}
            className={`system-field w-full rounded-2xl px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 ${props.className ?? ""}`}
        />
    );
}

function FieldHelper({ text }: { text: string }) {
    return <p className="system-helper text-sm">{text}</p>;
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="system-error text-sm">{message}</p>;
}

function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="system-surface rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                {label}
            </p>
            <p className="mt-2 text-sm font-semibold text-white">{value}</p>
        </div>
    );
}

function StatusTile({
    label,
    value,
    highlighted = false,
}: {
    label: string;
    value: string;
    highlighted?: boolean;
}) {
    return (
        <div
            className={
                highlighted
                    ? "system-chip rounded-[1.25rem] px-4 py-4"
                    : "system-surface rounded-[1.25rem] px-4 py-4"
            }
        >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                {label}
            </div>
            <div className="mt-2 text-sm font-semibold text-white">{value}</div>
        </div>
    );
}

function InfoPanel({
    title,
    copy,
    highlighted = false,
}: {
    title: string;
    copy: string;
    highlighted?: boolean;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.6rem] p-5"
                    : "system-surface rounded-[1.6rem] p-5"
            }
        >
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}