/**
 * Determines if a (possibly anonymous) visitor can play a story's audio.
 * Story metadata (title, description, categories, etc.) is always public;
 * only playback of the actual audio requires a logged-in account.
 * @param {number|null} userId - The user ID (null for guests)
 * @returns {{canPlay: boolean, reason: string}}
 */
export function canPlayAudio(userId) {
    if (!userId) {
        return { canPlay: false, reason: "login_required" };
    }
    return { canPlay: true, reason: "logged_in" };
}
