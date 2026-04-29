import { prisma } from "@/lib/prisma";

/**
 * Fetches the active subscription for a user
 * A subscription is active if:
 * - subscription.status = 'active'
 * - subscription.end_date >= TODAY
 * - subscription_members.status = 'active'
 * @param {number} userId - The user ID
 * @returns {Promise<object|null>} Active subscription object or null
 */
export async function getActiveSubscriptionForUser(userId) {
  const rows = await prisma.$queryRaw`
    SELECT
      s.id,
      s.owner_user_id,
      s.subscription_plan_id,
      s.start_date,
      s.end_date,
      s.status,
      p.plan_name,
      p.name AS plan_display_name,
      p.price
    FROM subscriptions s
    JOIN subscription_members sm ON sm.subscription_id = s.id
    JOIN subscription_plans p ON p.id = s.subscription_plan_id
    WHERE sm.user_id = ${userId}
      AND sm.status = 'active'
      AND s.status = 'active'
      AND s.end_date >= CURRENT_DATE
    ORDER BY s.end_date DESC
    LIMIT 1
  `;

  return rows[0] || null;
}

/**
 * Fetches all available subscription plans
 * Ordered by price (cheapest first)
 * @returns {Promise<Array>} Array of subscription plan objects
 */
export async function getSubscriptionPlans() {
  return prisma.subscription_plans.findMany({
    orderBy: {
      price: "asc",
    },
  });
}
