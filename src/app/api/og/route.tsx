import { siteConfig } from "@/lib/seo";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const title = clampText(
        searchParams.get("title") || siteConfig.name,
        72,
    );

    const subtitle = clampText(
        searchParams.get("subtitle") || "Business visibility intelligence",
        120,
    );

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    position: "relative",
                    background:
                        "linear-gradient(180deg, #030712 0%, #07111f 38%, #0b1730 100%)",
                    color: "#f8fbff",
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(circle at 16% 18%, rgba(34,211,238,0.16), transparent 24%), radial-gradient(circle at 85% 14%, rgba(59,130,246,0.12), transparent 18%)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        inset: 36,
                        borderRadius: 36,
                        border: "1px solid rgba(103,232,249,0.18)",
                        background:
                            "linear-gradient(180deg, rgba(8,15,30,0.9) 0%, rgba(10,19,37,0.95) 100%)",
                        boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "42px 46px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        <div
                            style={{
                                height: 54,
                                width: 54,
                                borderRadius: 18,
                                border: "1px solid rgba(103,232,249,0.2)",
                                background:
                                    "linear-gradient(135deg, rgba(143,247,255,0.26) 0%, rgba(79,231,245,0.16) 100%)",
                                display: "flex",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 1,
                                    borderRadius: 17,
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: 18,
                                    background:
                                        "radial-gradient(circle at 32% 28%, rgba(143,247,255,0.78), transparent 34%)",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 28,
                                    fontWeight: 700,
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                {siteConfig.name}
                            </div>
                            <div
                                style={{
                                    marginTop: 4,
                                    fontSize: 12,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.28em",
                                    color: "#8ff7ff",
                                }}
                            >
                                Business visibility intelligence
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: 920,
                        }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                alignSelf: "flex-start",
                                marginBottom: 22,
                                borderRadius: 999,
                                border: "1px solid rgba(103,232,249,0.18)",
                                padding: "10px 16px",
                                fontSize: 13,
                                fontWeight: 700,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#dffbff",
                                background:
                                    "linear-gradient(180deg, rgba(34,211,238,0.1) 0%, rgba(59,130,246,0.05) 100%)",
                            }}
                        >
                            Cendorq search-presence preview
                        </div>

                        <div
                            style={{
                                fontSize: 68,
                                lineHeight: 1.02,
                                fontWeight: 800,
                                letterSpacing: "-0.05em",
                                color: "#f8fbff",
                            }}
                        >
                            {title}
                        </div>

                        <div
                            style={{
                                marginTop: 18,
                                fontSize: 28,
                                lineHeight: 1.35,
                                color: "#d2dced",
                                maxWidth: 900,
                            }}
                        >
                            {subtitle}
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 14,
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {["Trust", "Clarity", "Positioning", "Action"].map((item) => (
                            <div
                                key={item}
                                style={{
                                    borderRadius: 999,
                                    border: "1px solid rgba(103,232,249,0.16)",
                                    padding: "10px 16px",
                                    fontSize: 18,
                                    color: "#dffbff",
                                    background:
                                        "linear-gradient(180deg, rgba(34,211,238,0.1) 0%, rgba(59,130,246,0.05) 100%)",
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        size,
    );
}

function clampText(value: string, maxLength: number) {
    const clean = value.trim().replace(/\s+/g, " ");
    if (clean.length <= maxLength) return clean;
    return `${clean.slice(0, maxLength - 1)}…`;
}
