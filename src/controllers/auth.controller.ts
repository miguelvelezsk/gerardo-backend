import { NextFunction, Request, Response } from "express";
import { loginUserService } from "../services/auth/login.service";
import { HttpError } from "../utils/http-error";
import { refreshAccessTokenService } from "../services/auth/refresh-token.service";
import { verifyAccessToken } from "../utils/jwt.utils";

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { accessToken, refreshToken, user } = await loginUserService(email, password);

        res.status(200).json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    }catch(error: any) {
        console.error("Error de autenticación", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json( {error: "Refresh token es requerido"} )
    }

    try{
        const { accessToken, refreshToken: newRefreshToken } = await refreshAccessTokenService(refreshToken);
        
        res.status(200).json({
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch(error: any) {
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor";

        res.status(statusCode).json({ error: message });
    }
}

