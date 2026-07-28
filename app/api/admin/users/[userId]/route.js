export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

const SAFE_USER_SELECT = {
    id: true,
    name: true,
    email: true,
    plan: true,
    status: true,
    created_at: true,
};

/**
 * GET /api/admin/users/[userId]
 * Fetches a single user's details.
 */
export async function GET(request, context) {
    try {
        await requireAdmin();
        const { userId } = await context.params;
        const id = Number(userId);

        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json(
                { success: false, error: "Invalid user ID." },
                { status: 400 },
            );
        }

        const user = await prisma.users.findUnique({
            where: { id },
            select: SAFE_USER_SELECT,
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found." },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        if (error.message === "Unauthorized") {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 },
            );
        }
        console.error("Admin get user error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch user." },
            { status: 500 },
        );
    }
}

/**
 * PATCH /api/admin/users/[userId]
 * Updates a user's name, email/phone, and/or password.
 * Body: { name?, email?, password? } — all fields optional, only
 * provided fields are updated. Leave password blank to keep it unchanged.
 */
export async function PATCH(request, context) {
    try {
        await requireAdmin();
        const { userId } = await context.params;
        const id = Number(userId);

        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json(
                { success: false, error: "Invalid user ID." },
                { status: 400 },
            );
        }

        const body = await request.json();
        const { name, email, password } = body;

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

        if (email !== undefined) {
            if (!email.trim()) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Email/phone cannot be empty.",
                    },
                    { status: 400 },
                );
            }
            const normalizedEmail = email.trim().toLowerCase();

            const existing = await prisma.users.findUnique({
                where: { email: normalizedEmail },
            });
            if (existing && existing.id !== id) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Another user already uses this email/phone.",
                    },
                    { status: 409 },
                );
            }
            data.email = normalizedEmail;
        }

        if (password !== undefined && password.trim() !== "") {
            if (password.trim().length < 6) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Password must be at least 6 characters.",
                    },
                    { status: 400 },
                );
            }
            data.password = await bcrypt.hash(password.trim(), 12);
        }

        if (Object.keys(data).length === 0) {
            return NextResponse.json(
                { success: false, error: "Nothing to update." },
                { status: 400 },
            );
        }

        const user = await prisma.users.update({
            where: { id },
            data,
            select: SAFE_USER_SELECT,
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        if (error.message === "Unauthorized") {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 },
            );
        }
        if (error.code === "P2025") {
            return NextResponse.json(
                { success: false, error: "User not found." },
                { status: 404 },
            );
        }
        console.error("Admin update user error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update user." },
            { status: 500 },
        );
    }
}

/**
 * DELETE /api/admin/users/[userId]
 * Deletes a user account.
 */
export async function DELETE(request, context) {
    try {
        await requireAdmin();
        const { userId } = await context.params;
        const id = Number(userId);

        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json(
                { success: false, error: "Invalid user ID." },
                { status: 400 },
            );
        }

        await prisma.users.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error.message === "Unauthorized") {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 },
            );
        }
        if (error.code === "P2025") {
            return NextResponse.json(
                { success: false, error: "User not found." },
                { status: 404 },
            );
        }
        console.error("Admin delete user error:", error);
        return NextResponse.json(
            {
                success: false,
                error:
                    "Failed to delete user. They may have related subscriptions/payments records.",
            },
            { status: 500 },
        );
    }
}
