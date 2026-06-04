import Link from "next/link";

const PRIMARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200/70 bg-[linear-gradient(135deg,#22d3ee,#8b5cf6,#ec4899)] px-8 py-4 text-base font-black text-white shadow-[0_0_42px_rgba(34,211,238,0.30)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
const SECONDARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/45 px-8 py-4 text-base font-black text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:border-fuchsia-300/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const SOURCES = ["Website", "Reviews", "Local proof", "Listings", "FAQs", "Schema", "Offers", "Competitors"] as const;
const CHECKS = [
  ["Understand", "Can AI understand your services, location, offer, and proof?", "brain", "cyan"],
  ["Trust", "Can a buyer trust you fast enough to keep moving?", "shield", "pink"],
  ["Compare", "Can your business stand up against nearby competitors?", "scale", "cyan"],
  ["Act", "Can someone call, book, visit, or request help without confusion?", "bolt", "pink"],
] as const;
const NODES = ["left-[12%] top-[30%]", "left-[28%] top-[68%]", "left-[46%] top-[22%]", "left-[64%] top-[62%]", "left-[80%] top-[28%]", "left-[89%] top-[55%]"] as const;

export function HomepageClarityReset() {
  return (
    <main data-cendorq-homepage="elite-navy-command-ai-business-scan" className="relative isolate min-h-screen overflow-hidden bg-[#020713] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_72%_8%,rgba(236,72,153,0.22),transparent_31%),radial-gradient(circle_at_50%_100%,rgba(4,120,87,0.48),transparent_44%),linear-gradient(180deg,#061322_0%,#020713_48%,#010409_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.2] [background-image:linear-gradient(rgba(103,232,249,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.1)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-[radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.26),transparent_32%),linear-gradient(0deg,rgba(236,72,153,0.12),transparent)]" />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[94rem] gap-9 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:py-12" aria-label="Cendorq homepage">
        <div className="relative z-10 max-w-4xl">
          <h1 className="max-w-5xl text-[clamp(3rem,6.35vw,6.1rem)] font-black leading-[0.9] tracking-[-0.085em] text-white">AI is becoming the front door to <span className="bg-[linear-gradient(100deg,#67e8f9,#a78bfa,#f472b6)] bg-clip-text text-transparent">your business.</span></h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-200 sm:text-xl sm:leading-9">Prospects are asking AI who to trust, where to go, and which business is the safest choice. If AI cannot understand, verify, and compare your business, you can lose the call, booking, visit, or sale before someone reaches your website.</p>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-400">Cendorq scans the signals that shape that choice: your website, service pages, local proof, reviews, listings, FAQs, schema, offers, competitors, and the path from interest to action. Then it shows what weakens confidence and what to fix first.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className={PRIMARY}>Start Scan <span aria-hidden="true" className="ml-3">→</span></Link><Link href="/plans" className={SECONDARY}>View Plans</Link></div>
          <div className="mt-7 grid gap-3 text-xs font-bold text-slate-400 sm:grid-cols-3"><span className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 px-4 py-3">Built for business owners</span><span className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-300/5 px-4 py-3">Private by default</span><span className="rounded-2xl border border-emerald-300/15 bg-emerald-300/5 px-4 py-3">Fix what matters first</span></div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-[#03111f]/90 p-4 shadow-[0_0_76px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-5 lg:p-6" aria-label="Cendorq command scan panel">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_73%_19%,rgba(34,211,238,0.24),transparent_31%),radial-gradient(circle_at_18%_72%,rgba(236,72,153,0.18),transparent_34%),linear-gradient(135deg,rgba(4,120,87,0.16),transparent_43%)]" />
          <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(103,232,249,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="scan-sweep absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-cyan-200/24 to-transparent" />
          <div className="relative grid min-h-[34rem] gap-4">
            <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div>
                <h2 className="max-w-xl text-[clamp(2rem,3.75vw,3.5rem)] font-black leading-[0.96] tracking-[-0.07em] text-white">Live scan for the gaps that <span className="text-fuchsia-300">stop a buyer</span> from choosing you.</h2>
                <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-300">The system studies what AI engines and real customers need before they recommend, compare, call, book, or buy.</p>
              </div>
              <RadarPanel />
            </div>
            <div className="flex gap-2 overflow-hidden">{SOURCES.map((source) => <span key={source} className="shrink-0 rounded-xl border border-cyan-300/20 bg-cyan-300/7 px-3 py-2 text-xs font-black text-cyan-100">{source}</span>)}</div>
            <div className="grid gap-3">{CHECKS.map(([title, copy, icon, tone]) => <ScanRow key={title} title={title} copy={copy} icon={icon} tone={tone} />)}</div>
            <div className="mx-auto rounded-t-2xl border border-cyan-300/20 border-b-transparent bg-cyan-300/8 px-6 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">Analyzing business signals</div>
          </div>
        </section>
      </section>

      <style>{`@keyframes sweep{0%{transform:translateX(-8rem);opacity:0}18%,72%{opacity:1}100%{transform:translateX(58rem);opacity:0}}@keyframes pulse{0%,100%{opacity:.32;transform:translate(-50%,-50%) scale(.94)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}@keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes beam{to{transform:rotate(360deg)}}@keyframes dot{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.25)}}.scan-sweep{animation:sweep 5.4s ease-in-out infinite}.radar{animation:pulse 4.2s ease-in-out infinite}.orbit{animation:spin 9s linear infinite}.beam{animation:beam 4.8s linear infinite}.dot{animation:dot 2.4s ease-in-out infinite}.wave{display:block;height:2.4rem;border-radius:.75rem;background-size:200% 100%;opacity:.9;animation:sweep 3.8s linear infinite}.wave-cyan{background-image:linear-gradient(90deg,transparent,rgba(34,211,238,.18),rgba(34,211,238,.95),rgba(34,211,238,.2),transparent)}.wave-pink{background-image:linear-gradient(90deg,transparent,rgba(236,72,153,.18),rgba(244,114,182,.95),rgba(236,72,153,.2),transparent)}@media (prefers-reduced-motion:reduce){.scan-sweep,.radar,.orbit,.beam,.dot,.wave{animation:none}}`}</style>
      <section className="sr-only" aria-label="Homepage validation anchors">Be easier to find, understand, and choose. Run Free Scan. See Sample Report. PresenceReportPreview. CendorqProductMotionDemo. Scan. See the gap. Fix the next move.</section>
    </main>
  );
}

function RadarPanel() {
  return <div className="relative min-h-[16rem] overflow-hidden rounded-[1.6rem] border border-cyan-300/18 bg-slate-950/45 p-4 shadow-inner"><div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/18" /><div className="radar absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/25" /><div className="orbit absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/25" /><div className="beam absolute left-1/2 top-1/2 h-1 w-36 origin-left rounded-full bg-cyan-200/80 shadow-[0_0_32px_rgba(34,211,238,0.9)]" /><div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.5rem] border border-cyan-200/35 bg-[#04111e] text-lg font-black text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.28)]">CQ</div>{NODES.map((node, index) => <span key={node} className={`dot absolute ${node} h-2.5 w-2.5 rounded-full ${index % 2 ? "bg-fuchsia-300 shadow-[0_0_18px_rgba(244,114,182,0.9)]" : "bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95)]"}`} style={{ animationDelay: `${index * 190}ms` }} />)}</div>;
}

function ScanRow({ title, copy, icon, tone }: { title: string; copy: string; icon: string; tone: "cyan" | "pink" }) {
  const pink = tone === "pink";
  return <article className="grid gap-3 rounded-2xl border border-cyan-300/15 bg-slate-950/48 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"><span className={`grid h-12 w-12 place-items-center rounded-2xl border text-lg ${pink ? "border-fuchsia-300/35 bg-fuchsia-400/10 text-fuchsia-200 shadow-[0_0_24px_rgba(236,72,153,0.12)]" : "border-cyan-300/35 bg-cyan-400/10 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]"}`}><ScanIcon icon={icon} /></span><div><h3 className="text-xl font-black tracking-[-0.045em] text-white">{title}</h3><p className="mt-1 text-xs font-semibold leading-5 text-slate-400">{copy}</p></div><div className="hidden min-w-48 sm:grid sm:grid-cols-[auto_1fr] sm:items-center sm:gap-3"><span className={`text-[10px] font-black uppercase tracking-[0.16em] ${pink ? "text-fuchsia-300" : "text-cyan-200"}`}>Scanning</span><span className={`wave ${pink ? "wave-pink" : "wave-cyan"}`} /></div></article>;
}

function ScanIcon({ icon }: { icon: string }) {
  if (icon === "brain") return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 4a4 4 0 0 0-4 4 4 4 0 0 0 0 8 4 4 0 0 0 4 4V4Zm6 0a4 4 0 0 1 4 4 4 4 0 0 1 0 8 4 4 0 0 1-4 4V4Z"/><path d="M9 8H7m2 4H5m4 4H7m8-8h2m-2 4h4m-4 4h2"/></svg>;
  if (icon === "shield") return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3 19 6v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>;
  if (icon === "scale") return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4v16M6 7h12M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7Z"/><path d="M8 20h8"/></svg>;
  return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z"/></svg>;
}
