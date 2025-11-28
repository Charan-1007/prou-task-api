// Note: this project uses the `sqlite` package as a small Promise-based wrapper
// around a low-level driver. We use `sqlite3` as the driver implementation.
// `open(...)` from `sqlite` accepts `driver: sqlite3.Database` so both packages
// are required — `sqlite` gives async/Promise APIs while `sqlite3` is the DB
// engine.
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(__dirname, '../../db/database.sqlite');

export let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export const initializeDatabase = async () => {
    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    const schemaPath = path.resolve(__dirname, '../../db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await db.exec(schema);
    return db;
};

export default initializeDatabase;