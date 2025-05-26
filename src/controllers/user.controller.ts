import { Request, Response } from "express";
import { registerUserService } from "../services/user/register-user.service";
import { HttpError } from "../utils/http-error";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const newUser = await registerUserService(req.body);
        res.status(201).json(newUser);
    } catch(error: any) {
        console.error("Error al registrar el usuario");

        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"
        
        res.status(statusCode).json({ error: message });
    }
};

