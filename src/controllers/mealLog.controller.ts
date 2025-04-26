import { Response, Request } from "express";
import { createMealLogService } from "../services/mealLog/create-mealLog.service";

export const createMealLog = async (req: Request, res: Response) => {
    try {
        const newLog = await createMealLogService(req.body);
        res.status(201).json(newLog);
    } catch(err) {
        console.error("Error al registrar el consumo del alimento", err);
        res.status(500).json({ error: "Error al registrar el consumo del alimento"});
    }
};

