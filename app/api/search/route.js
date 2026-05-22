export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeBigInt } from "@/lib/serializers";
import { storyImageUrl } from "@/lib/media";

/**
 * GET /api/search?q=query&category=id&subcategory=id&language=en
 * Searches stories with optional filters
 * Public endpoint - no authentication required
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.trim() || "";
        const categoryId = searchParams.get("category");
        const subcategoryId = searchParams.get("subcategory");
        const language = searchParams.get("language");

        const like = `%${query}%`;

        // Build WHERE clauses
        const conditions = [];
        const params = [];

        if (query && query.length >= 2) {
            conditions.push(
                `(m.title LIKE ? OR c.name LIKE ? OR s.name LIKE ?)`,
            );
            params.push(like, like, like);
        }

        if (categoryId && Number(categoryId) > 0) {
            conditions.push(`m.category_id = ?`);
            params.push(Number(categoryId));
        }

        if (subcategoryId && Number(subcategoryId) > 0) {
            conditions.push(`m.subcategory_id = ?`);
            params.push(Number(subcategoryId));
        }

        // For language filter, join mp3_languages table
        let joinLanguage = "";
        if (language && language.trim()) {
            joinLanguage = `JOIN mp3_languages ml ON ml.mp3_id = m.id AND ml.language = ?`;
            params.push(language.trim());
        }

        const whereClause =
            conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

        const results = await prisma.$queryRawUnsafe(
            `SELECT DISTINCT
        m.id,
        m.title,
        m.image_file,
        m.is_top_pick,
        m.description,
        c.id AS category_id,
        c.name AS category_name,
        s.id AS subcategory_id,
        s.name AS subcategory_name
      FROM mp3 m
      JOIN categories c ON c.id = m.category_id
      JOIN subcategories s ON s.id = m.subcategory_id
      ${joinLanguage}
      ${whereClause}
      ORDER BY m.title ASC
      LIMIT 100`,
            ...params,
        );

        // Fetch all categories and subcategories for filter sidebar
        const categories = await prisma.categories.findMany({
            orderBy: [{ sort_order: "asc" }, { name: "asc" }],
            select: { id: true, name: true },
        });

        const subcategories =
            categoryId && Number(categoryId) > 0
                ? await prisma.subcategories.findMany({
                      where: { category_id: Number(categoryId) },
                      orderBy: [{ sort_order: "asc" }, { name: "asc" }],
                      select: { id: true, name: true, category_id: true },
                  })
                : await prisma.subcategories.findMany({
                      orderBy: [{ sort_order: "asc" }, { name: "asc" }],
                      select: { id: true, name: true, category_id: true },
                  });

        const languages = await prisma.audio_languages.findMany({
            orderBy: { language_name: "asc" },
        });

        return NextResponse.json({
            success: true,
            query,
            count: results.length,
            results: serializeBigInt(
                results.map((r) => ({
                    ...r,
                    imageUrl: storyImageUrl(r.image_file),
                    isTopPick: Boolean(r.is_top_pick),
                })),
            ),
            filters: {
                categories: serializeBigInt(categories),
                subcategories: serializeBigInt(subcategories),
                languages: serializeBigInt(languages),
            },
        });
    } catch (error) {
        console.error("Error searching stories:", error);
        return NextResponse.json(
            { success: false, error: "Failed to search stories" },
            { status: 500 },
        );
    }
}
