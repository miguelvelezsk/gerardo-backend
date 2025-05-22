import { Request, Response } from "express";
import { createAlarmService } from "../services/alarm/create-alarm.service";
import { listAlarmsByPatientService } from "../services/alarm/list-alarms-by-patient.service";
import { updateAlarmService } from "../services/alarm/update-alarm.service";
import { deleteAlarmService } from "../services/alarm/delete-alarm.service";
import { deactivateAlarmService } from "../services/alarm/deactivate-alarm.service";
import { searchAlarmsByPatientService } from "../services/alarm/search-alarm.service";
import { HttpError } from "../utils/http-error";

export const createAlarm = async (req: Request, res:Response) => {
    try {
        const newAlarm = await createAlarmService(req.body);
        res.status(201).json(newAlarm)
    } catch (error: any) {
        console.error("Error al crear la alarma", error);

        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};

export const listAlarmsByPatient = async (req: Request, res: Response) => {
    const { patientId, todaysDay } = req.query;

    if(!patientId || typeof patientId !== 'string') {
        return res.status(400).json({ error: "El documento del paciente es requerido" });
    }

    try {
        const alarms = await listAlarmsByPatientService({
            patientId: patientId as string,
            todaysDay: (todaysDay === "true") as boolean,
        });

        if(alarms.length == 0){
            res.status(404).json( { message: "No se encontraron alarmas asignadas al paciente" } )
            return
        }

        res.status(200).json(alarms)
    } catch(error: any) {
        console.error("Error al obtener las alarmas:", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};

export const listAlarmsForPush = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const alarms = await listAlarmsByPatientService({
            patientId,
            todaysDay: true
        });

        res.status(200).json(alarms);
    } catch(error: any) {
        console.error("Error al obtener las alarmas:", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};

export const updateAlarm = async (req: Request, res: Response) => {
    try {
        const updatedAlarm = await updateAlarmService(req.body);
        res.status(200).json(updatedAlarm);
    } catch(error: any) {
        console.error("Error al obtener las alarmas:", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};

export const deactivateAlarm = async (req: Request, res: Response) => {
    try {
        const { alarmId } = req.body;
        const deactivatedAlarm = await deactivateAlarmService(alarmId);
        res.status(200).json(deactivatedAlarm);
    } catch(error: any) {
        console.error("Error al obtener las alarmas:", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};

export const deleteAlarm = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const deletedAlarm = await deleteAlarmService(id);
        res.status(200).json(deletedAlarm);
    } catch(error: any) {
        console.error("Error al obtener las alarmas:", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};

export const searchAlarmByPatient = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;

        if (!search || typeof search !== "string") {
            res.status(400).json({ error: "El parámetro de búsqueda es requerido." });
            return
        }

        const alarms = await searchAlarmsByPatientService(search);
        res.status(200).json(alarms);
    } catch(error: any) {
        console.error("Error al obtener las alarmas:", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};