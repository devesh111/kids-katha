export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/auth/me
 * Returns the currently logged-in user from the access token cookie.
 */
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("storytime_access")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, user: null },
                { status: 401 },
            );
        }

        const payload = await verifyAccessToken(token);
        if (!payload?.sub) {
            return NextResponse.json(
                { success: false, user: null },
                { status: 401 },
            );
        }

        const user = await prisma.users.findUnique({
            where: { id: Number(payload.sub) },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                plan: true,
                subscription_expiry: true,
                created_at: true,
                subscriptions: {
                    where: { status: "active" },
                    orderBy: { created_at: "desc" },
                    take: 1,
                    select: {
                        id: true,
                        start_date: true,
                        end_date: true,
                        status: true,
                        access_code: true,
                        subscription_plans: {
                            select: {
                                id: true,
                                name: true,
                                plan_name: true,
                                duration: true,
                                price: true,
                            },
                        },
                        subscription_members: {
                            where: { status: "active" },
                            select: {
                                id: true,
                                role: true,
                                joined_at: true,
                                users: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, user: null },
                { status: 401 },
            );
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Auth me error:", error);
        return NextResponse.json(
            { success: false, user: null },
            { status: 500 },
        );
    }
}
