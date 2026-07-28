import { jwtVerify, SignJWT } from "jose";

/**
 * JWT secret keys for signing and verifying tokens
 * These should be long, random strings in production
 */
const ACCESS_SECRET = new TextEncoder().encode(
    process.env.JWT_ACCESS_SECRET || "dev-access-secret-change-in-production",
);

const REFRESH_SECRET = new TextEncoder().encode(
    process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-in-production",
);

const ADMIN_SECRET = new TextEncoder().encode(
    process.env.JWT_ADMIN_SECRET || "dev-admin-secret-change-in-production",
);

/**
 * Creates a signed JWT access token
 * Access tokens are short-lived (15 minutes)
 * @param {number} userId - The user ID to encode in the token
 * @param {string} name - The user's name
 * @returns {Promise<string>} The signed JWT token
 */
export async function createAccessToken(userId, name) {
    const token = await new SignJWT({
        sub: String(userId),
        name,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(ACCESS_SECRET);

    return token;
}

/**
 * Creates a signed JWT refresh token
 * Refresh tokens are long-lived (30 days)
 * @param {number} userId - The user ID to encode in the token
 * @returns {Promise<string>} The signed JWT token
 */
export async function createRefreshToken(userId) {
    const token = await new SignJWT({
        sub: String(userId),
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("150d")
        .sign(REFRESH_SECRET);

    return token;
}

/**
 * Verifies and decodes an access token
 * @param {string} token - The JWT token to verify
 * @returns {Promise<object|null>} The decoded payload or null if invalid
 */
export async function verifyAccessToken(token) {
    try {
        const verified = await jwtVerify(token, ACCESS_SECRET);
        return verified.payload;
    } catch (error) {
        return null;
    }
}

/**
 * Verifies and decodes a refresh token
 * @param {string} token - The JWT token to verify
 * @returns {Promise<object|null>} The decoded payload or null if invalid
 */
export async function verifyRefreshToken(token) {
    try {
        const verified = await jwtVerify(token, REFRESH_SECRET);
        return verified.payload;
    } catch (error) {
        return null;
    }
}

/**
 * Creates a signed JWT access token for an admin session
 * @param {number} adminId - The admin ID to encode in the token
 * @param {string} username - The admin's username
 * @returns {Promise<string>} The signed JWT token
 */
export async function createAdminAccessToken(adminId, username) {
    const token = await new SignJWT({
        sub: String(adminId),
        username,
        role: "admin",
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("12h")
        .sign(ADMIN_SECRET);

    return token;
}

/**
 * Verifies and decodes an admin access token
 * @param {string} token - The JWT token to verify
 * @returns {Promise<object|null>} The decoded payload or null if invalid
 */
export async function verifyAdminAccessToken(token) {
    try {
        const verified = await jwtVerify(token, ADMIN_SECRET);
        return verified.payload;
    } catch (error) {
        return null;
    }
}
