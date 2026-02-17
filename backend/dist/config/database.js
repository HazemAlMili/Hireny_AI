"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execAsync = exports.allAsync = exports.getAsync = exports.runAsync = exports.db = exports.initDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const util_1 = require("util");
const dbPath = process.env.DATABASE_PATH || './database.sqlite';
const db = new sqlite3_1.default.Database(dbPath);
exports.db = db;
// Promisify database methods
const runAsync = (0, util_1.promisify)(db.run.bind(db));
exports.runAsync = runAsync;
const getAsync = (0, util_1.promisify)(db.get.bind(db));
exports.getAsync = getAsync;
const allAsync = (0, util_1.promisify)(db.all.bind(db));
exports.allAsync = allAsync;
const execAsync = (0, util_1.promisify)(db.exec.bind(db));
exports.execAsync = execAsync;
// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');
// Initialize database schema
const initDatabase = async () => {
    try {
        // Users table
        await runAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('applicant', 'hr')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Jobs table
        await runAsync(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        location TEXT NOT NULL,
        salary_range TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'closed')),
        created_by INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
        // Applications table
        await runAsync(`
      CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_id INTEGER NOT NULL,
        applicant_id INTEGER,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        resume_path TEXT NOT NULL,
        openai_file_id TEXT,
        ai_score INTEGER,
        ai_feedback TEXT,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'evaluating', 'rejected', 'under_review', 'accepted')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        evaluated_at DATETIME,
        FOREIGN KEY (job_id) REFERENCES jobs(id),
        FOREIGN KEY (applicant_id) REFERENCES users(id)
      )
    `);
        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
};
exports.initDatabase = initDatabase;
exports.default = db;
//# sourceMappingURL=database.js.map