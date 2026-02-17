import { User } from '../types';
export declare class UserModel {
    static create(email: string, password_hash: string, full_name: string, role: 'applicant' | 'hr'): Promise<User>;
    static findById(id: number): Promise<User | undefined>;
    static findByEmail(email: string): Promise<User | undefined>;
    static getAll(): Promise<User[]>;
    static update(id: number, updates: Partial<User>): Promise<void>;
}
//# sourceMappingURL=user.model.d.ts.map