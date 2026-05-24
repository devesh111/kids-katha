export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeBigInt } from "@/lib/serializers";
import { storyImageUrl } from "@/lib/media";

const PAGE_SIZE = 12;

/**
 * GET /api/search?q=&category=&subcategory=&language=&offset=0
 * Supports pagination via offset param for infinite scroll.
 * Filters (categories/subcategories/languages) are only returned on the
 * first page (offset=0) to avoid redundant DB calls on subsequent pages.
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.trim() || "";
        const categoryId = searchParams.get("category");
        const subcategoryId = searchParams.get("subcategory");
        const language = searchParams.get("language");
        const offset = Math.max(
            0,
            parseInt(searchParams.get("offset") || "0", 10),
        );

        const like = `%${query}%`;

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

        let joinLanguage = "";
        if (language && language.trim()) {
            joinLanguage = `JOIN mp3_languages ml ON ml.mp3_id = m.id AND ml.language = ?`;
            params.push(language.trim());
        }

        const whereClause =
            conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

        // Total count for hasMore calculation
        const countRows = await prisma.$queryRawUnsafe(
            `SELECT COUNT(DISTINCT m.id) AS total
             FROM mp3 m
             JOIN categories c ON c.id = m.category_id
             JOIN subcategories s ON s.id = m.subcategory_id
             ${joinLanguage}
             ${whereClause}`,
            ...params,
        );
        const total = Number(countRows[0]?.total || 0);

        // Paginated results
        const results = await prisma.$queryRawUnsafe(
            `SELECT DISTINCT
                m.id, m.title, m.image_file, m.is_top_pick, m.description,
                c.id AS category_id, c.name AS category_name,
                s.id AS subcategory_id, s.name AS subcategory_name
             FROM mp3 m
             JOIN categories c ON c.id = m.category_id
             JOIN subcategories s ON s.id = m.subcategory_id
             ${joinLanguage}
             ${whereClause}
             ORDER BY m.title ASC
             LIMIT ? OFFSET ?`,
            ...params,
            PAGE_SIZE,
            offset,
        );

        // Only fetch filter data on first page load
        let filters = null;
        if (offset === 0) {
            const categories = await prisma.categories.findMany({
                orderBy: [{ sort_order: "asc" }, { name: "asc" }],
                select: { id: true, name: true },
            });

            const subcategories = await prisma.subcategories.findMany({
                orderBy: [{ sort_order: "asc" }, { name: "asc" }],
                select: { id: true, name: true, category_id: true },
            });

            const languages = await prisma.audio_languages.findMany({
                orderBy: { language_name: "asc" },
            });

            filters = {
                categories: serializeBigInt(categories),
                subcategories: serializeBigInt(subcategories),
                languages: serializeBigInt(languages),
            };
        }

        return NextResponse.json({
            success: true,
            query,
            total,
            offset,
            pageSize: PAGE_SIZE,
            hasMore: offset + results.length < total,
            results: serializeBigInt(
                results.map((r) => ({
                    ...r,
                    imageUrl: storyImageUrl(r.image_file),
                    isTopPick: Boolean(r.is_top_pick),
                })),
            ),
            ...(filters && { filters }),
        });
    } catch (error) {
        console.error("Error searching stories:", error);
        return NextResponse.json(
            { success: false, error: "Failed to search stories" },
            { status: 500 },
        );
    }
}
