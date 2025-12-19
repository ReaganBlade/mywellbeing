import type Database from "better-sqlite3";


const version = "001_initial";

const up = (db: Database.Database) => {
    // Creating apps database

    db.exec(`CREATE TABLE IF NOT EXISTS apps (id INTEGER PRIMARY KEY AUTOINCREMENT, app_id TEXT UNIQUE NOT NULL, display_name TEXT NOT NULL, first_seen_at INTEGER NOT NULL)`);

    // app session database
    db.exec(`CREATE TABLE IF NOT EXISTS app_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, app_id TEXT NOT NULL, start_ts INTEGER NOT NULL, end_ts INTEGER NOT NULL, date TEXT NOT NULL, FOREIGN KEY (app_id) REFERENCES apps(app_id) ON DELETE CASCADE)`);

    // daily_usage database
    db.exec(`CREATE TABLE IF NOT EXISTS daily_usage (date TEXT PRIMARY KEY, total_ms INTEGER NOT NULL)`);

    // app_daily_usage
    db.exec(`CREATE TABLE IF NOT EXISTS app_daily_usage (date TEXT NOT NULL, app_id TEXT NOT NULL, total_ms INTEGER NOT NULL, PRIMARY KEY (date, app_id), FOREIGN KEY (app_id) REFERENCES apps(app_id) ON DELETE CASCADE)`);

}


export { version, up };