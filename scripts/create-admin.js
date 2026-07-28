/**
 * Dev-only helper: generates a bcrypt password hash and ready-to-run SQL
 * for manually inserting a new row into the `admins` table (phpMyAdmin /
 * SQL editor). There is intentionally no in-app UI for creating admins.
 *
 * Usage:
 *   node scripts/create-admin.js <username> <password>
 *
 * Example:
 *   node scripts/create-admin.js superadmin "MyStrongPass123!"
 */
const bcrypt = require("bcryptjs");

const [, , username, password] = process.argv;

if (!username || !password) {
    console.error("Usage: node scripts/create-admin.js <username> <password>");
    process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
    console.log("\nBcrypt hash for password:\n" + hash);
    console.log("\nRun this SQL (e.g. in phpMyAdmin) to create the admin:\n");
    console.log(
        `INSERT INTO admins (username, password) VALUES (${JSON.stringify(
            username,
        )}, ${JSON.stringify(hash)});\n`,
    );
});
