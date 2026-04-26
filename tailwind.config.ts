import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "1.5rem",
                lg: "2rem",
                xl: "2rem",
                "2xl": "2rem",
            },
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "rgba(255,255,255,0.09)",
                input: "rgba(255,255,255,0.10)",
                ring: "rgba(103,232,249,0.45)",
                background: "var(--system-bg)",
                foreground: "var(--system-text)",
                muted: {
                    DEFAULT: "rgba(255,255,255,0.04)",
                    foreground: "var(--system-text-muted)",
                },
                card: {
                    DEFAULT: "rgba(255,255,255,0.03)",
                    foreground: "var(--system-text)",
                },
                popover: {
                    DEFAULT: "rgba(8,15,29,0.92)",
                    foreground: "var(--system-text)",
                },
                primary: {
                    DEFAULT: "var(--system-cyan)",
                    foreground: "#03131a",
                },
                secondary: {
                    DEFAULT: "rgba(255,255,255,0.05)",
                    foreground: "var(--system-text)",
                },
                destructive: {
                    DEFAULT: "var(--system-rose)",
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "var(--system-sky)",
                    foreground: "#03131a",
                },
                success: {
                    DEFAULT: "var(--system-emerald)",
                    foreground: "#03131a",
                },
                warning: {
                    DEFAULT: "var(--system-amber)",
                    foreground: "#111827",
                },
                system: {
                    bg: "var(--system-bg)",
                    elevated: "var(--system-bg-elevated)",
                    surface: "var(--system-bg-surface)",
                    "surface-strong": "var(--system-bg-surface-strong)",
                    border: "var(--system-border)",
                    "border-strong": "var(--system-border-strong)",
                    text: "var(--system-text)",
                    "text-soft": "var(--system-text-soft)",
                    muted: "var(--system-text-muted)",
                    cyan: "var(--system-cyan)",
                    "cyan-strong": "var(--system-cyan-strong)",
                    sky: "var(--system-sky)",
                    emerald: "var(--system-emerald)",
                    rose: "var(--system-rose)",
                    amber: "var(--system-amber)",
                },
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem",
            },
            boxShadow: {
                system: "var(--system-shadow)",
                "system-strong": "var(--system-shadow-strong)",
                glow: "0 0 40px rgba(34, 211, 238, 0.18)",
                "glow-soft": "0 0 24px rgba(56, 189, 248, 0.14)",
            },
            backgroundImage: {
                "system-grid":
                    "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
                "system-radial":
                    "radial-gradient(circle at top left, rgba(34,211,238,0.08), transparent 28%), radial-gradient(circle at top right, rgba(56,189,248,0.07), transparent 26%), radial-gradient(circle at bottom center, rgba(34,211,238,0.05), transparent 34%)",
            },
            keyframes: {
                "system-orb-float-a": {
                    "0%, 100%": {
                        transform: "translate3d(0, 0, 0) scale(1)",
                    },
                    "50%": {
                        transform: "translate3d(18px, -14px, 0) scale(1.04)",
                    },
                },
                "system-orb-float-b": {
                    "0%, 100%": {
                        transform: "translate3d(0, 0, 0) scale(1)",
                    },
                    "50%": {
                        transform: "translate3d(-14px, 12px, 0) scale(1.05)",
                    },
                },
                "system-orb-float-c": {
                    "0%, 100%": {
                        transform: "translate3d(-50%, 0, 0) scale(1)",
                    },
                    "50%": {
                        transform: "translate3d(calc(-50% + 10px), -10px, 0) scale(1.06)",
                    },
                },
                "system-pulse": {
                    "0%, 100%": {
                        opacity: "1",
                        transform: "scale(1)",
                        boxShadow: "0 0 0 0 rgba(103, 232, 249, 0.45)",
                    },
                    "50%": {
                        opacity: "0.88",
                        transform: "scale(1.06)",
                        boxShadow: "0 0 0 8px rgba(103, 232, 249, 0)",
                    },
                },
                "system-scan": {
                    "0%": {
                        transform: "translateX(-24%)",
                        opacity: "0",
                    },
                    "20%": {
                        opacity: "0.65",
                    },
                    "80%": {
                        opacity: "0.65",
                    },
                    "100%": {
                        transform: "translateX(24%)",
                        opacity: "0",
                    },
                },
                "system-glow": {
                    "0%, 100%": {
                        boxShadow:
                            "0 1px 0 rgba(255,255,255,0.03) inset, 0 24px 80px rgba(2,8,23,0.42)",
                    },
                    "50%": {
                        boxShadow:
                            "0 1px 0 rgba(255,255,255,0.05) inset, 0 28px 88px rgba(2,8,23,0.50), 0 0 0 1px rgba(103,232,249,0.08)",
                    },
                },
            },
            animation: {
                "system-orb-a": "system-orb-float-a 12s ease-in-out infinite",
                "system-orb-b": "system-orb-float-b 14s ease-in-out infinite",
                "system-orb-c": "system-orb-float-c 16s ease-in-out infinite",
                "system-pulse": "system-pulse 2.4s ease-in-out infinite",
                "system-scan": "system-scan 6s ease-in-out infinite",
                "system-glow": "system-glow 9s ease-in-out infinite",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "sans-serif",
                ],
            },
            maxWidth: {
                "8xl": "90rem",
            },
            letterSpacing: {
                system: "-0.04em",
            },
        },
    },
    plugins: [],
};

export default config;
