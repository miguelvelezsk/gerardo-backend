import { NextFunction, Request, Response } from "express";
import { registerUserService } from "../services/user/register-user.service";
import { registerSpecialistService } from "../services/user/register-specialist.service";
import { HttpError } from "../utils/http-error";
import { getUserService } from "../services/user/get-user.service";
import { updateUserService } from "../services/user/updated-patient.service";
import { verifySpecialistService } from "../services/user/verify-specialist.service";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            id,
            name,
            email,
            password,
            role,
            birthDate,
            gender,
            weight,
            height,
            medicalHistory,
            eatingHabits,
        } = req.body;

        const newUser = await registerUserService({
            id,
            name,
            email,
            password,
            birthDate,
            role,
            picture: req.file,
            gender,
            weight: parseFloat(weight),
            height: parseFloat(height),
            medicalHistory,
            eatingHabits,
        });
        res.status(201).json(newUser);
    } catch(error: any) {
        console.error("Error al registrar el usuario");

        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"
        
        res.status(statusCode).json({ error: message });
    }
};

export const registerSpecialist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            id,
            name,
            email,
            password,
            birthDate,
            enterpriseCode
        } = req.body;

        const newSpecialist = await registerSpecialistService({
            id,
            name,
            email,
            password,
            birthDate,
            enterpriseCode,
        });
        res.status(201).json(newSpecialist);
    } catch(error: any) {
        console.error("Error al registrar al especialista");

        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"
        
        res.status(statusCode).json({ error: message });
    }
};

export const verifySpecialist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp } = req.body;
        const picture = req.file;

        const user = await verifySpecialistService({email, otp, picture});

        res.status(201).json(user);
    } catch(error: any) {
        console.error("Error al verificar al especialista");

        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"
        
        res.status(statusCode).json({ error: message });
    }
}

export const getUser = async (req: Request, res: Response) => {
    const {id} = req.query;

    try {
        const user = await getUserService(id as string | undefined);
        res.status(200).json(user);
    } catch (error: any) {
        console.error("Error al obtener al usuario", error);
        
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor";

        res.status(statusCode).json({ error: message });
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, password } = req.body;
    const picture = req.file;

    try {
        const updatedUser = await updateUserService({
            userId,
            password,
            picture,
        });

        res.status(200).json(updatedUser);
    } catch(error: any) {
        console.error("Error al actualizar el usuario", error);
        
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor";

        res.status(statusCode).json({ error: message });
    }
};

