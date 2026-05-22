export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCategoriesWithStoryCounts } from "@/lib/queries/categories";
import { serializeBigInt } from "@/lib/serializers";

/**
 * GET /api/categories
 * Fetches all categories with story counts
 * Public endpoint - no authentication required
 * @returns {Promise<Response>} JSON response with categories array
 */
export async function GET() {
    try {
        const categories = await getCategoriesWithStoryCounts();

        return NextResponse.json({
            success: true,
            categories: serializeBigInt(categories),
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch categories" },
            { status: 500 },
        );
    }
}
