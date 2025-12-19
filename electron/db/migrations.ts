import { getDB } from "./index";
import * as m001 from "./schema/001_initial";
import * as m002 from "./schema/002_add_indexes";

export const runMigrations = () => {
  const db = getDB();
  const migrations = [m001, m002];

  db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations(
        version TEXT PRIMARY KEY, 
        applied_at INTEGER NOT NULL,
    )`);

  const versions = db.prepare(`SELECT version FROM schema_migrations;`).all();

  const appliedVersions = new Set(versions.map((v) => v.version));

  const inst = db.prepare(
    `INSERT INTO schema_migrations (version, applied_at) VALUES (?, ?);`
  );
  
  const txn = db.transaction(() => {
    for (const migration of migrations) {
      if (appliedVersions.has(migration.version)) continue;
      migration.up(db);
      appliedVersions.add(migration.version);

      inst.run(migration.version, Date.now());
    }
  });

  txn();
};
