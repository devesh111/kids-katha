export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

/**
 * GET /api/profile
 * Returns the logged-in user's own profile (name, email/phone).
 */
export async function GET() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 },
        );
    }

    const user = await prisma.users.findUnique({
        where: { id: currentUser.id },
        select: { id: true, name: true, email: true, created_at: true },
    });

    if (!user) {
        return NextResponse.json(
            { success: false, error: "User not found." },
            { status: 404 },
        );
    }

    return NextResponse.json({ success: true, user });
}

/**
 * PATCH /api/profile
 * Lets a logged-in user update ONLY their name and/or password.
 * Email/phone cannot be changed by the user (admin-managed).
 * Body: { name?, currentPassword?, newPassword? }
 * currentPassword + newPassword are both required together to change password.
 */
export async function PATCH(request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 },
        );
    }

    try {
        const body = await request.json();
        const { name, currentPassword, newPassword } = body;

        const data = {};

        if (name !== undefined) {
            if (!name.trim()) {
                return NextResponse.json(
                    { success: false, error: "Name cannot be empty." },
                    { status: 400 },
                );
            }
            data.name = name.trim();
        }

        const wantsPasswordChange =
            newPassword !== undefined && newPassword.trim() !== "";

        if (wantsPasswordChange) {
            if (!currentPassword?.trim()) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Current password is required to set a new password.",
                    },
                    { status: 400 },
                );
            }

            if (newPassword.trim().length < 6) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "New password must be at least 6 characters.",
                    },
                    { status: 400 },
                );
            }

            const user = await prisma.users.findUnique({
                where: { id: currentUser.id },
                select: { password: true },
            });

            const passwordMatch = await bcrypt.compare(
                currentPassword.trim(),
                user.password,
            );

            if (!passwordMatch) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Current password is incorrect.",
                    },
                    { status: 401 },
                );
            }

            data.password = await bcrypt.hash(newPassword.trim(), 12);
        }

        if (Object.keys(data).length === 0) {
            return NextResponse.json(
                { success: false, error: "Nothing to update." },
                { status: 400 },
            );
        }

        const updated = await prisma.users.update({
            where: { id: currentUser.id },
            data,
            select: { id: true, name: true, email: true },
        });

        return NextResponse.json({ success: true, user: updated });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json(
            { success: false, error: "Something went wrong." },
            { status: 500 },
        );
    }
}
