import { NextRequest, NextResponse } from "next/server";

const INTERNAL_CONSOLE_PREFIX = "/intake-console";
const CUSTOMER_DASHBOARD_PREFIX = "/dashboard";
const CONSOLE_COOKIE_NAME = "da_console_session";
const CUSTOMER_SESSION_COOKIE_NAME = "cendorq_customer_session";
const CONSOLE_COOKIE_TTL_SECONDS = 60 * 60 * 8;
const CUSTOMER_SESSION_SECRET_ENV = "CENDORQ_CUSTOMER_SESSION_SECRET";
const CUSTOMER_SESSION_VERSION = "v1";
const CUSTOMER_DASHBOARD_DEFAULT_PATH = "/dashboard";
const CUSTOMER_DASHBOARD_ALLOWED_PATHS = [
    "/dashboard",
    "/dashboard/reports",
    "/dashboard/reports/free-scan",
    "/dashboard/billing",
    "/dashboard/support",
    "/dashboard/notifications",
] as const;

type BasicCredentials = {
    username: string;
    password: string;
};

type CustomerDashboardSessionProjection = {
    ok: boolean;
    reason: "valid" | "missing" | "not-configured" | "malformed" | "expired" | "signature-mismatch";
    safeReturnTo: string;
};

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isProtectedConsoleRoute =
        pathname === INTERNAL_CONSOLE_PREFIX ||
        pathname.startsWith(`${INTERNAL_CONSOLE_PREFIX}/`);
    const isProtectedCustomerDashboardRoute =
        pathname === CUSTOMER_DASHBOARD_PREFIX ||
        pathname.startsWith(`${CUSTOMER_DASHBOARD_PREFIX}/`);

    let response: NextResponse;

    if (isProtectedConsoleRoute) {
        response = await protectConsoleRoute(request);
    } else if (isProtectedCustomerDashboardRoute) {
        response = await protectCustomerDashboardRoute(request);
    } else {
        response = NextResponse.next();
    }

    applySecurityHeaders(response, request, {
        internal: isProtectedConsoleRoute,
        customer: isProtectedCustomerDashboardRoute,
    });
    return response;
}

async function protectCustomerDashboardRoute(request: NextRequest) {
    const session = await readCustomerDashboardSession(request);
    if (session.ok) {
        return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", session.safeReturnTo);
    loginUrl.searchParams.set("auth", session.reason === "not-configured" ? "session-unavailable" : "session-required");
    return NextResponse.redirect(loginUrl, { status: 303 });
}

async function readCustomerDashboardSession(request: NextRequest): Promise<CustomerDashboardSessionProjection> {
    const safeReturnTo = safeCustomerDashboardPath(request.nextUrl.pathname) || CUSTOMER_DASHBOARD_DEFAULT_PATH;
    const secret = cleanEnv(process.env[CUSTOMER_SESSION_SECRET_ENV]);
    if (secret.length < 32) return { ok: false, reason: "not-configured", safeReturnTo };

    const value = request.cookies.get(CUSTOMER_SESSION_COOKIE_NAME)?.value || "";
    if (!value) return { ok: false, reason: "missing", safeReturnTo };

    const parts = value.split(".");
    if (parts.length !== 7) return { ok: false, reason: "malformed", safeReturnTo };

    const [version, customerIdHash, signupEmailHash, issuedAt, expiresAt, nonce, signature] = parts;
    const payload = [version, customerIdHash, signupEmailHash, issuedAt, expiresAt, nonce].join(".");
    if (
        version !== CUSTOMER_SESSION_VERSION ||
        !isSafeHash(customerIdHash) ||
        !isSafeHash(signupEmailHash) ||
        !isSafeIntegerString(issuedAt) ||
        !isSafeIntegerString(expiresAt) ||
        !isSafeNonce(nonce) ||
        !isSafeSignature(signature)
    ) {
        return { ok: false, reason: "malformed", safeReturnTo };
    }

    if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) return { ok: false, reason: "expired", safeReturnTo };
    const expectedSignature = await signCustomerSessionPayload(payload, secret);
    if (!safeEqual(signature, expectedSignature)) return { ok: false, reason: "signature-mismatch", safeReturnTo };

    return { ok: true, reason: "valid", safeReturnTo };
}

