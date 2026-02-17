"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const database_1 = require("../config/database");
class JobModel {
    static async create(title, description, requirements, location, salary_range, created_by) {
        const result = await new Promise((resolve, reject) => {
            database_1.db.run('INSERT INTO jobs (title, description, requirements, location, salary_range, created_by) VALUES (?, ?, ?, ?, ?, ?)', [title, description, requirements, location, salary_range, created_by], function (err) {
                if (err)
                    reject(err);
                else
                    resolve({ lastID: this.lastID });
            });
        });
        return (await this.findById(result.lastID));
    }
    static async findById(id) {
        return new Promise((resolve, reject) => {
            database_1.db.get('SELECT * FROM jobs WHERE id = ?', [id], (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    }
    static async getAll() {
        return new Promise((resolve, reject) => {
            database_1.db.all('SELECT * FROM jobs ORDER BY created_at DESC', [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    static async getActive() {
        return new Promise((resolve, reject) => {
            database_1.db.all('SELECT * FROM jobs WHERE status = ? ORDER BY created_at DESC', ['active'], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    static async update(id, title, description, requirements, location, salary_range, status) {
        await new Promise((resolve, reject) => {
            database_1.db.run('UPDATE jobs SET title = ?, description = ?, requirements = ?, location = ?, salary_range = ?, status = ? WHERE id = ?', [title, description, requirements, location, salary_range, status, id], (err) => {
                if (err)
                    reject(err);
                else
                    resolve(null);
            });
        });
        return this.findById(id);
    }
    static async delete(id) {
        return new Promise((resolve, reject) => {
            // First delete associated applications due to foreign key constraints
            database_1.db.run('DELETE FROM applications WHERE job_id = ?', [id], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                // Then delete the job
                database_1.db.run('DELETE FROM jobs WHERE id = ?', [id], function (err) {
                    if (err)
                        reject(err);
                    else
                        resolve(this.changes > 0);
                });
            });
        });
    }
}
exports.JobModel = JobModel;
//# sourceMappingURL=job.model.js.map