export const runtime = "nodejs";

import { NextResponse } from "next/server";

/**
 * POST /api/admin/auth/logout
 * Clears the admin auth cookie.
 */
export async function POST() {
    const response = NextResponse.json({
        success: true,
        message: "Logged out.",
    });
    response.cookies.set("kk_admin_access", "", { maxAge: 0, path: "/" });
    return response;
}
