import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Confirm your email | Cendorq",
  description: "Confirm your Cendorq email address before opening your dashboard and Free Scan results.",
  path: "/verify-email",
  noIndex: true,
});

const CONFIRMATION_STEPS = [
  "Check the inbox for the address you used to sign up.",
  "Open the email from Cendorq Support <support@cendorq.com>.",
  "Select the confirmation link to unlock your dashboard and continue the Free Scan.",
] as const;

export default function VerifyEmailPage() {
  return (
    <main className="relative mx-auto max-w-5xl overflow-hidden px-4 py-10 text-white sm:px-6 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.09),transparent_32%)]" />
      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Email confirmation required</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Confirm your email before entering your Cendorq dashboard.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          This protects your Free Scan, future report results, billing access, and saved business history. Your welcome email is sent one time after verified account creation.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CONFIRMATION_STEPS.map((step, index) => (
            <article key={step} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">{index + 1}</div>
              <p className="mt-4 text-sm leading-7 text-slate-200">{step}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:flex sm:items-center">
          <Link href="/free-check" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Continue to Free Scan after confirmation
          </Link>
          <Link href="/signup" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
            Use a different email
          </Link>
        </div>

        <p className="mt-6 text-xs leading-6 text-slate-400">
          If you do not see the email, check spam or promotions. Future transactional messages use Cendorq Support from support@cendorq.com with authenticated sending requirements.
        </p>
      </section>
    </main>
  );
}
