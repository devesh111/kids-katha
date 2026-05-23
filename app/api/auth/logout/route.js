export const runtime = "nodejs";

import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * Clears the auth cookies.
 */
export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: "Logged out.",
    });
    response.cookies.set("storytime_access", "", { maxAge: 0, path: "/" });
    response.cookies.set("storytime_refresh", "", { maxAge: 0, path: "/" });
    return response;
}
