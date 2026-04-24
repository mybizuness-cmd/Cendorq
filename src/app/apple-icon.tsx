import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
    width: 512,
    height: 512,
};

export const contentType = "image/png";

export default function AppleIcon() {
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
                        "radial-gradient(circle at 18% 18%, rgba(34,211,238,0.2), transparent 28%), radial-gradient(circle at 82% 16%, rgba(56,189,248,0.14), transparent 26%), linear-gradient(180deg, #020617 0%, #020816 42%, #030712 100%)",
                    color: "#f8fafc",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 28,
                        borderRadius: 124,
                        border: "1px solid rgba(103,232,249,0.12)",
                        boxShadow: "0 0 120px rgba(34,211,238,0.1)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 346,
                        height: 346,
                        borderRadius: 94,
                        border: "1px solid rgba(255,255,255,0.08)",
                        backgroundColor: "rgba(255,255,255,0.025)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 278,
                        height: 278,
                        borderRadius: 86,
                        border: "1px solid rgba(103,232,249,0.18)",
                        backgroundColor: "rgba(8,18,34,0.95)",
                        backgroundImage:
                            "radial-gradient(circle at 30% 26%, rgba(103,232,249,0.18), transparent 44%)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        top: 64,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px",
                        borderRadius: 999,
                        border: "1px solid rgba(103,232,249,0.18)",
                        backgroundColor: "rgba(8,18,34,0.7)",
                        color: "#cffafe",
                        fontSize: 14,
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
                        width: 212,
                        height: 212,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 66,
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
                                width: 20,
                                height: 70,
                                borderRadius: 999,
                                backgroundColor: "#a5f3fc",
                            }}
                        />
                        <div
                            style={{
                                width: 20,
                                height: 106,
                                borderRadius: 999,
                                backgroundColor: "#ffffff",
                            }}
                        />
                        <div
                            style={{
                                width: 20,
                                height: 54,
                                borderRadius: 999,
                                backgroundColor: "#7dd3fc",
                            }}
                        />
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: 58,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "9px 16px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.08)",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        color: "#dbeafe",
                        fontSize: 15,
                        fontWeight: 700,
                        letterSpacing: "0.16em",
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