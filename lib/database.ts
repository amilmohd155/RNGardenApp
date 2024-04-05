import * as SQLite from "expo-sqlite";

const createPlantTable = (db: SQLite.SQLiteDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS plants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            light TEXT,
            period INTEGER,
            portion INTEGER,
            image TEXT
        );`,
    );
  });
};
