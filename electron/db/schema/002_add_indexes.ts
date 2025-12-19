import type Database from "better-sqlite3";

const version = "002_add_indexes";

const up = (db: Database.Database) => {
    
    // app_session indexes
    db.exec(`CREATE INDEX IF NOT EXISTS idx_sessions_date ON app_sessions(date);`);

    db.exec(`CREATE INDEX IF NOT EXISTS idx_sessions_app ON app_sessions(app_id);`);


    // app_daily_usage index
    db.exec(`CREATE INDEX IF NOT EXISTS idx_app_daily_app ON app_daily_usage(app_id);`);
}

export { version, up };