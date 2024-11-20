import { NextFunction, Request, Response } from "express";

export class FileParserMiddleware{
    constructor() { }
    single(field: string) {
        return (request: Request, response: Response, next: NextFunction) => {
            try {
                if (!request.file) {
                    throw new Error("No file uploaded");
                }
                request.body[field] = request.file;
                next();
            }
            catch (error) {
                next(error);
            }
        };
    }
}