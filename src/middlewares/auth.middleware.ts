import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";
import { HttpError } from "../utils/http-error";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new HttpError("Token no proporcionado", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyAccessToken(token);
      req.user = {
          id: decoded?.id,
          role: decoded?.role,
          email: decoded?.email
      };
      next();
    } catch(error: any) {
        throw new HttpError("Token inválido", 401);
    }
}