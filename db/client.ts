import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

const expo = openDatabaseSync("plants.db");

const db = drizzle(expo);

export { expo };
export default db;
