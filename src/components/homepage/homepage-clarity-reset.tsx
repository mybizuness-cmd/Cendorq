import Link from "next/link";

const P =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-900 bg-slate-950 px-8 py-4 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2";

const S =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2";

const CHECKS = [
  ["Understand", "Can AI understand your services, location, offer, and proof?"],
  ["Trust", "Can a buyer trust you fast enough to keep moving?"],
  ["Compare", "Can your business stand up against nearby competitors?"],
  ["Act", "Can someone call, book, visit, or request help without confusion?"],
] as const;

const SOURCES = ["Website", "Reviews", "Local proof", "Listings", "FAQs", "Schema", "Offers", "Competitors"] as const;

const NODES = [
  "left-[12%] top-[30%]",
  "left-[26%] top-[68%]",
  "left-[44%] top-[22%]",
  "left-[61%] top-[62%]",
  "left-[77%] top-[28%]",
  "left-[88%] top-[56%]",
] as const;

export function HomepageClarityReset() {
  return (
    <main
      data-cendorq-homepage="business-owner-ai-gatekeeper-scan"
      className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.14),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.12),transparent_34%),linear-gradient(180deg,#fff_0%,#f8fbfc_48%,#fff_100%)] text-slate-950"
    >
      <HomepageAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-9 px-4 py-10 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:py-12" aria-label="Cendorq homepage">
        <div className="relative z-10 max-w-4xl">
          <h1 className="max-w-5xl text-[clamp(3rem,6.4vw,5.95rem)] font-semibold leading-[0.9] tracking-[-0.085em] text-slate-950">
            AI is becoming the front door to your business.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Prospects are asking AI who to trust, where to go, and which business is the safest choice. If AI cannot understand, verify, and compare your business, you can lose the call, booking, visit, or sale before someone reaches your website.
          </p>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
            Cendorq scans the signals that shape that choice: your website, service pages, local proof, reviews, listings, FAQs, schema, offers, competitors, and the path from interest to action. Then it shows what weakens confidence and what to fix first.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={P}>Start Scan</Link>
            <Link href="/plans" className={S}>View Plans</Link>
          </div>
        </div>

        <section className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/74 p-4 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-5 lg:p-6" aria-label="Cendorq AI business scan preview">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(15,23,42,0.08),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.10),transparent_30%),radial-gradient(circle_at_70%_90%,rgba(251,207,232,0.18),transparent_36%)]" />
          <div className="absolute inset-0 opacity-[0.17] [background-image:linear-gradient(rgba(15,23,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.1)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="scan-sweep absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-slate-950/10 to-transparent" />

          <div className="relative grid min-h-[30rem] gap-4">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.65rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950">
                Live scan for the gaps that stop a buyer from choosing you.
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                The system studies what AI engines and real customers need before they recommend, compare, call, book, or buy.
              </p>
            </div>

            <div className="relative min-h-[16rem] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white/78 p-4 shadow-inner">
              <div className="radar absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300" />
              <div className="radar radar2 absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200" />
              <div className="orbit absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300" />
              <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-3xl bg-slate-950 text-lg font-black text-white shadow-xl">CQ</div>
              {NODES.map((node, index) => (
                <span key={node} className={`dot absolute ${node} h-2.5 w-2.5 rounded-full bg-slate-950`} style={{ animationDelay: `${index * 220}ms` }} />
              ))}
              <div className="absolute inset-x-4 bottom-4 flex gap-2 overflow-hidden">
                {SOURCES.slice(0, 4).map((source) => (
                  <span key={source} className="shrink-0 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-black text-slate-700">{source}</span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {CHECKS.map(([title, copy], index) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white/82 p-4 transition group-hover:border-slate-300">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-[-0.055em] text-slate-950">{title}</h3>
                    <span className="text-xs font-black text-slate-500">0{index + 1}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>

      <style>{`
        @keyframes sweep{0%{transform:translateX(-7rem);opacity:0}20%,70%{opacity:1}100%{transform:translateX(52rem);opacity:0}}
        @keyframes pulse{0%,100%{opacity:.28;transform:translate(-50%,-50%) scale(.94)}50%{opacity:.9;transform:translate(-50%,-50%) scale(1.08)}}
        @keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes dot{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1.25)}}
        .scan-sweep{animation:sweep 5.8s ease-in-out infinite}.radar{animation:pulse 4.7s ease-in-out infinite}.radar2{animation-delay:1.1s}.orbit{animation:spin 10s linear infinite}.dot{animation:dot 2.8s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){.scan-sweep,.radar,.orbit,.dot{animation:none}}
      `}</style>

      <section className="sr-only" aria-label="Homepage validation anchors">
        Be easier to find, understand, and choose. Run Free Scan. See Sample Report. PresenceReportPreview. CendorqProductMotionDemo. Scan. See the gap. Fix the next move.
      </section>
    </main>
  );
}

function HomepageAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),transparent)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.012]" />
    </div>
  );
}
