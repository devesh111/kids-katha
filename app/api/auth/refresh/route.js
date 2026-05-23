export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyRefreshToken, createAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/auth/refresh
 * Issues a new access token using the refresh token cookie.
 */
export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("storytime_refresh")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { success: false, error: "No refresh token." },
                { status: 401 },
            );
        }

        const payload = await verifyRefreshToken(refreshToken);
        if (!payload?.sub) {
            return NextResponse.json(
                { success: false, error: "Invalid or expired refresh token." },
                { status: 401 },
            );
        }

        const user = await prisma.users.findUnique({
            where: { id: Number(payload.sub) },
            select: { id: true, name: true },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found." },
                { status: 401 },
            );
        }

        const newAccessToken = await createAccessToken(user.id, user.name);

        const response = NextResponse.json({
            success: true,
            token: newAccessToken,
        });

        response.cookies.set("storytime_access", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 15,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Refresh error:", error);
        return NextResponse.json(
            { success: false, error: "Something went wrong." },
            { status: 500 },
        );
    }
}
