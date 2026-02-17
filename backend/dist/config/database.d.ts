import sqlite3 from 'sqlite3';
declare const db: sqlite3.Database;
declare const runAsync: (arg1: string) => Promise<unknown>;
declare const getAsync: (arg1: string) => Promise<unknown>;
declare const allAsync: (arg1: string) => Promise<unknown>;
declare const execAsync: (arg1: string) => Promise<void>;
export declare const initDatabase: () => Promise<void>;
export { db, runAsync, getAsync, allAsync, execAsync };
export default db;
//# sourceMappingURL=database.d.ts.map