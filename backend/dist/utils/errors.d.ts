export declare class AppError extends Error {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string);
}
export declare const errorHandler: (err: any, req: any, res: any, next: any) => any;
//# sourceMappingURL=errors.d.ts.map