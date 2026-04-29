import { prisma } from "@/lib/prisma";

/**
 * Fetches a user by email address
 * Used for login and user lookup
 * @param {string} identifier - The user's email address
 * @returns {Promise<object|null>} User object or null if not found
 */
export async function getUserByIdentifier(identifier) {
  return prisma.users.findUnique({
    where: {
      email: identifier,
    },
  });
}

/**
 * Fetches a user by ID with safe fields only
 * Excludes sensitive fields like password hash
 * @param {number} userId - The user ID
 * @returns {Promise<object|null>} Safe user object or null if not found
 */
export async function getSafeUserById(userId) {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      subscription_expiry: true,
      subscription_plan_id: true,
      access_code: true,
      status: true,
      created_at: true,
    },
  });
}
