import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";

/**
 * Gets the current authenticated user from the access token cookie
 * Returns null if no valid token is found
 * @returns {Promise<object|null>} User object with id and name, or null
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("storytime_access")?.value;

  if (!token) return null;

  const payload = await verifyAccessToken(token);

  if (!payload?.sub) return null;

  return {
    id: Number(payload.sub),
    name: payload.name,
  };
}

/**
 * Requires a user to be authenticated
 * Throws an error if no user is found
 * @returns {Promise<object>} User object with id and name
 * @throws {Error} If user is not authenticated
 */
export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
