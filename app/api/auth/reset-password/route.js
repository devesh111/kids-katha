export const runtime = "nodejs";

import { NextResponse } from "next/server";

/**
 * POST /api/auth/reset-password
 * DISABLED: user accounts are provisioned and managed manually by an
 * admin (no self-registration), and this endpoint had no OTP/identity
 * verification — meaning anyone who knew a user's email/phone could
 * take over their account. Password resets now go through the Admin
 * Dashboard instead. Kept as a stub so old clients get a clear error
 * instead of a silent account takeover.
 */
export async function POST() {
    return NextResponse.json(
        {
            success: false,
            error:
                "Self-service password reset is disabled. Please contact an admin to reset your password.",
        },
        { status: 410 },
    );
}
