export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAdminAccessToken } from "@/lib/jwt";

/**
 * POST /api/admin/auth/login
 * Admin/super-admin login. Admin accounts are seeded manually in the
 * database (phpMyAdmin / SQL editor) — there is no self-registration.
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username?.trim() || !password?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Username and password are required.",
                },
                { status: 400 },
            );
        }

        const admin = await prisma.admins.findFirst({
            where: { username: username.trim() },
        });

        if (!admin) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials." },
                { status: 401 },
            );
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials." },
                { status: 401 },
            );
        }

        const accessToken = await createAdminAccessToken(
            admin.id,
            admin.username,
        );

        const response = NextResponse.json({
            success: true,
            message: "Login successful.",
            admin: { id: admin.id, username: admin.username },
        });

        const isProd = process.env.NODE_ENV === "production";

        response.cookies.set("kk_admin_access", accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            maxAge: 60 * 60 * 12, // 12 hours
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Admin login error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Something went wrong. Please try again.",
            },
            { status: 500 },
        );
    }
}
