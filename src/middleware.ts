import { NextRequest, NextResponse } from "next/server";

const INTERNAL_CONSOLE_PREFIX = "/intake-console";
const CONSOLE_COOKIE_NAME = "da_console_session";
const CONSOLE_COOKIE_TTL_SECONDS = 60 * 60 * 8;

type BasicCredentials = {
    username: string;
    password: string;
};

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isProtectedConsoleRoute = pathname === INTERNAL_CONSOLE_PREFIX || pathname.startsWith(`${INTERNAL_CONSOLE_PREFIX}/`);

    let response: NextResponse;

    if (isProtectedConsoleRoute) {
        response = await protectConsoleRoute(request);
    } else {
        response = NextResponse.next();
    }

    applySecurityHeaders(response, request, { internal: isProtectedConsoleRoute });
    return response;
}

async function protectConsoleRoute(request: NextRequest) {
    const url = request.nextUrl.clone();

    const accessKey = cleanEnv(process.env.DEFAULT_AI_CONSOLE_ACCESS_KEY);
    const basicCredentials = getBasicCredentials();
    const localBypass = shouldAllowLocalBypass(request, accessKey, basicCredentials);

    if (url.searchParams.get("logout") === "1") {
        url.searchParams.delete("logout");

        const response = NextResponse.redirect(url);
        clearConsoleCookie(response);
        return response;
    }

    const expectedSessionToken = accessKey ? await sha256Base64Url(accessKey) : null;
    const currentSessionToken = request.cookies.get(CONSOLE_COOKIE_NAME)?.value ?? "";

    if (expectedSessionToken && currentSessionToken === expectedSessionToken) {
        return NextResponse.next();
    }

    const accessParam = url.searchParams.get("access");
    if (accessKey && accessParam && accessParam === accessKey) {
        url.searchParams.delete("access");

        const response = NextResponse.redirect(url);
        setConsoleCookie(response, expectedSessionToken!);
        return response;
    }

    if (accessKey && hasValidBearerToken(request, accessKey)) {
        const response = NextResponse.next();
        setConsoleCookie(response, expectedSessionToken!);
        return response;
    }

    if (basicCredentials && hasValidBasicAuth(request, basicCredentials)) {
        const response = NextResponse.next();

        if (expectedSessionToken) {
            setConsoleCookie(response, expectedSessionToken);
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
    options: { internal: boolean },
) {
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
    response.headers.set("X-DNS-Prefetch-Control", "off");

    if (request.nextUrl.protocol === "https:") {
        response.headers.set(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains; preload",
        );
    }

    if (options.internal) {
        response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Vary", appendVaryHeader(response.headers.get("Vary"), ["Authorization", "Cookie"]));
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

function setConsoleCookie(response: NextResponse, value: string) {
    response.cookies.set({
        name: CONSOLE_COOKIE_NAME,
        value,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: INTERNAL_CONSOLE_PREFIX,
        maxAge: CONSOLE_COOKIE_TTL_SECONDS,
    });
}

function clearConsoleCookie(response: NextResponse) {
    response.cookies.set({
        name: CONSOLE_COOKIE_NAME,
        value: "",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: INTERNAL_CONSOLE_PREFIX,
        expires: new Date(0),
    });
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
    return token === accessKey;
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

        return (
            username === credentials.username &&
            password === credentials.password
        );
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

async function sha256Base64Url(value: string) {
    const encoded = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    const bytes = Array.from(new Uint8Array(digest));

    let binary = "";
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
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
