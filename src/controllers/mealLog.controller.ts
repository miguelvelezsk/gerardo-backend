import { Response, Request } from "express";
import { createMealLogService } from "../services/mealLog/create-mealLog.service";
import { getMealLogService } from "../services/mealLog/get-mealLog.service";
import { deleteMealLogService } from "../services/mealLog/delete-mealLog.service";

export const createMealLog = async (req: Request, res: Response) => {
    try {
        const newLog = await createMealLogService(req.body);
        res.status(201).json(newLog);
    } catch(err) {
        console.error("Error al registrar el consumo del alimento", err);
        res.status(500).json({ error: "Error al registrar el consumo del alimento"});
    }
};

export const getMealLogs = async (req: Request, res: Response) => {
    const {patientId, mealId, date} = req.query;

    try {
        const mealLogs = await getMealLogService({
            patientId: patientId as string,
            mealId: mealId as string,
            date: date as string,
        });

        if(mealLogs.length == 0) {
            res.status(404).json( { message: "No se encontraron registros con los filtros seleccionados" } );
            return
        }

        res.status(200).json(mealLogs);
    } catch(err) {
        console.error("Error al obtener los mealLogs", err);
        res.status(500).json( { error: "Error al obtener los registros de comidas" } );
    }
};

export const deleteMealLog = async (req: Request, res: Response) => {

    try {
        const deletedMealLog = await deleteMealLogService(req.body);
        res.status(200).json( deletedMealLog);
    } catch(err) {
        console.error("Error al eliminar el registro de comida");
        res.status(500).json( { error: "Error al eliminar el registro de comida" } );
    }
};



