import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
    "Cendorq — Search Presence OS for businesses that need to find what makes customers hesitate before spending more.";

export const size = {
    width: 1200,
    height: 600,
};

export const contentType = "image/png";

const strategicPillars = [
    "Find hesitation",
    "Build trust",
    "Make action clear",
] as const;

const readouts = [
    {
        label: "Best first move",
        value: "Free Scan",
    },
    {
        label: "Deeper diagnosis",
        value: "Deep Review",
    },
    {
        label: "Focused fix",
        value: "Build Fix",
    },
    {
        label: "Continued control",
        value: "Ongoing Control",
    },
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
                        "radial-gradient(circle at 10% 14%, rgba(34,211,238,0.18), transparent 24%), radial-gradient(circle at 86% 16%, rgba(56,189,248,0.14), transparent 22%), radial-gradient(circle at 50% 96%, rgba(34,211,238,0.08), transparent 30%), linear-gradient(180deg, #020617 0%, #020817 42%, #030712 100%)",
                    color: "#f8fafc",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div style={{ position: "absolute", inset: 0, opacity: 0.16, backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
                <div style={{ position: "absolute", left: 34, top: 36, width: 240, height: 240, borderRadius: 999, background: "rgba(103,232,249,0.08)", filter: "blur(24px)" }} />
                <div style={{ position: "absolute", right: 42, top: 76, width: 210, height: 210, borderRadius: 999, background: "rgba(56,189,248,0.08)", filter: "blur(24px)" }} />
                <div style={{ position: "absolute", left: "50%", bottom: -52, width: 300, height: 300, borderRadius: 999, transform: "translateX(-50%)", background: "rgba(34,211,238,0.06)", filter: "blur(32px)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 82, height: 1, opacity: 0.2, background: "linear-gradient(90deg, transparent 0%, rgba(103,232,249,0.24) 18%, rgba(255,255,255,0.12) 50%, rgba(103,232,249,0.24) 82%, transparent 100%)" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 78, height: 1, opacity: 0.18, background: "linear-gradient(90deg, transparent 0%, rgba(103,232,249,0.2) 18%, rgba(255,255,255,0.1) 50%, rgba(103,232,249,0.2) 82%, transparent 100%)" }} />

                <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", padding: "38px 42px", gap: 26 }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 14, padding: "10px 14px 10px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))", boxShadow: "0 14px 34px rgba(2,8,23,0.22)" }}>
                                <div style={{ position: "relative", display: "flex", width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: 999, border: "1px solid rgba(103,232,249,0.22)", background: "radial-gradient(circle at 30% 30%, rgba(103,232,249,0.22), transparent 55%), #08111f" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <div style={{ width: 6, height: 16, borderRadius: 999, background: "#a5f3fc" }} />
                                        <div style={{ width: 6, height: 22, borderRadius: 999, background: "#ffffff" }} />
                                        <div style={{ width: 6, height: 12, borderRadius: 999, background: "#bfdbfe" }} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffffff" }}>Cendorq</div>
                                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#94a3b8" }}>Search Presence OS</div>
                                </div>
                            </div>

                            <div style={{ marginTop: 24, display: "flex", alignItems: "center", alignSelf: "flex-start", gap: 10, padding: "9px 14px", borderRadius: 999, border: "1px solid rgba(103,232,249,0.18)", background: "linear-gradient(180deg, rgba(103,232,249,0.11), rgba(56,189,248,0.06))", color: "#cffafe", fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                                <div style={{ width: 9, height: 9, borderRadius: 999, background: "#67e8f9", boxShadow: "0 0 0 8px rgba(103,232,249,0.12)" }} />
                                Start with the Free Scan
                            </div>

                            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", maxWidth: 690 }}>
                                <div style={{ fontSize: 61, lineHeight: 0.94, fontWeight: 800, letterSpacing: "-0.055em", color: "#f8fafc" }}>
                                    Stop losing customers
                                </div>
                                <div style={{ marginTop: 10, fontSize: 60, lineHeight: 0.94, fontWeight: 800, letterSpacing: "-0.055em", color: "#dbeafe" }}>
                                    before they choose.
                                </div>
                            </div>

                            <div style={{ marginTop: 22, maxWidth: 720, fontSize: 22, lineHeight: 1.5, color: "#cbd5e1" }}>
                                Find what makes people hesitate, compare, leave, or choose someone else before spending more on the wrong fix.
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                            {strategicPillars.map((item) => (
                                <div key={item} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.09)", background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))", color: "#dbeafe", fontSize: 15, fontWeight: 600 }}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ width: 324, display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{ display: "flex", flexDirection: "column", borderRadius: 30, border: "1px solid rgba(255,255,255,0.09)", background: "linear-gradient(180deg, rgba(9,18,34,0.92), rgba(6,13,26,0.86))", padding: "20px 20px 18px", boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 28px 80px rgba(0,0,0,0.36)" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#a5f3fc" }}>
                                Buyer path
                            </div>
                            <div style={{ marginTop: 16, fontSize: 28, lineHeight: 1.14, fontWeight: 700, letterSpacing: "-0.04em", color: "#ffffff" }}>
                                Start free. Diagnose deeper. Fix what matters.
                            </div>
                            <div style={{ marginTop: 14, fontSize: 15, lineHeight: 1.58, color: "#cbd5e1" }}>
                                Keep the path simple so the customer knows what to do next.
                            </div>
                            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 9 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#94a3b8" }}>
                                    <span>Action clarity</span>
                                    <span>86%</span>
                                </div>
                                <div style={{ width: "100%", height: 9, borderRadius: 999, overflow: "hidden", background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))" }}>
                                    <div style={{ width: "86%", height: "100%", borderRadius: 999, background: "linear-gradient(90deg, rgba(103,232,249,0.98), rgba(56,189,248,0.95))", boxShadow: "0 0 24px rgba(56,189,248,0.34)" }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {readouts.map((item, index) => (
                                <div key={item.label} style={{ display: "flex", flexDirection: "column", borderRadius: 20, padding: "15px 15px 16px", border: index === 0 ? "1px solid rgba(103,232,249,0.18)" : "1px solid rgba(255,255,255,0.08)", background: index === 0 ? "linear-gradient(180deg, rgba(103,232,249,0.11), rgba(56,189,248,0.06)), rgba(255,255,255,0.025)" : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025)), rgba(255,255,255,0.02)" }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8" }}>
                                        {item.label}
                                    </div>
                                    <div style={{ marginTop: 9, fontSize: 18, lineHeight: 1.34, fontWeight: 700, color: "#ffffff" }}>
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
