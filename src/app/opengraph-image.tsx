import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
    "Cendorq — AI Search Presence Repair for businesses that need to be easier for AI, search, and customers to find, understand, trust, compare, and choose.";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

const readouts = [
    { label: "Product object", value: "Presence Report" },
    { label: "Choice signal", value: "Choice Gap" },
    { label: "Next command", value: "Repair Queue" },
    { label: "Path", value: "Scan → Review → Repair → Control" },
] as const;

const operatingPillars = [
    "Find",
    "Understand",
    "Trust",
    "Choose",
] as const;

const commandPath = [
    ["Scan", "first signal"],
    ["Review", "cause proof"],
    ["Repair", "scoped move"],
    ["Control", "drift watch"],
] as const;

export default function OpenGraphImage() {
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
                        "radial-gradient(circle at top left, rgba(251,207,232,0.28), transparent 25%), radial-gradient(circle at top right, rgba(125,211,252,0.28), transparent 26%), radial-gradient(circle at bottom center, rgba(186,230,253,0.22), transparent 34%), linear-gradient(180deg, #ffffff 0%, #f4fbff 46%, #ffffff 100%)",
                    color: "#0f172a",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)", backgroundSize: "38px 38px", opacity: 0.32 }} />
                <div style={{ position: "absolute", left: -70, top: -70, width: 360, height: 360, borderRadius: 999, background: "rgba(251,207,232,0.34)" }} />
                <div style={{ position: "absolute", right: -42, top: 48, width: 310, height: 310, borderRadius: 999, background: "rgba(125,211,252,0.26)" }} />
                <div style={{ position: "absolute", left: "48%", bottom: -94, width: 430, height: 430, borderRadius: 999, transform: "translateX(-50%)", background: "rgba(186,230,253,0.22)" }} />

                <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", padding: "42px 42px 40px", gap: 26 }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 14, padding: "10px 16px 10px 10px", borderRadius: 999, border: "1px solid rgba(14,165,233,0.18)", background: "rgba(255,255,255,0.72)" }}>
                                <div style={{ position: "relative", display: "flex", width: 52, height: 52, alignItems: "center", justifyContent: "center", borderRadius: 999, border: "1px solid rgba(14,165,233,0.18)", background: "radial-gradient(circle at 30% 30%, rgba(251,207,232,0.45), transparent 55%), #ffffff" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <div style={{ width: 6, height: 18, borderRadius: 999, background: "#06b6d4" }} />
                                        <div style={{ width: 6, height: 24, borderRadius: 999, background: "#334155" }} />
                                        <div style={{ width: 6, height: 14, borderRadius: 999, background: "#f0abfc" }} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0f172a" }}>Cendorq</div>
                                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0891b2" }}>AI Search Presence Repair</div>
                                </div>
                            </div>

                            <div style={{ marginTop: 28, display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 10, padding: "9px 14px", borderRadius: 999, border: "1px solid rgba(14,165,233,0.18)", background: "rgba(236,254,255,0.75)", color: "#0e7490", fontSize: 12, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                                <div style={{ width: 9, height: 9, borderRadius: 999, background: "#06b6d4", boxShadow: "0 0 0 8px rgba(6,182,212,0.12)" }} />
                                Start with the first signal
                            </div>

                            <div style={{ marginTop: 25, display: "flex", flexDirection: "column", maxWidth: 720 }}>
                                <div style={{ fontSize: 72, lineHeight: 0.9, fontWeight: 800, letterSpacing: "-0.066em", color: "#0f172a" }}>
                                    Be easier to find,
                                </div>
                                <div style={{ marginTop: 10, fontSize: 68, lineHeight: 0.9, fontWeight: 800, letterSpacing: "-0.066em", color: "#06b6d4" }}>
                                    understand, and choose.
                                </div>
                            </div>

                            <div style={{ marginTop: 24, maxWidth: 750, fontSize: 23, lineHeight: 1.48, color: "#475569", fontWeight: 650 }}>
                                Cendorq turns public presence into a clear decision: what AI, search, and customers can understand, where choice gets weak, and what to do first.
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                            {operatingPillars.map((item) => (
                                <div key={item} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderRadius: 999, border: "1px solid rgba(14,165,233,0.14)", background: "rgba(255,255,255,0.75)", color: "#334155", fontSize: 16, fontWeight: 750 }}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ width: 350, display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ display: "flex", flexDirection: "column", borderRadius: 34, border: "1px solid rgba(14,165,233,0.16)", background: "rgba(255,255,255,0.86)", padding: "22px 22px 20px", boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 28px 80px rgba(15,23,42,0.10)" }}>
                            <div style={{ fontSize: 11, fontWeight: 850, letterSpacing: "0.22em", textTransform: "uppercase", color: "#0891b2" }}>
                                Command path
                            </div>
                            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                                {commandPath.map(([label, copy]) => (
                                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "12px 13px", borderRadius: 18, border: "1px solid rgba(226,232,240,0.95)", background: "rgba(248,250,252,0.86)" }}>
                                        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.045em", color: "#0f172a" }}>{label}</div>
                                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b" }}>{copy}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {readouts.map((item, index) => (
                                <div key={item.label} style={{ display: "flex", flexDirection: "column", borderRadius: 22, padding: "16px 16px 18px", border: index === 0 ? "1px solid rgba(14,165,233,0.22)" : "1px solid rgba(226,232,240,0.95)", background: index === 0 ? "linear-gradient(180deg, rgba(236,254,255,0.9), rgba(255,255,255,0.82))" : "rgba(255,255,255,0.8)" }}>
                                    <div style={{ fontSize: 10, fontWeight: 850, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>
                                        {item.label}
                                    </div>
                                    <div style={{ marginTop: 10, fontSize: 18, lineHeight: 1.3, fontWeight: 800, color: "#0f172a" }}>
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
