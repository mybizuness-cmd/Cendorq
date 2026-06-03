import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
    "Cendorq — AI Search Presence Repair for businesses that need to be easier for AI, search, and customers to find, understand, trust, compare, and choose.";

export const size = {
    width: 1200,
    height: 600,
};

export const contentType = "image/png";

const strategicPillars = [
    "Find",
    "Understand",
    "Trust",
    "Choose",
] as const;

const readouts = [
    { label: "Product", value: "Presence Report" },
    { label: "Gap", value: "Choice Gap" },
    { label: "Queue", value: "Repair Queue" },
    { label: "Path", value: "Scan / Review / Repair / Control" },
] as const;

const commandPath = [
    ["Scan", "first signal"],
    ["Review", "cause proof"],
    ["Repair", "scoped move"],
    ["Control", "drift watch"],
] as const;

export default function TwitterImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    background:
                        "radial-gradient(circle at 10% 14%, rgba(251,207,232,0.3), transparent 25%), radial-gradient(circle at 86% 16%, rgba(125,211,252,0.28), transparent 24%), radial-gradient(circle at 50% 96%, rgba(186,230,253,0.2), transparent 30%), linear-gradient(180deg, #ffffff 0%, #f4fbff 44%, #ffffff 100%)",
                    color: "#0f172a",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div style={{ position: "absolute", inset: 0, opacity: 0.28, backgroundImage: "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
                <div style={{ position: "absolute", left: 24, top: 28, width: 260, height: 260, borderRadius: 999, background: "rgba(251,207,232,0.32)", filter: "blur(20px)" }} />
                <div style={{ position: "absolute", right: 28, top: 60, width: 240, height: 240, borderRadius: 999, background: "rgba(125,211,252,0.22)", filter: "blur(20px)" }} />
                <div style={{ position: "absolute", left: "50%", bottom: -60, width: 330, height: 330, borderRadius: 999, transform: "translateX(-50%)", background: "rgba(186,230,253,0.18)", filter: "blur(28px)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 82, height: 1, opacity: 0.22, background: "linear-gradient(90deg, transparent 0%, rgba(14,165,233,0.2) 18%, rgba(15,23,42,0.08) 50%, rgba(14,165,233,0.2) 82%, transparent 100%)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 78, height: 1, opacity: 0.18, background: "linear-gradient(90deg, transparent 0%, rgba(14,165,233,0.18) 18%, rgba(15,23,42,0.07) 50%, rgba(14,165,233,0.18) 82%, transparent 100%)" }} />

                <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", padding: "38px 42px", gap: 26 }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 14, padding: "10px 14px 10px 10px", borderRadius: 999, border: "1px solid rgba(14,165,233,0.18)", background: "rgba(255,255,255,0.74)", boxShadow: "0 14px 34px rgba(15,23,42,0.08)" }}>
                                <div style={{ position: "relative", display: "flex", width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: 999, border: "1px solid rgba(14,165,233,0.18)", background: "radial-gradient(circle at 30% 30%, rgba(251,207,232,0.45), transparent 55%), #ffffff" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <div style={{ width: 6, height: 16, borderRadius: 999, background: "#06b6d4" }} />
                                        <div style={{ width: 6, height: 22, borderRadius: 999, background: "#334155" }} />
                                        <div style={{ width: 6, height: 12, borderRadius: 999, background: "#f0abfc" }} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0f172a" }}>Cendorq</div>
                                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0891b2" }}>AI Search Presence Repair</div>
                                </div>
                            </div>

                            <div style={{ marginTop: 24, display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 10, padding: "9px 14px", borderRadius: 999, border: "1px solid rgba(14,165,233,0.18)", background: "rgba(236,254,255,0.78)", color: "#0e7490", fontSize: 12, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                                <div style={{ width: 9, height: 9, borderRadius: 999, background: "#06b6d4", boxShadow: "0 0 0 8px rgba(6,182,212,0.12)" }} />
                                Start with the Free Scan
                            </div>

                            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", maxWidth: 700 }}>
                                <div style={{ fontSize: 62, lineHeight: 0.91, fontWeight: 800, letterSpacing: "-0.064em", color: "#0f172a" }}>
                                    Be easier to find,
                                </div>
                                <div style={{ marginTop: 10, fontSize: 60, lineHeight: 0.91, fontWeight: 800, letterSpacing: "-0.064em", color: "#06b6d4" }}>
                                    understand, and choose.
                                </div>
                            </div>

                            <div style={{ marginTop: 22, maxWidth: 720, fontSize: 22, lineHeight: 1.46, color: "#475569", fontWeight: 650 }}>
                                Find what AI, search, and customers may be missing before spending more on the wrong fix.
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                            {strategicPillars.map((item) => (
                                <div key={item} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderRadius: 999, border: "1px solid rgba(14,165,233,0.14)", background: "rgba(255,255,255,0.75)", color: "#334155", fontSize: 15, fontWeight: 750 }}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ width: 332, display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{ display: "flex", flexDirection: "column", borderRadius: 30, border: "1px solid rgba(14,165,233,0.16)", background: "rgba(255,255,255,0.86)", padding: "20px 20px 18px", boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 28px 80px rgba(15,23,42,0.10)" }}>
                            <div style={{ fontSize: 11, fontWeight: 850, letterSpacing: "0.22em", textTransform: "uppercase", color: "#0891b2" }}>
                                Command path
                            </div>
                            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
                                {commandPath.map(([label, copy]) => (
                                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 17, border: "1px solid rgba(226,232,240,0.95)", background: "rgba(248,250,252,0.86)" }}>
                                        <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.045em", color: "#0f172a" }}>{label}</div>
                                        <div style={{ fontSize: 10, fontWeight: 850, letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b" }}>{copy}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {readouts.map((item, index) => (
                                <div key={item.label} style={{ display: "flex", flexDirection: "column", borderRadius: 20, padding: "15px 15px 16px", border: index === 0 ? "1px solid rgba(14,165,233,0.22)" : "1px solid rgba(226,232,240,0.95)", background: index === 0 ? "linear-gradient(180deg, rgba(236,254,255,0.9), rgba(255,255,255,0.82))" : "rgba(255,255,255,0.8)" }}>
                                    <div style={{ fontSize: 10, fontWeight: 850, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>
                                        {item.label}
                                    </div>
                                    <div style={{ marginTop: 9, fontSize: 17, lineHeight: 1.3, fontWeight: 800, color: "#0f172a" }}>
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        },
    );
}
