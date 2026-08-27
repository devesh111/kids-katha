import { prisma } from "@/lib/prisma";

/**
 * Fetches all categories ordered by sort_order and name
 * @returns {Promise<Array>} Array of category objects
 */
export async function getCategories() {
    return prisma.categories.findMany({
        orderBy: [{ sort_order: "asc" }, { name: "asc" }],
    });
}

/**
 * Fetches all categories with story count for each
 * Uses raw SQL to join with mp3 table and count stories
 * @returns {Promise<Array>} Array of categories with story_count field
 */
export async function getCategoriesWithStoryCounts() {
    return prisma.$queryRaw`
    SELECT
      c.id,
      c.name,
      c.image,
      c.sort_order,
      COUNT(m.id) AS story_count
    FROM categories c
    LEFT JOIN mp3 m ON m.category_id = c.id
    WHERE c.id <> 10
    GROUP BY c.id, c.name, c.image, c.sort_order
    ORDER BY c.sort_order ASC, c.name ASC
  `;
}

/**
 * Fetches a single category by ID
 * @param {number} categoryId - The category ID
 * @returns {Promise<object|null>} Category object or null if not found
 */
export async function getCategoryById(categoryId) {
    return prisma.categories.findUnique({
        where: {
            id: categoryId,
        },
    });
}

/**
 * Fetches all subcategories for a given category
 * @param {number} categoryId - The category ID
 * @returns {Promise<Array>} Array of subcategory objects
 */
export async function getSubcategoriesByCategory(categoryId) {
    return prisma.subcategories.findMany({
        where: {
            category_id: categoryId,
        },
        orderBy: [{ sort_order: "asc" }, { name: "asc" }],
    });
}
