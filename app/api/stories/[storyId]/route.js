export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { canPlayStory } from "@/lib/entitlement";
import { getStoryAudioFiles, getStoryById } from "@/lib/queries/stories";
import { storyImageUrl } from "@/lib/media";

/**
 * GET /api/stories/[storyId]
 * Fetches story details with access control
 * Returns audio URLs only if user has access
 * @param {Request} request - The request object
 * @param {Object} context - Route context with params
 * @returns {Promise<Response>} JSON response with story details
 */
export async function GET(request, context) {
  try {
    const { storyId } = await context.params;
    const id = Number(storyId);

    // Validate story ID is a valid number
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid story ID" },
        { status: 400 }
      );
    }

    // Fetch story from database
    const story = await getStoryById(id);

    if (!story) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }

    // Get current user (null if not authenticated)
    const user = await getCurrentUser();

    // Check if user can play this story
    const access = await canPlayStory(user?.id || null, id);

    // Only fetch audio files if user has access
    const audioRows = access.canPlay ? await getStoryAudioFiles(id) : [];

    return NextResponse.json({
      success: true,
      story: {
        id: story.id,
        title: story.title,
        description: story.description,
        imageUrl: storyImageUrl(story.image_file),
        isTopPick: Boolean(story.is_top_pick),
        createdAt: story.created_at,
        category: {
          id: story.category_id,
          name: story.category_name,
        },
        subcategory: {
          id: story.subcategory_id,
          name: story.subcategory_name,
        },
        access,
        audio: audioRows.map((row) => ({
          id: row.id,
          language: row.language,
          duration: row.duration,
          audioUrl: access.canPlay ? row.audio_file : null,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching story:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch story" },
      { status: 500 }
    );
  }
}
