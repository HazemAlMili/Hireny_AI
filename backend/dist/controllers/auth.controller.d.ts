import { Response } from 'express';
import { AuthRequest } from '../types';
export declare class AuthController {
    static register(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static login(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static me(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateProfile(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=auth.controller.d.ts.map