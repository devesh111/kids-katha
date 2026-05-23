export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/auth/reset-password
 * Resets a user's password directly (OTP bypassed for now).
 * Body: { identifier, newPassword, confirmPassword }
 * identifier can be email or phone (both stored in the email column).
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { identifier, newPassword, confirmPassword } = body;

        // ── Validation ────────────────────────────────────────────────
        if (!identifier?.trim()) {
            return NextResponse.json(
                { success: false, error: "Email or phone number is required." },
                { status: 400 },
            );
        }

        if (!newPassword || newPassword.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Password must be at least 6 characters.",
                },
                { status: 400 },
            );
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { success: false, error: "Passwords do not match." },
                { status: 400 },
            );
        }

        // ── Find user ─────────────────────────────────────────────────
        const input = identifier.trim().toLowerCase();

        const user = await prisma.users.findFirst({
            where: { email: input },
            select: { id: true, name: true },
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    error: "No account found with that email or phone number.",
                },
                { status: 404 },
            );
        }

        // ── Hash & update ─────────────────────────────────────────────
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.users.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({
            success: true,
            message: "Password reset successfully. You can now log in.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Something went wrong. Please try again.",
            },
            { status: 500 },
        );
    }
}
