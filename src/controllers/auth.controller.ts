import { Request, Response } from "express";
import { loginUserService } from "../services/auth/login.service";
import { HttpError } from "../utils/http-error";

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

