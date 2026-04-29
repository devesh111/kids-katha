/**
 * Constructs a full media URL from a relative path
 * Uses MEDIA_BASE_URL environment variable as the base
 * @param {string} path - The relative path to the media file
 * @returns {string|null} The full media URL or null if path is empty
 */
export function mediaUrl(path) {
  if (!path) return null;
  const baseUrl = process.env.MEDIA_BASE_URL || "https://media.example.com/";
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

/**
 * Constructs a full URL for story images
 * Story images are stored in uploads/mp3_images/ directory
 * @param {string} file - The image filename
 * @returns {string|null} The full image URL or null if file is empty
 */
export function storyImageUrl(file) {
  if (!file) return null;
  return mediaUrl(`uploads/mp3_images/${file}`);
}
