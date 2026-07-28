import { NextResponse } from "next/server";

/**
 * Lightweight cookie-presence redirect for protected sections.
 * This is a UX convenience, NOT the source of truth for authorization —
 * every API route independently verifies the JWT server-side
 * (see lib/auth.js requireUser() and lib/adminAuth.js requireAdmin()).
 */
export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const token = request.cookies.get("kk_admin_access")?.value;
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    if (pathname === "/profile") {
        const token = request.cookies.get("storytime_access")?.value;
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/profile"],
};
