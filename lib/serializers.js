/**
 * Serializes values containing BigInt to regular numbers
 * Prisma raw queries may return bigint which cannot be JSON serialized
 * This helper converts them to regular numbers for API responses
 * @param {*} value - The value to serialize
 * @returns {*} Serialized value with BigInt converted to Number
 */
export function serializeBigInt(value) {
    return JSON.parse(
        JSON.stringify(value, (_, item) =>
            typeof item === "bigint" ? Number(item) : item,
        ),
    );
}
