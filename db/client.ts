import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

const expo = openDatabaseSync("plant.db");

const db = drizzle(expo, { logger: true });

export { expo };
export default db;
