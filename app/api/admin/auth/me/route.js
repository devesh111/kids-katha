export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/adminAuth";

/**
 * GET /api/admin/auth/me
 * Returns the currently logged-in admin from the admin access token cookie.
 */
export async function GET() {
    const admin = await getCurrentAdmin();

    if (!admin) {
        return NextResponse.json(
            { success: false, admin: null },
            { status: 401 },
        );
    }

    return NextResponse.json({ success: true, admin });
}
