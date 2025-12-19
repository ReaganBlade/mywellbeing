import Database from 'better-sqlite3';
import path from 'path';
import fs from "fs";
import { app } from "electron";

let db: Database.Database | null = null;

export function getDB() {
    if (db) return db;

    const userDataPath = app.getPath("userData");
    const dbDir = path.join(userDataPath);
    const dbPath = path.join(dbDir, "mywellbeing.db");

    if (!fs.existsSync(dbDir)){
        fs.mkdirSync(dbDir, { recursive: true });
    }

    db = new Database(dbPath);

    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");


    return db;
}