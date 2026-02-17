"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const database_1 = require("../config/database");
class ApplicationModel {
    static async create(job_id, applicant_id, full_name, email, phone, resume_path) {
        const result = await new Promise((resolve, reject) => {
            database_1.db.run('INSERT INTO applications (job_id, applicant_id, full_name, email, phone, resume_path) VALUES (?, ?, ?, ?, ?, ?)', [job_id, applicant_id, full_name, email, phone, resume_path], function (err) {
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
            database_1.db.get('SELECT * FROM applications WHERE id = ?', [id], (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    }
    static async getAll() {
        return new Promise((resolve, reject) => {
            database_1.db.all('SELECT * FROM applications ORDER BY created_at DESC', [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    static async getByApplicant(applicant_id) {
        return new Promise((resolve, reject) => {
            database_1.db.all('SELECT * FROM applications WHERE applicant_id = ? ORDER BY created_at DESC', [applicant_id], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    static async getByJob(job_id) {
        return new Promise((resolve, reject) => {
            database_1.db.all('SELECT * FROM applications WHERE job_id = ? ORDER BY created_at DESC', [job_id], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    static async updateOpenAIFileId(id, openai_file_id) {
        return new Promise((resolve, reject) => {
            database_1.db.run('UPDATE applications SET openai_file_id = ? WHERE id = ?', [openai_file_id, id], (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    static async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            database_1.db.run('UPDATE applications SET status = ? WHERE id = ?', [status, id], (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    static async updateEvaluation(id, ai_score, ai_feedback, status) {
        return new Promise((resolve, reject) => {
            database_1.db.run('UPDATE applications SET ai_score = ?, ai_feedback = ?, status = ?, evaluated_at = CURRENT_TIMESTAMP WHERE id = ?', [ai_score, ai_feedback, status, id], (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    static async getWithJobDetails() {
        return new Promise((resolve, reject) => {
            database_1.db.all(`
        SELECT 
          a.*,
          j.title as job_title,
          j.location as job_location
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        ORDER BY a.created_at DESC
      `, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
}
exports.ApplicationModel = ApplicationModel;
//# sourceMappingURL=application.model.js.map