import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data.sqlite');
const firstTime = !fs.existsSync(dbPath);
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

export function migrate() {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'business',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sku TEXT,
    price REAL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inventory (
    product_id TEXT PRIMARY KEY,
    quantity INTEGER DEFAULT 0,
    reorder_level INTEGER DEFAULT 0,
    location TEXT,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT,
    status TEXT DEFAULT 'created',
    total REAL DEFAULT 0,
    assigned_driver_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vehicles (
    id TEXT PRIMARY KEY,
    license_plate TEXT,
    model TEXT,
    capacity REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS routes (
    id TEXT PRIMARY KEY,
    origin TEXT,
    destination TEXT,
    waypoints TEXT,
    estimated_time INTEGER,
    distance_km REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  `);

  if (firstTime) {
    const seedId = 'sam-west-admin-1';
    db.prepare('INSERT OR IGNORE INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)')
      .run(seedId, 'samwest.admin@intelliroute.africa', 'admin123', 'Sam West Admin', 'admin');
  }
}

export default db;


