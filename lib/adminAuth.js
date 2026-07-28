import { cookies } from "next/headers";
import { verifyAdminAccessToken } from "@/lib/jwt";

/**
 * Gets the current authenticated admin from the admin access token cookie
 * Returns null if no valid token is found
 * @returns {Promise<object|null>} Admin object with id and username, or null
 */
export async function getCurrentAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("kk_admin_access")?.value;

    if (!token) return null;

    const payload = await verifyAdminAccessToken(token);

    if (!payload?.sub || payload.role !== "admin") return null;

    return {
        id: Number(payload.sub),
        username: payload.username,
    };
}

/**
 * Requires an admin to be authenticated
 * Throws an error if no admin is found
 * @returns {Promise<object>} Admin object with id and username
 * @throws {Error} If admin is not authenticated
 */
export async function requireAdmin() {
    const admin = await getCurrentAdmin();

    if (!admin) {
        throw new Error("Unauthorized");
    }

    return admin;
}
