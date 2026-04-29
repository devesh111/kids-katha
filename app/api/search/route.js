import { NextResponse } from "next/server";
import { searchStories } from "@/lib/queries/stories";
import { serializeBigInt } from "@/lib/serializers";

/**
 * GET /api/search?q=query
 * Searches stories by title, category, or subcategory
 * Public endpoint - no authentication required
 * @param {Request} request - The request object
 * @returns {Promise<Response>} JSON response with search results
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";

    // Return empty results if no query provided
    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        query,
        results: [],
        message: "Query must be at least 2 characters",
      });
    }

    // Search stories in database
    const results = await searchStories(query);

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results: serializeBigInt(results),
    });
  } catch (error) {
    console.error("Error searching stories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search stories" },
      { status: 500 }
    );
  }
}
