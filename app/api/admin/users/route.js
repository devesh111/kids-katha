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
 * GET /api/admin/users
 * Lists all users. Supports an optional ?q= search on name/email.
 */
export async function GET(request) {
    try {
        await requireAdmin();

        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q")?.trim();

        const users = await prisma.users.findMany({
            where: q
                ? {
                      OR: [
                          { name: { contains: q } },
                          { email: { contains: q } },
                      ],
                  }
                : undefined,
            select: SAFE_USER_SELECT,
            orderBy: { created_at: "desc" },
        });

        return NextResponse.json({ success: true, users });
    } catch (error) {
        if (error.message === "Unauthorized") {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 },
            );
        }
        console.error("Admin list users error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch users." },
            { status: 500 },
        );
    }
}

/**
 * POST /api/admin/users
 * Creates a new user with an admin-provided (or generated) password.
 * Body: { name, email, password }
 */
export async function POST(request) {
    try {
        await requireAdmin();

        const body = await request.json();
        const { name, email, password } = body;

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Name, email/phone and password are required.",
                },
                { status: 400 },
            );
        }

        if (password.trim().length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Password must be at least 6 characters.",
                },
                { status: 400 },
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existing = await prisma.users.findUnique({
            where: { email: normalizedEmail },
        });

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    error: "A user with this email/phone already exists.",
                },
                { status: 409 },
            );
        }

        const hashedPassword = await bcrypt.hash(password.trim(), 12);

        const user = await prisma.users.create({
            data: {
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                plan: "individual",
            },
            select: SAFE_USER_SELECT,
        });

        return NextResponse.json({ success: true, user }, { status: 201 });
    } catch (error) {
        if (error.message === "Unauthorized") {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 },
            );
        }
        console.error("Admin create user error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create user." },
            { status: 500 },
        );
    }
}
