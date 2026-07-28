/**
 * Generates a random password for admins to assign to new/existing users
 * Avoids visually ambiguous characters (0/O, 1/l/I)
 * @param {number} length - Desired password length (default 10)
 * @returns {string} A random password
 */
export function generatePassword(length = 10) {
    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%";
    let out = "";
    for (let i = 0; i < length; i++) {
        out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
}
