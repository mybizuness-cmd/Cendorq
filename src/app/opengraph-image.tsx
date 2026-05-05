import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
    "Cendorq — Business Command Intelligence for businesses that need to find where customers lose clarity, trust, visibility, or action before spending more.";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

const readouts = [
    {
        label: "Primary role",
        value: "Business Command Intelligence",
    },
    {
        label: "Best first move",
        value: "Free Scan",
    },
    {
        label: "Deeper diagnosis",
        value: "Deep Review",
    },
    {
        label: "Continued control",
        value: "Ongoing Control",
    },
] as const;

const operatingPillars = [
    "Find hesitation",
    "Build trust",
    "Make the next move clear",
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
                        "radial-gradient(circle at top left, rgba(34,211,238,0.16), transparent 24%), radial-gradient(circle at top right, rgba(56,189,248,0.14), transparent 22%), radial-gradient(circle at bottom center, rgba(34,211,238,0.08), transparent 32%), linear-gradient(180deg, #020617 0%, #020817 42%, #030712 100%)",
                    color: "#f8fafc",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "38px 38px", opacity: 0.24 }} />
                <div style={{ position: "absolute", left: 30, top: 46, width: 260, height: 260, borderRadius: 999, background: "rgba(34,211,238,0.1)" }} />
                <div style={{ position: "absolute", right: 44, top: 70, width: 220, height: 220, borderRadius: 999, background: "rgba(56,189,248,0.1)" }} />
                <div style={{ position: "absolute", left: "50%", bottom: -56, width: 340, height: 340, borderRadius: 999, transform: "translateX(-50%)", background: "rgba(34,211,238,0.08)" }} />

                <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", padding: "42px 42px 40px", gap: 26 }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 14, padding: "10px 16px 10px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" }}>
                                <div style={{ position: "relative", display: "flex", width: 52, height: 52, alignItems: "center", justifyContent: "center", borderRadius: 999, border: "1px solid rgba(103,232,249,0.22)", background: "radial-gradient(circle at 30% 30%, rgba(103,232,249,0.24), transparent 55%), #08111f" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <div style={{ width: 6, height: 18, borderRadius: 999, background: "#a5f3fc" }} />
                                        <div style={{ width: 6, height: 24, borderRadius: 999, background: "#ffffff" }} />
                                        <div style={{ width: 6, height: 14, borderRadius: 999, background: "#bfdbfe" }} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffffff" }}>Cendorq</div>
                                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#94a3b8" }}>Business Command Intelligence</div>
                                </div>
                            </div>

                            <div style={{ marginTop: 28, display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 10, padding: "9px 14px", borderRadius: 999, border: "1px solid rgba(103,232,249,0.18)", background: "linear-gradient(180deg, rgba(103,232,249,0.11), rgba(56,189,248,0.06))", color: "#cffafe", fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                                <div style={{ width: 9, height: 9, borderRadius: 999, background: "#67e8f9", boxShadow: "0 0 0 8px rgba(103,232,249,0.12)" }} />
                                Free scan first
                            </div>

                            <div style={{ marginTop: 26, display: "flex", flexDirection: "column", maxWidth: 720 }}>
                                <div style={{ fontSize: 72, lineHeight: 0.93, fontWeight: 700, letterSpacing: "-0.055em", color: "#f8fafc" }}>
                                    Stop losing customers
                                </div>
                                <div style={{ marginTop: 10, fontSize: 68, lineHeight: 0.93, fontWeight: 700, letterSpacing: "-0.055em", color: "#67e8f9" }}>
                                    before they call.
                                </div>
                            </div>

                            <div style={{ marginTop: 24, maxWidth: 735, fontSize: 23, lineHeight: 1.52, color: "#cbd5e1" }}>
                                Cendorq helps businesses find what makes customers hesitate, compare, leave, or choose someone else before spending more on the wrong fix.
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                            {operatingPillars.map((item) => (
                                <div key={item} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.09)", background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))", color: "#dbeafe", fontSize: 16, fontWeight: 600 }}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ width: 338, display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ display: "flex", flexDirection: "column", borderRadius: 34, border: "1px solid rgba(255,255,255,0.09)", background: "linear-gradient(180deg, rgba(9,18,34,0.92), rgba(6,13,26,0.86))", padding: "22px 22px 20px", boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 28px 80px rgba(0,0,0,0.36)" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#a5f3fc" }}>
                                Buyer path
                            </div>
                            <div style={{ marginTop: 18, fontSize: 30, lineHeight: 1.14, fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff" }}>
                                Find the pressure before buying the bigger fix.
                            </div>
                            <div style={{ marginTop: 16, fontSize: 16, lineHeight: 1.58, color: "#cbd5e1" }}>
                                Start free. Diagnose deeper when needed. Fix what matters. Keep control when the base is strong enough.
                            </div>
                            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#94a3b8" }}>
                                    <span>Decision clarity</span>
                                    <span>88%</span>
                                </div>
                                <div style={{ width: "100%", height: 9, borderRadius: 999, overflow: "hidden", background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" }}>
                                    <div style={{ width: "88%", height: "100%", borderRadius: 999, background: "linear-gradient(90deg, rgba(103,232,249,0.98), rgba(56,189,248,0.95))", boxShadow: "0 0 24px rgba(56,189,248,0.34)" }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {readouts.map((item, index) => (
                                <div key={item.label} style={{ display: "flex", flexDirection: "column", borderRadius: 22, padding: "16px 16px 18px", border: index === 0 ? "1px solid rgba(103,232,249,0.18)" : "1px solid rgba(255,255,255,0.08)", background: index === 0 ? "linear-gradient(180deg, rgba(103,232,249,0.11), rgba(56,189,248,0.06)), rgba(255,255,255,0.025)" : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025)), rgba(255,255,255,0.02)" }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8" }}>
                                        {item.label}
                                    </div>
                                    <div style={{ marginTop: 10, fontSize: 19, lineHeight: 1.35, fontWeight: 700, color: "#ffffff" }}>
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
