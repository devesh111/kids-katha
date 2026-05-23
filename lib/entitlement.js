import { getActiveSubscriptionForUser } from "@/lib/queries/subscriptions";

/**
 * Set of free story IDs that can be played without subscription
 * Configured via FREE_STORY_IDS environment variable (comma-separated)
 */
const FREE_STORY_IDS = new Set(
    (process.env.FREE_STORY_IDS || "19,22,24,177")
        .split(",")
        .map((id) => Number(id.trim()))
        .filter(Boolean),
);

/**
 * Checks if a story is free to play
 * @param {number} storyId - The story ID to check
 * @returns {boolean} True if the story is free
 */
export function isFreeStory(storyId) {
    return FREE_STORY_IDS.has(storyId);
}

/**
 * Determines if a user can play a specific story
 * Free stories can be played by anyone
 * Premium stories require an active subscription
 * @param {number|null} userId - The user ID (null for guests)
 * @param {number} storyId - The story ID to check
 * @returns {Promise<object>} Object with canPlay boolean and reason string
 */
export async function canPlayStory(userId, storyId) {
    // Free stories can be played by anyone
    if (isFreeStory(storyId)) {
        return {
            canPlay: true,
            reason: "free",
        };
    }

    // Premium stories require login
    if (!userId) {
        return {
            canPlay: false,
            reason: "login_required",
        };
    }

    // Check if user has active subscription
    const subscription = await getActiveSubscriptionForUser(userId);

    return {
        canPlay: Boolean(subscription),
        reason: subscription ? "subscribed" : "subscription_required",
    };
}
