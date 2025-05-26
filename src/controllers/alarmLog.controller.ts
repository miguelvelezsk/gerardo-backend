import { Response, Request } from "express";
import { logAlarmTakenService } from "../services/alarmLog/log-alarm-taken.service";
import { HttpError } from "../utils/http-error";
import { getAlarmLogsService } from "../services/alarmLog/get-logs-by-alarm.service";

export const logAlarmTaken = async (req: Request, res: Response) => {
    try {
        const newLog = await logAlarmTakenService(req.body);
        res.status(201).json(newLog)
    } catch(error: any) {

        const statusCode = error instanceof HttpError ? error.statusCode : 505;
        const message = error.message || "Error interno del servidor";

        res.status(statusCode).json({ error: message });
    }
};

export const getAlarmLogs = async (req: Request, res: Response) => {
    const { alarmId } = req.query;

    try {
        const alarmLogs = await getAlarmLogsService(alarmId as string);

        if(alarmLogs.length == 0) {
            res.status(404).json( { message: "No se encontraron registros con los filtros seleccionados" } );
            return;
        }

        res.status(200).json(alarmLogs);
    } catch(error) {
        res.status(500).json( { error: "Error al obtener los registros" } );
    }
};