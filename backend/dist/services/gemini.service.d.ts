import { AIEvaluationResult, Job } from '../types';
export declare class GeminiService {
    /**
     * Evaluate resume against job requirements using Google Gemini
     */
    static evaluateResume(resumePath: string, job: Job): Promise<AIEvaluationResult>;
    /**
     * Extract text content from resume file
     * Supports: TXT, PDF, DOCX
     */
    private static extractResumeText;
}
//# sourceMappingURL=gemini.service.d.ts.map