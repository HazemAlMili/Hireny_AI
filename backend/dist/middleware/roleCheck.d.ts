import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare const requireHR: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const requireApplicant: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=roleCheck.d.ts.map