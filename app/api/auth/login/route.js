export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createAccessToken, createRefreshToken } from "@/lib/jwt";

/**
 * POST /api/auth/login
 * Accepts email or phone number + password.
 * Since the users table has no phone column, phone input is matched against
 * the email column as a fallback (future-proof: add phone col and update query).
 * Returns a JWT access token in the response body and sets:
 *   - storytime_access  (HTTP-only, 15 min)
 *   - storytime_refresh (HTTP-only, 30 days)
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { identifier, password } = body;

        if (!identifier?.trim() || !password?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Email / phone and password are required.",
                },
                { status: 400 },
            );
        }

        // The `email` column stores both email addresses and phone numbers
        const input = identifier.trim().toLowerCase();

        const user = await prisma.users.findFirst({
            where: { email: input },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                status: true,
                plan: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials." },
                { status: 401 },
            );
        }

        // Verify password (bcrypt hash expected in DB)
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials." },
                { status: 401 },
            );
        }

        // Issue tokens
        const accessToken = await createAccessToken(user.id, user.name);
        const refreshToken = await createRefreshToken(user.id);

        const response = NextResponse.json({
            success: true,
            message: "Login successful.",
            token: accessToken, // also returned in body for clients that need it
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                status: user.status,
                plan: user.plan,
            },
        });

        // HTTP-only cookies so JS can't steal them
        const isProd = process.env.NODE_ENV === "production";

        response.cookies.set("storytime_access", accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            maxAge: 60 * 15, // 15 minutes
            path: "/",
        });

        response.cookies.set("storytime_refresh", refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Something went wrong. Please try again.",
            },
            { status: 500 },
        );
    }
}
