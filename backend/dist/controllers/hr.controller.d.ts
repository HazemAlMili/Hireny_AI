import { Response } from 'express';
import { AuthRequest } from '../types';
export declare class HRController {
    /**
     * Get all applications with filters
     * GET /api/hr/applications
     */
    static getAllApplications(req: AuthRequest, res: Response): Promise<void>;
    /**
     * Get single application details
     * GET /api/hr/applications/:id
     */
    static getApplicationDetails(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * Update application status (accept/reject by HR)
     * PUT /api/hr/applications/:id/status
     */
    static updateApplicationStatus(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * Get dashboard statistics
     * GET /api/hr/stats
     */
    static getStats(req: AuthRequest, res: Response): Promise<void>;
    /**
     * Helper to calculate average AI score
     */
    private static calculateAverageScore;
}
//# sourceMappingURL=hr.controller.d.ts.map