async function protectConsoleRoute(request: NextRequest) {
    const url = request.nextUrl.clone();

    const accessKey = cleanEnv(process.env.DEFAULT_AI_CONSOLE_ACCESS_KEY);
    const basicCredentials = getBasicCredentials();
    const localBypass = shouldAllowLocalBypass(request, accessKey, basicCredentials);

    if (url.searchParams.get("logout") === "1") {
        url.searchParams.delete("logout");

        const response = NextResponse.redirect(url);
        clearConsoleCookie(response, request);
        return response;
    }

    const expectedSessionToken = accessKey ? await sha256Base64Url(accessKey) : null;
    const currentSessionToken = request.cookies.get(CONSOLE_COOKIE_NAME)?.value ?? "";

    if (expectedSessionToken && safeEqual(currentSessionToken, expectedSessionToken)) {
        return NextResponse.next();
    }

    const accessParam = url.searchParams.get("access");
    if (accessKey && accessParam && safeEqual(accessParam, accessKey)) {
        url.searchParams.delete("access");

        const response = NextResponse.redirect(url);
        setConsoleCookie(response, expectedSessionToken!, request);
        return response;
    }

    if (accessKey && hasValidBearerToken(request, accessKey)) {
        const response = NextResponse.next();
        setConsoleCookie(response, expectedSessionToken!, request);
        return response;
    }

    if (basicCredentials && hasValidBasicAuth(request, basicCredentials)) {
        const response = NextResponse.next();

        if (expectedSessionToken) {
            setConsoleCookie(response, expectedSessionToken, request);
        }

        return response;
    }

    if (localBypass) {
        return NextResponse.next();
    }

    if (!accessKey && !basicCredentials) {
        return misconfiguredConsoleResponse();
    }

    return unauthorizedConsoleResponse();
}

function applySecurityHeaders(
    response: NextResponse,
    request: NextRequest,
    options: { internal: boolean; customer: boolean },
) {
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=()",
    );
    response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
    response.headers.set("X-DNS-Prefetch-Control", "off");

    if (request.nextUrl.protocol === "https:") {
        response.headers.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload",
        );
    }

    if (options.internal || options.customer) {
        response.headers.set(
            "X-Robots-Tag",
            "noindex, nofollow, noarchive, nosnippet",
        );
        response.headers.set(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        );
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set(
            "Vary",
            appendVaryHeader(response.headers.get("Vary"), ["Authorization", "Cookie"]),
        );
    }
}

function unauthorizedConsoleResponse() {
    const response = new NextResponse("Protected internal route.", {
        status: 401,
    });

    response.headers.set(
        "WWW-Authenticate",
        'Basic realm="Cendorq Internal Console", charset="UTF-8"',
    );

    return response;
}

function misconfiguredConsoleResponse() {
    return new NextResponse(
        "Internal console access is not configured for this environment.",
        {
            status: 503,
        },
    );
}

function setConsoleCookie(
    response: NextResponse,
    value: string,
    request: NextRequest,
) {
    response.cookies.set({
        name: CONSOLE_COOKIE_NAME,
        value,
        httpOnly: true,
        sameSite: "lax",
        secure: shouldUseSecureCookies(request),
        path: INTERNAL_CONSOLE_PREFIX,
        maxAge: CONSOLE_COOKIE_TTL_SECONDS,
    });
}

function clearConsoleCookie(response: NextResponse, request: NextRequest) {
    response.cookies.set({
        name: CONSOLE_COOKIE_NAME,
        value: "",
        httpOnly: true,
        sameSite: "lax",
        secure: shouldUseSecureCookies(request),
        path: INTERNAL_CONSOLE_PREFIX,
        expires: new Date(0),
    });
}

