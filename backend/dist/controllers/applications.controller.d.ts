import { Response } from 'express';
import { AuthRequest } from '../types';
export declare class ApplicationsController {
    /**
     * Submit job application with resume upload
     * POST /api/applications
     */
    static submitApplication(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * Get applicant's own applications
     * GET /api/applications/my-applications
     */
    static getMyApplications(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * Get single application with AI feedback
     * GET /api/applications/:id
     */
    static getApplication(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=applications.controller.d.ts.map