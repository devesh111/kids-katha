export const runtime = "nodejs";

import { NextResponse } from "next/server";
import {
    getCategoryById,
    getSubcategoriesByCategory,
} from "@/lib/queries/categories";
import { serializeBigInt } from "@/lib/serializers";
import { categoryImageUrl } from "@/lib/media";

/**
 * GET /api/categories/[categoryId]
 * Fetches a single category with its subcategories
 * Public endpoint - no authentication required
 */
export async function GET(request, context) {
    try {
        const { categoryId } = await context.params;
        const id = Number(categoryId);

        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json(
                { success: false, error: "Invalid category ID" },
                { status: 400 },
            );
        }

        const category = await getCategoryById(id);

        if (!category) {
            return NextResponse.json(
                { success: false, error: "Category not found" },
                { status: 404 },
            );
        }

        const subcategories = await getSubcategoriesByCategory(id);

        return NextResponse.json({
            success: true,
            category: {
                ...serializeBigInt(category),
                imageUrl: category.image
                    ? categoryImageUrl(category.image)
                    : null,
            },
            subcategories: subcategories.map((sub) => ({
                ...serializeBigInt(sub),
                imageUrl: sub.image ? categoryImageUrl(sub.image) : null,
            })),
        });
    } catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch category" },
            { status: 500 },
        );
    }
}
