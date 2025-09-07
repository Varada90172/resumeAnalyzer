import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "resumes.db");

// Connect to SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("❌ SQLite connection failed:", err.message);
  else console.log(`✅ SQLite connected: ${dbPath}`);
});

// Ensure table exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name TEXT NOT NULL,
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      name TEXT,
      email TEXT,
      phone TEXT,
      linkedin_url TEXT,
      portfolio_url TEXT,
      summary TEXT,
      work_experience TEXT,
      education TEXT,
      technical_skills TEXT,
      soft_skills TEXT,
      projects TEXT,
      certifications TEXT,
      resume_rating INTEGER,
      improvement_areas TEXT,
      upskill_suggestions TEXT
    )
  `);
});

export default db;