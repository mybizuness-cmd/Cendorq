import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata = buildMetadata({
  title: "Cendorq | Market Command Intelligence",
  description:
    "Cendorq helps a business become easier to find, understand, trust, and choose. Start with the Free Scan, then move through Deep Review, Build Fix, and Ongoing Control only when the next command is justified.",
  path: "/",
  keywords: [
    "cendorq",
    "market command intelligence",
    "free business scan",
    "AI search visibility",
    "business trust scan",
    "customer choice intelligence",
    "business clarity scan",
  ],
  image: { alt: "Cendorq Market Command Intelligence." },
});

const PATH = [
  { label: "Scan", href: "/free-check", detail: "First signal", price: "$0" },
  { label: "Diagnose", href: "/plans/deep-review", detail: "Cause-level proof", price: "$497" },
  { label: "Fix", href: "/plans/build-fix", detail: "Scoped improvement", price: "$1,497" },
  { label: "Control", href: "/plans/ongoing-control", detail: "Monthly watch", price: "$597/mo" },
] as const;

const PROOF = ["Findability", "Clarity", "Trust", "Choice", "Action"] as const;

export default function HomePage() {
  return (
    <main data-cendorq-homepage="market-command-home-v2" className="min-h-screen overflow-hidden bg-[#fbfbf8] text-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-5 py-14 text-center sm:px-8 lg:py-20">
        <p className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
          Cendorq Market Command Intelligence
        </p>

        <h1 className="mt-8 max-w-5xl text-[clamp(3.6rem,9vw,8.4rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-slate-950">
          Become easier to find, trust, and choose.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          Cendorq reads the public market path around your business before customers decide. Start with a Free Scan. Move deeper only when the next command is clear.
        </p>

        <div className="mt-10 w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-2 shadow-[0_30px_100px_rgba(15,23,42,0.10)]">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="px-5 py-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">First command</p>
              <p className="mt-1 text-base font-semibold text-slate-950">Run the Free Scan before buying the bigger fix.</p>
            </div>
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-[1.45rem] bg-slate-950 px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
              Start Free Scan
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-500">
          {PROOF.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-4 py-2">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8" aria-label="How Cendorq works">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Simple path</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">
                Scan first. Then decide what depth is worth it.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                No cluttered audit theater. No fake certainty. Cendorq separates the first signal from deeper diagnosis, implementation, and ongoing control.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/plans" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                  Review Plans
                </Link>
                <Link href="/connect" className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-500 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                  Connect with Cendorq
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {PATH.map((stage) => (
                <Link key={stage.href} href={stage.href} className="group rounded-[1.75rem] border border-slate-200 bg-[#fbfbf8] p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{stage.detail}</p>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">{stage.price}</span>
                  </div>
                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{stage.label}</h3>
                  <p className="mt-4 text-sm font-semibold text-slate-500 transition group-hover:text-slate-950">Open {stage.label} -&gt;</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Cendorq homepage verification">
        Cendorq Market Command Intelligence homepage replacement. Apple-level trust and authority. Google-level simplicity. ChatGPT-level immediate action. Free Scan. Deep Review. Build Fix. Ongoing Control. Scan. Diagnose. Fix. Control. Start Free Scan. Review Plans.
      </section>
    </main>
  );
}
