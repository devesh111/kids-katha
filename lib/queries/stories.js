import { prisma } from "@/lib/prisma";

/**
 * Fetches a single story by ID with category and subcategory info
 * Uses raw SQL to join with categories and subcategories tables
 * @param {number} storyId - The story ID
 * @returns {Promise<object|null>} Story object with category/subcategory or null
 */
export async function getStoryById(storyId) {
    const rows = await prisma.$queryRaw`
    SELECT
      m.id,
      m.title,
      m.description,
      m.image_file,
      m.is_top_pick,
      m.created_at,
      c.id AS category_id,
      c.name AS category_name,
      s.id AS subcategory_id,
      s.name AS subcategory_name
    FROM mp3 m
    JOIN categories c ON c.id = m.category_id
    JOIN subcategories s ON s.id = m.subcategory_id
    WHERE m.id = ${storyId}
    LIMIT 1
  `;

    return rows[0] || null;
}

/**
 * Fetches all audio files (languages) for a story
 * @param {number} storyId - The story ID
 * @returns {Promise<Array>} Array of audio file objects with language info
 */
export async function getStoryAudioFiles(storyId) {
    return prisma.mp3_languages.findMany({
        where: {
            mp3_id: storyId,
        },
        orderBy: {
            language: "asc",
        },
    });
}

/**
 * Fetches all stories in a category
 * @param {number} categoryId - The category ID
 * @returns {Promise<Array>} Array of story objects
 */
export async function getStoriesByCategory(categoryId) {
    return prisma.mp3.findMany({
        where: {
            category_id: categoryId,
        },
        orderBy: {
            created_at: "asc",
        },
    });
}

/**
 * Fetches all stories in a subcategory
 * @param {number} subcategoryId - The subcategory ID
 * @returns {Promise<Array>} Array of story objects
 */
export async function getStoriesBySubcategory(subcategoryId) {
    return prisma.mp3.findMany({
        where: {
            subcategory_id: subcategoryId,
        },
        orderBy: {
            created_at: "asc",
        },
    });
}

/**
 * Fetches all top pick stories
 * Top picks are marked with is_top_pick = 1
 * @returns {Promise<Array>} Array of top pick story objects
 */
export async function getTopPicks() {
    return prisma.mp3.findMany({
        where: {
            is_top_pick: 1,
        },
        orderBy: {
            created_at: "asc",
        },
    });
}

/**
 * Searches stories by title, category name, or subcategory name
 * Performs case-insensitive LIKE search
 * @param {string} query - The search query
 * @returns {Promise<Array>} Array of matching story objects (max 50)
 */
export async function searchStories(query) {
    const like = `%${query}%`;

    return prisma.$queryRaw`
    SELECT
      m.id,
      m.title,
      m.image_file,
      m.is_top_pick,
      c.id AS category_id,
      c.name AS category_name,
      s.id AS subcategory_id,
      s.name AS subcategory_name
    FROM mp3 m
    JOIN categories c ON c.id = m.category_id
    JOIN subcategories s ON s.id = m.subcategory_id
    WHERE
      (
        m.title LIKE ${like}
        OR c.name LIKE ${like}
        OR s.name LIKE ${like}
    )
    AND c.id <> 10
    ORDER BY m.title ASC
    LIMIT 50
  `;
}
