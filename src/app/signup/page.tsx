import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sign up | Cendorq",
  description: "Create a Cendorq account for workspace access, or start the Free Scan when Cendorq needs to understand the business.",
  path: "/signup",
  noIndex: true,
});

const STEPS = [
  {
    title: "Create account",
    copy: "Use account access to create or return to a Cendorq workspace.",
  },
  {
    title: "Start Free Scan",
    copy: "Use Free Scan when Cendorq needs business facts before showing readiness results.",
  },
  {
    title: "Return later",
    copy: "Use the same email or a connected provider to return to the workspace.",
  },
] as const;

const PROVIDERS = ["Google", "Microsoft", "Apple", "LinkedIn", "Facebook"] as const;

export default function SignupPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7fcff] text-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,rgba(125,211,252,0.28),transparent_32%),linear-gradient(180deg,#ffffff,#f7fcff_54%,#edf9ff)]" aria-hidden="true" />
      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
        <div>
          <p className="inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 shadow-sm">Sign up</p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.078em]">Create the account. Start the scan when the business needs results.</h1>
          <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">Account access and Free Scan are separate. An account gets the customer into a workspace. Free Scan gives Cendorq the business context needed to produce readiness results.</p>
          <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] transition hover:bg-slate-800">Start Free Scan</Link>
            <Link href="/login" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-500">Sign in</Link>
          </div>
        </div>

        <div className="rounded-[2.75rem] border border-white/80 bg-white/76 p-3 shadow-[0_36px_130px_rgba(15,23,42,0.13)] backdrop-blur-2xl">
          <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Account options</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">Choose account access.</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">Use email access now, or use a connected provider when provider access is configured.</p>
            <div className="mt-7 grid gap-3">
              <Link href="/login" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-7 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-50">Use email access</Link>
              {PROVIDERS.map((provider) => (
                <Link key={provider} href={`/api/auth/provider/${provider.toLowerCase()}`} className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-slate-500">Continue with {provider}</Link>
              ))}
            </div>
            <p className="mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-7 text-slate-600">A first-time account can open a workspace. Readiness results still require Free Scan business intake.</p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-3">
        {STEPS.map((step) => (
          <article key={step.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_16px_55px_rgba(15,23,42,0.055)]">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">{step.title}</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{step.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
