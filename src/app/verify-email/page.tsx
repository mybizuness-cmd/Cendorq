import Link from "next/link";
import { MailProviderLinks } from "@/components/auth/mail-provider-links";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const metadata = buildMetadata({ title: "Confirm your email | Cendorq", description: "Confirm your Cendorq email address and continue to your dashboard.", path: "/verify-email", noIndex: true });

const CONFIRMATION_STEPS = ["Open the inbox for the email you used.", "Find the message from Cendorq Support.", "Confirm once and continue to your dashboard."] as const;
const VERIFY_RULES = ["The same email can create or return to a workspace.", "New customers can open the dashboard before running a Free Scan.", "Free Scan, billing, support, and reports stay connected to the same workspace.", "If the link expires or was already used, request a fresh secure access link."] as const;

export default function VerifyEmailPage() {
  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <h1 className={`max-w-5xl ${CENDORQ_EXPERIENCE_SYSTEM.pageHeadline}`}>Check your email to continue.</h1>
            <p className={`mt-6 max-w-3xl ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>Use the secure Cendorq link to create or return to your workspace. After confirmation, the dashboard opens first, even if you have not run a Free Scan yet.</p>
            <div className={`mt-8 ${CENDORQ_EXPERIENCE_SYSTEM.mobileActionRow}`}>
              <Link href="/login" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Request a new link</Link>
              <Link href="/dashboard" className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Open dashboard</Link>
            </div>
          </div>

          <div className={CENDORQ_EXPERIENCE_SYSTEM.glassPanel}>
            <div className="rounded-[1.85rem] border border-cyan-100 bg-white p-5 sm:rounded-[2.35rem] sm:p-8">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Confirm once.</h2>
              <p className={`mt-5 ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>The message should come from Cendorq Support. Use the button in the email. If the link was already used or expired, request a new one from the login page.</p>
              <div className="mt-7 grid gap-3">
                {CONFIRMATION_STEPS.map((step, index) => (
                  <article key={step} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100 bg-white text-sm font-bold text-slate-950">{index + 1}</div>
                    <p className={`mt-3 ${CENDORQ_EXPERIENCE_SYSTEM.supportText}`}>{step}</p>
                  </article>
                ))}
              </div>
              <MailProviderLinks className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Verification safety">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/82 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
          <h2 className={`max-w-5xl ${CENDORQ_EXPERIENCE_SYSTEM.sectionHeadline}`}>One inbox. One workspace. One clear next step.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {VERIFY_RULES.map((rule) => <p key={rule} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>)}
          </div>
        </div>
      </section>
    </main>
  );
}
