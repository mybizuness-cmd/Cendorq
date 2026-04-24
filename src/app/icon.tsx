import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
    width: 512,
    height: 512,
};

export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "#020817",
                    backgroundImage:
                        "radial-gradient(circle at 24% 22%, rgba(34,211,238,0.18), transparent 28%), radial-gradient(circle at 78% 18%, rgba(56,189,248,0.14), transparent 26%), linear-gradient(180deg, #020617 0%, #020817 46%, #030712 100%)",
                    color: "#f8fafc",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 28,
                        borderRadius: 120,
                        border: "1px solid rgba(103,232,249,0.14)",
                        boxShadow: "0 0 120px rgba(34,211,238,0.12)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 336,
                        height: 336,
                        borderRadius: 98,
                        border: "1px solid rgba(255,255,255,0.06)",
                        backgroundColor: "rgba(255,255,255,0.03)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 258,
                        height: 258,
                        borderRadius: 82,
                        border: "1px solid rgba(103,232,249,0.2)",
                        backgroundColor: "rgba(8,18,34,0.94)",
                        backgroundImage:
                            "radial-gradient(circle at 30% 30%, rgba(103,232,249,0.18), transparent 44%)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        top: 82,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px",
                        borderRadius: 999,
                        border: "1px solid rgba(103,232,249,0.16)",
                        backgroundColor: "rgba(8,18,34,0.7)",
                        color: "#cffafe",
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                    }}
                >
                    <div
                        style={{
                            width: 9,
                            height: 9,
                            borderRadius: 999,
                            backgroundColor: "#67e8f9",
                        }}
                    />
                    CQ
                </div>

                <div
                    style={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        width: 238,
                        height: 238,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 74,
                        border: "1px solid rgba(255,255,255,0.06)",
                        backgroundColor: "rgba(255,255,255,0.02)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            gap: 12,
                            transform: "translateY(-2px)",
                        }}
                    >
                        <div
                            style={{
                                width: 22,
                                height: 78,
                                borderRadius: 999,
                                backgroundColor: "#a5f3fc",
                            }}
                        />
                        <div
                            style={{
                                width: 22,
                                height: 118,
                                borderRadius: 999,
                                backgroundColor: "#ffffff",
                            }}
                        />
                        <div
                            style={{
                                width: 22,
                                height: 60,
                                borderRadius: 999,
                                backgroundColor: "#7dd3fc",
                            }}
                        />
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: 74,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 16px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.08)",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        color: "#dbeafe",
                        fontSize: 16,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                    }}
                >
                    Cendorq
                </div>
            </div>
        ),
        {
            ...size,
        },
    );
}