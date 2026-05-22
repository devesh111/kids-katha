export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStoriesBySubcategory } from "@/lib/queries/stories";
import { serializeBigInt } from "@/lib/serializers";
import { mediaUrl, storyImageUrl } from "@/lib/media";

/**
 * GET /api/subcategories/[subcategoryId]
 * Fetches subcategory details with all stories in that subcategory
 * Public endpoint - no authentication required
 */
export async function GET(request, context) {
    try {
        const { subcategoryId } = await context.params;
        const id = Number(subcategoryId);

        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json(
                { success: false, error: "Invalid subcategory ID" },
                { status: 400 },
            );
        }

        const subcategory = await prisma.subcategories.findUnique({
            where: { id },
        });

        if (!subcategory) {
            return NextResponse.json(
                { success: false, error: "Subcategory not found" },
                { status: 404 },
            );
        }

        const stories = await getStoriesBySubcategory(id);

        return NextResponse.json({
            success: true,
            subcategory: {
                id: subcategory.id,
                name: subcategory.name,
                category_id: subcategory.category_id,
                imageUrl: subcategory.image
                    ? mediaUrl(subcategory.image)
                    : null,
                sortOrder: subcategory.sort_order,
            },
            stories: serializeBigInt(
                stories.map((story) => ({
                    id: story.id,
                    title: story.title,
                    description: story.description,
                    imageUrl: storyImageUrl(story.image_file),
                    isTopPick: Boolean(story.is_top_pick),
                    createdAt: story.created_at,
                })),
            ),
        });
    } catch (error) {
        console.error("Error fetching subcategory:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch subcategory" },
            { status: 500 },
        );
    }
}
