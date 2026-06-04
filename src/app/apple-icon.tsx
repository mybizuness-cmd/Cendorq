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
                    backgroundColor: "#ffffff",
                    backgroundImage:
                        "radial-gradient(circle at 18% 18%, rgba(251,207,232,0.44), transparent 30%), radial-gradient(circle at 82% 16%, rgba(125,211,252,0.34), transparent 30%), radial-gradient(circle at 50% 92%, rgba(186,230,253,0.24), transparent 35%), linear-gradient(180deg, #ffffff 0%, #f4fbff 48%, #ffffff 100%)",
                    color: "#0f172a",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 28,
                        borderRadius: 126,
                        border: "1px solid rgba(14,165,233,0.17)",
                        boxShadow: "0 34px 110px rgba(15,23,42,0.10)",
                        backgroundColor: "rgba(255,255,255,0.38)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 350,
                        height: 350,
                        borderRadius: 106,
                        border: "1px solid rgba(14,165,233,0.16)",
                        backgroundColor: "rgba(255,255,255,0.62)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 278,
                        height: 278,
                        borderRadius: 92,
                        border: "1px solid rgba(14,165,233,0.22)",
                        backgroundColor: "rgba(255,255,255,0.84)",
                        backgroundImage:
                            "radial-gradient(circle at 30% 26%, rgba(251,207,232,0.34), transparent 44%), radial-gradient(circle at 78% 74%, rgba(186,230,253,0.3), transparent 42%)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        top: 62,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px",
                        borderRadius: 999,
                        border: "1px solid rgba(14,165,233,0.18)",
                        backgroundColor: "rgba(236,254,255,0.84)",
                        color: "#0e7490",
                        fontSize: 14,
                        fontWeight: 800,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                    }}
                >
                    <div
                        style={{
                            width: 9,
                            height: 9,
                            borderRadius: 999,
                            backgroundColor: "#06b6d4",
                        }}
                    />
                    CQ
                </div>

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        width: 212,
                        height: 212,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 70,
                        border: "1px solid rgba(226,232,240,0.92)",
                        backgroundColor: "rgba(255,255,255,0.76)",
                        boxShadow: "0 24px 80px rgba(15,23,42,0.08)",
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
                                backgroundColor: "#06b6d4",
                            }}
                        />
                        <div
                            style={{
                                width: 20,
                                height: 106,
                                borderRadius: 999,
                                backgroundColor: "#0f172a",
                            }}
                        />
                        <div
                            style={{
                                width: 20,
                                height: 54,
                                borderRadius: 999,
                                backgroundColor: "#f0abfc",
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
                        border: "1px solid rgba(14,165,233,0.16)",
                        backgroundColor: "rgba(255,255,255,0.84)",
                        color: "#0f172a",
                        fontSize: 15,
                        fontWeight: 800,
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
