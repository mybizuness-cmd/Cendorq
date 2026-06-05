import Link from "next/link";

const SIGNALS = ["Website", "Reviews", "Listings", "FAQs", "Schema", "Offers", "Competitors"] as const;
const STEPS = [
  ["01", "Scan", "Collect the public signals buyers and AI systems can already read."],
  ["02", "Map", "Connect services, location, proof, offers, and missing context."],
  ["03", "Score", "Separate strong signals from hesitation points."],
  ["04", "Repair", "Show the next move before deeper work or wasted spend."],
] as const;
const REPAIRS = [
  ["Understand", "91", "Answer-ready service and location clarity.", "cyan"],
  ["Trust", "58", "Proof is still thin for high-intent buyers.", "red"],
  ["Act", "52", "The request path creates extra hesitation.", "red"],
] as const;

export function CendorqProductMotionCinema() {
  return (
    <section data-cendorq-motion-cinema="true" className="relative isolate overflow-hidden bg-[#eef8ff] px-4 py-14 text-slate-950 sm:px-6 lg:px-8 lg:py-20" aria-label="Cendorq native product motion preview">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_10%,rgba(186,230,253,.9),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(219,234,254,.86),transparent_35%),linear-gradient(180deg,#fbfeff_0%,#eaf8ff_52%,#f7fbff_100%)]" />
      <div className="cinema-orb absolute -left-24 top-10 -z-10 h-96 w-96 rounded-full bg-cyan-200/45 blur-[92px]" />
      <div className="cinema-orb cinema-orb-delay absolute -right-28 top-28 -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-200/45 blur-[110px]" />

      <div className="mx-auto grid max-w-[100rem] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-cyan-100 bg-white/78 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-700 shadow-[0_12px_34px_rgba(14,165,233,.1)]">Native product motion</p>
          <h2 className="mt-5 text-[clamp(2.45rem,8vw,5.25rem)] font-black leading-[.94] tracking-[-.078em] text-slate-950">A live scan that feels premium before the report is even ready.</h2>
          <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">Cendorq turns scattered public signals into a calm command flow: what customers see, what AI may miss, what weakens trust, and what to repair first.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_55%,#a78bfa)] px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_54px_rgba(14,165,233,.22),inset_0_1px_0_rgba(255,255,255,.86)] transition hover:-translate-y-0.5">Run Free Scan</Link>
            <Link href="/plans" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-cyan-100 bg-white/72 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5">View Plans</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#061122] p-3 shadow-[0_30px_90px_rgba(15,23,42,.24),0_0_0_1px_rgba(14,165,233,.16)] sm:p-4 lg:p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(56,189,248,.26),transparent_35%),radial-gradient(circle_at_24%_74%,rgba(129,140,248,.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,.055),transparent_35%)]" />
          <div className="cinema-sweep absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-transparent via-cyan-200/22 to-transparent" />

          <div className="relative grid gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cyan-300/18 bg-white/[.035] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.24em] text-cyan-200">Cendorq live scan</p>
                <p className="mt-1 text-sm font-black text-white sm:text-base">AI readiness command surface</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-300/24 bg-emerald-300/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-emerald-200"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.9)]" /> scanning</div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[18rem] overflow-hidden rounded-2xl border border-cyan-300/18 bg-[#020713]/62 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(103,232,249,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,.10)_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="absolute right-4 top-5 h-44 w-44 rounded-full border border-cyan-300/30 sm:h-52 sm:w-52">
                  <span className="absolute inset-6 rounded-full border border-cyan-300/22" />
                  <span className="absolute inset-12 rounded-full border border-cyan-300/18" />
                  <span className="motion-beam absolute left-1/2 top-1/2 h-1 w-28 origin-left rounded-full bg-cyan-100 shadow-[0_0_40px_rgba(103,232,249,.95)]" />
                  <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-cyan-200/45 bg-[#061122] text-xs font-black text-cyan-100 shadow-[0_0_34px_rgba(14,165,233,.32)]">CQ</span>
                  <span className="motion-node left-[18%] top-[34%] bg-cyan-300" />
                  <span className="motion-node left-[58%] top-[18%] bg-cyan-300" />
                  <span className="motion-node left-[76%] top-[62%] bg-rose-300" />
                  <span className="motion-node left-[34%] top-[74%] bg-indigo-300" />
                </div>

                <div className="relative max-w-[18rem]">
                  <p className="text-[10px] font-black uppercase tracking-[.24em] text-cyan-200">Scene 01</p>
                  <h3 className="mt-2 text-3xl font-black leading-[.98] tracking-[-.06em] text-white sm:text-4xl">Signals move into one buyer-readiness map.</h3>
                </div>
                <div className="relative mt-8 flex flex-wrap gap-2 pr-20 sm:pr-28">
                  {SIGNALS.map((signal, index) => <span key={signal} className="signal-pill rounded-full border border-cyan-300/22 bg-cyan-300/8 px-3 py-1.5 text-[10px] font-black text-cyan-50 shadow-[0_0_18px_rgba(14,165,233,.08)]" style={{animationDelay: `${index * 160}ms`}}>{signal}</span>)}
                </div>
              </div>

              <div className="grid gap-3">
                {STEPS.map(([number, title, copy], index) => <article key={title} className="motion-card rounded-2xl border border-white/10 bg-white/[.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.065)]" style={{animationDelay: `${index * 220}ms`}}><div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-300/22 bg-cyan-300/10 text-xs font-black text-cyan-100">{number}</span><div><h4 className="text-base font-black tracking-[-.03em] text-white">{title}</h4><p className="mt-1 text-xs font-semibold leading-5 text-slate-300">{copy}</p></div></div></article>)}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {REPAIRS.map(([label, score, copy, tone], index) => <article key={label} className="motion-card rounded-2xl border border-white/10 bg-white/[.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.065)]" style={{animationDelay: `${600 + index * 180}ms`}}><div className="flex items-center justify-between gap-3"><span className="text-sm font-black text-white">{label}</span><span className={tone === "red" ? "text-2xl font-black text-rose-300" : "text-2xl font-black text-cyan-300"}>{score}</span></div><Spark tone={tone as "red" | "cyan"} /><p className="mt-3 text-[11px] font-semibold leading-5 text-slate-300">{copy}</p></article>)}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes cinemaSweep{0%{transform:translateX(-9rem);opacity:0}20%,70%{opacity:1}100%{transform:translateX(70rem);opacity:0}}@keyframes driftOrb{0%,100%{transform:translate3d(0,0,0) scale(1);opacity:.68}50%{transform:translate3d(18px,20px,0) scale(1.06);opacity:1}}@keyframes radarSpin{to{transform:rotate(360deg)}}@keyframes nodePulse{0%,100%{opacity:.55;transform:scale(.78)}50%{opacity:1;transform:scale(1.25)}}@keyframes pillRise{0%,100%{transform:translateY(0);opacity:.72}50%{transform:translateY(-5px);opacity:1}}@keyframes stepGlow{0%,100%{border-color:rgba(255,255,255,.1);transform:translateY(0)}50%{border-color:rgba(103,232,249,.28);transform:translateY(-3px)}}@keyframes drawLine{0%{stroke-dashoffset:260}45%,100%{stroke-dashoffset:0}}.cinema-orb{animation:driftOrb 10s ease-in-out infinite}.cinema-orb-delay{animation-delay:-4s}.cinema-sweep{animation:cinemaSweep 6s ease-in-out infinite}.motion-beam{animation:radarSpin 4.8s linear infinite}.motion-node{position:absolute;height:.55rem;width:.55rem;border-radius:9999px;box-shadow:0 0 18px currentColor;animation:nodePulse 2.2s ease-in-out infinite}.signal-pill{animation:pillRise 3.2s ease-in-out infinite}.motion-card{animation:stepGlow 5s ease-in-out infinite}.motion-line{stroke-dasharray:260;animation:drawLine 3s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.cinema-orb,.cinema-sweep,.motion-beam,.motion-node,.signal-pill,.motion-card,.motion-line{animation:none}}`}</style>
    </section>
  );
}

function Spark({ tone }: { tone: "red" | "cyan" }) {
  const stroke = tone === "red" ? "#fb7185" : "#22d3ee";
  const path = tone === "red" ? "M6 28 C26 24 46 27 66 31 C86 35 112 30 138 33 C160 36 180 35 194 38" : "M6 34 C28 28 50 21 72 24 C96 27 112 18 134 20 C156 22 174 18 194 16";
  return <svg viewBox="0 0 200 48" preserveAspectRatio="none" className="mt-3 h-10 w-full rounded-xl border border-white/10 bg-[#020713]/70"><g opacity=".16" stroke={stroke} strokeWidth=".6"><path d="M0 14H200M0 28H200M0 42H200M40 0V48M80 0V48M120 0V48M160 0V48" /></g><path d={path} className="motion-line" fill="none" stroke={stroke} strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" /><circle cx="194" cy={tone === "red" ? "38" : "16"} r="3.5" fill={stroke} /></svg>;
}
