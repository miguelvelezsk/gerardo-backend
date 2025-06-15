import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http-error";

export const authorizeRole = (role: string) => {
    return(req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        if(!user || user.role !== role) {
            return next(new HttpError("No autorizado para esta acción", 403));
        }
        next();
    };
};