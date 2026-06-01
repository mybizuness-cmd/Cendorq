import Link from "next/link";
import { MailProviderLinks } from "@/components/auth/mail-provider-links";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const metadata = buildMetadata({
  title: "Confirm your email | Cendorq",
  description: "Confirm your Cendorq email address and continue through the correct customer access path.",
  path: "/verify-email",
  noIndex: true,
});

const CONFIRMATION_STEPS = [
  "Open the inbox for the email you used.",
  "Find the message from Cendorq Support.",
  "Confirm once and continue through the customer access path.",
] as const;

const VERIFY_RULES = [
  "The same email can return to a Free Scan, plan, report, billing, or support path.",
  "New customers start with the Free Scan before account access exists.",
  "If Cendorq cannot connect the verified email to an active path, the next step is the Free Scan.",
  "If the link expires or was already used, request a fresh secure access link.",
] as const;

const NEXT_PATHS = [
  { title: "Request a new link", href: "/login", copy: "Use Customer Access when the secure link expired, was already used, or did not arrive." },
  { title: "Start Free Scan", href: "/free-check?access=free-scan-required&method=verify-email", copy: "Use Free Scan when this is the first time Cendorq is checking the business." },
] as const;

export default function VerifyEmailPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <VerifyAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Email verification entry">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Secure email verification</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">Check your email to continue.</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">Use the secure Cendorq link to verify the inbox. Known customers continue to the right account path; new visitors start with the Free Scan so Cendorq has real business context.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Request a new link</Link>
            <Link href="/free-check?access=free-scan-required&method=verify-email" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Start Free Scan</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Confirm once.</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">The message should come from Cendorq Support. Use the button in the email. If the link was already used or expired, request a new one from customer access.</p>
          <div className="mt-6 grid gap-3">
            {CONFIRMATION_STEPS.map((step, index) => (
              <article key={step} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/42 p-4 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100 bg-white text-sm font-black text-slate-950">{index + 1}</div>
                <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{step}</p>
              </article>
            ))}
          </div>
          <MailProviderLinks className="mt-6" />
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Verification next paths">
        <div className="grid gap-3 md:grid-cols-2">
          {NEXT_PATHS.map((item, index) => (
            <Link key={item.href} href={item.href} className={index === 0 ? "rounded-[1.55rem] border border-cyan-200 bg-cyan-50/75 p-5 shadow-[0_14px_42px_rgba(14,165,233,0.06)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2" : "rounded-[1.55rem] border border-white/80 bg-white/82 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2"}>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{item.title}</h2>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Verification safety">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">One inbox. One verified email. One correct next step.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">Verification should continue the correct path, not expose private records or create a blank account.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {VERIFY_RULES.map((rule) => <p key={rule} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/40 p-3 text-xs font-semibold leading-5 text-slate-700">{rule}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Verify email guardrails">
        Confirm your email | Cendorq. Check your email to continue. Use the secure Cendorq link to verify the inbox. Request a new link. Start Free Scan. Confirm once. Find the message from Cendorq Support. One inbox. One verified email. One correct next step. The same email can return to a Free Scan, plan, report, billing, or support path. New customers start with the Free Scan before account access exists. focus:outline-none. focus-visible:ring-2. {CONFIRMATION_STEPS.join(" ")} {VERIFY_RULES.join(" ")}
      </section>
    </main>
  );
}

function VerifyAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
