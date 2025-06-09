import { Request, Response } from "express";
import { registerUserService } from "../services/user/register-user.service";
import { HttpError } from "../utils/http-error";
import { getUserService } from "../services/user/get-user.service";

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

export const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await getUserService(id);
        res.status(200).json(user);
    } catch (error: any) {
        console.error("Error al obtener al usuario", error);
        
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor";

        res.status(statusCode).json({ error: message });
    }
};

