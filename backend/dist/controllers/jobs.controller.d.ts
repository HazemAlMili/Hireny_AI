import { Response } from 'express';
import { AuthRequest } from '../types';
export declare class JobsController {
    static getActiveJobs(req: AuthRequest, res: Response): Promise<void>;
    static getJob(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getAllJobs(req: AuthRequest, res: Response): Promise<void>;
    static createJob(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateJob(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static deleteJob(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=jobs.controller.d.ts.map