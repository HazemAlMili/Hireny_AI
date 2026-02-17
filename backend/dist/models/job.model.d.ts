import { Job } from '../types';
export declare class JobModel {
    static create(title: string, description: string, requirements: string, location: string, salary_range: string, created_by: number): Promise<Job>;
    static findById(id: number): Promise<Job | undefined>;
    static getAll(): Promise<Job[]>;
    static getActive(): Promise<Job[]>;
    static update(id: number, title: string, description: string, requirements: string, location: string, salary_range: string, status: 'active' | 'closed'): Promise<Job | undefined>;
    static delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=job.model.d.ts.map