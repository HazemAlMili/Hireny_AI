import { Application } from '../types';
export declare class ApplicationModel {
    static create(job_id: number, applicant_id: number | null, full_name: string, email: string, phone: string, resume_path: string): Promise<Application>;
    static findById(id: number): Promise<Application | undefined>;
    static getAll(): Promise<Application[]>;
    static getByApplicant(applicant_id: number): Promise<Application[]>;
    static getByJob(job_id: number): Promise<Application[]>;
    static updateOpenAIFileId(id: number, openai_file_id: string): Promise<void>;
    static updateStatus(id: number, status: Application['status']): Promise<void>;
    static updateEvaluation(id: number, ai_score: number, ai_feedback: string, status: Application['status']): Promise<void>;
    static getWithJobDetails(): Promise<any[]>;
}
//# sourceMappingURL=application.model.d.ts.map