function shouldUseSecureCookies(request: NextRequest) {
    if (request.nextUrl.protocol === "https:") {
        return true;
    }

    const nodeEnv = (process.env.NODE_ENV || "").toLowerCase();
    const vercelEnv = (process.env.VERCEL_ENV || "").toLowerCase();

    return nodeEnv === "production" || vercelEnv === "production";
}

function getBasicCredentials(): BasicCredentials | null {
    const username = cleanEnv(process.env.DEFAULT_AI_CONSOLE_USER);
    const password = cleanEnv(process.env.DEFAULT_AI_CONSOLE_PASSWORD);

    if (!username || !password) {
        return null;
    }

    return { username, password };
}

function hasValidBearerToken(request: NextRequest, accessKey: string) {
    const authorization = request.headers.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return false;
    }

    const token = authorization.slice("Bearer ".length).trim();
    return safeEqual(token, accessKey);
}

function hasValidBasicAuth(request: NextRequest, credentials: BasicCredentials) {
    const authorization = request.headers.get("authorization");

    if (!authorization || !authorization.startsWith("Basic ")) {
        return false;
    }

    try {
        const decoded = atob(authorization.slice("Basic ".length).trim());
        const separatorIndex = decoded.indexOf(":");

        if (separatorIndex < 0) {
            return false;
        }

        const username = decoded.slice(0, separatorIndex);
        const password = decoded.slice(separatorIndex + 1);

        return safeEqual(username, credentials.username) && safeEqual(password, credentials.password);
    } catch {
        return false;
    }
}

function shouldAllowLocalBypass(
    request: NextRequest,
    accessKey: string,
    basicCredentials: BasicCredentials | null,
) {
    if (accessKey || basicCredentials) {
        return false;
    }

    const host = request.headers.get("host")?.toLowerCase() ?? "";
    const nodeEnv = (process.env.NODE_ENV || "").toLowerCase();
    const vercelEnv = (process.env.VERCEL_ENV || "").toLowerCase();

    const localHost =
        host.startsWith("localhost") ||
        host.startsWith("127.0.0.1") ||
        host.startsWith("0.0.0.0");

    const nonProduction =
        nodeEnv !== "production" ||
        vercelEnv === "development" ||
        vercelEnv === "preview";

    return localHost && nonProduction;
}

async function signCustomerSessionPayload(payload: string, secret: string) {
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
    const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
    return base64UrlFromBytes(new Uint8Array(signature));
}

async function sha256Base64Url(value: string) {
    const encoded = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    return base64UrlFromBytes(new Uint8Array(digest));
}

function base64UrlFromBytes(bytes: Uint8Array) {
    let binary = "";
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

function safeCustomerDashboardPath(value: string | null | undefined) {
    if (!value) return null;
    return CUSTOMER_DASHBOARD_ALLOWED_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || null;
}

function isSafeHash(value: string) {
    return /^[a-f0-9]{24,96}$/.test(value.trim().toLowerCase());
}

function isSafeIntegerString(value: string) {
    return /^\d{10,12}$/.test(value);
}

function isSafeNonce(value: string) {
    return /^[A-Za-z0-9_-]{16,64}$/.test(value);
}

function isSafeSignature(value: string) {
    return /^[A-Za-z0-9_-]{32,96}$/.test(value);
}

function safeEqual(left: string, right: string) {
    if (!left || !right || left.length !== right.length) return false;
    let difference = 0;
    for (let index = 0; index < left.length; index += 1) {
        difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
    }
    return difference === 0;
}

function cleanEnv(value: string | undefined) {
    return (value || "").trim();
}

function appendVaryHeader(currentValue: string | null, nextValues: string[]) {
    const merged = new Set(
        (currentValue || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    );

    for (const value of nextValues) {
        merged.add(value);
    }

    return [...merged].join(", ");
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};