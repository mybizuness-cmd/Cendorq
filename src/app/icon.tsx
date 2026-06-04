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
                    backgroundColor: "#ffffff",
                    backgroundImage:
                        "radial-gradient(circle at 20% 18%, rgba(251,207,232,0.42), transparent 30%), radial-gradient(circle at 82% 16%, rgba(125,211,252,0.34), transparent 30%), radial-gradient(circle at 50% 94%, rgba(186,230,253,0.24), transparent 34%), linear-gradient(180deg, #ffffff 0%, #f4fbff 48%, #ffffff 100%)",
                    color: "#0f172a",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 30,
                        borderRadius: 124,
                        border: "1px solid rgba(14,165,233,0.18)",
                        boxShadow: "0 34px 110px rgba(15,23,42,0.10)",
                        backgroundColor: "rgba(255,255,255,0.38)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 344,
                        height: 344,
                        borderRadius: 104,
                        border: "1px solid rgba(14,165,233,0.16)",
                        backgroundColor: "rgba(255,255,255,0.62)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: 268,
                        height: 268,
                        borderRadius: 88,
                        border: "1px solid rgba(14,165,233,0.22)",
                        backgroundColor: "rgba(255,255,255,0.82)",
                        backgroundImage:
                            "radial-gradient(circle at 30% 30%, rgba(251,207,232,0.34), transparent 44%), radial-gradient(circle at 82% 72%, rgba(186,230,253,0.28), transparent 42%)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        top: 72,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px",
                        borderRadius: 999,
                        border: "1px solid rgba(14,165,233,0.18)",
                        backgroundColor: "rgba(236,254,255,0.82)",
                        color: "#0e7490",
                        fontSize: 15,
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
                        width: 224,
                        height: 224,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 76,
                        border: "1px solid rgba(226,232,240,0.92)",
                        backgroundColor: "rgba(255,255,255,0.74)",
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
                                width: 22,
                                height: 78,
                                borderRadius: 999,
                                backgroundColor: "#06b6d4",
                            }}
                        />
                        <div
                            style={{
                                width: 22,
                                height: 118,
                                borderRadius: 999,
                                backgroundColor: "#0f172a",
                            }}
                        />
                        <div
                            style={{
                                width: 22,
                                height: 60,
                                borderRadius: 999,
                                backgroundColor: "#f0abfc",
                            }}
                        />
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom: 68,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 16px",
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
