"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = require("../config/database");
class UserModel {
    static async create(email, password_hash, full_name, role) {
        const result = await new Promise((resolve, reject) => {
            database_1.db.run('INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)', [email, password_hash, full_name, role], function (err) {
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
            database_1.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    }
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            database_1.db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            });
        });
    }
    static async getAll() {
        return new Promise((resolve, reject) => {
            database_1.db.all('SELECT * FROM users ORDER BY created_at DESC', [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    static async update(id, updates) {
        const keys = Object.keys(updates).filter(k => k !== 'id' && k !== 'created_at' && k !== 'role');
        if (keys.length === 0)
            return;
        return new Promise((resolve, reject) => {
            const setClause = keys.map(k => `${k} = ?`).join(', ');
            const values = keys.map(k => updates[k]);
            values.push(id);
            database_1.db.run(`UPDATE users SET ${setClause} WHERE id = ?`, values, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map