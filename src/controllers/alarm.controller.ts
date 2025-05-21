import { Request, Response } from "express";
import { createAlarmService } from "../services/alarm/create-alarm.service";
import { listAlarmsByPatientService } from "../services/alarm/list-alarms-by-patient.service";
import { updateAlarmService } from "../services/alarm/update-alarm.service";
import { deleteAlarmService } from "../services/alarm/delete-alarm.service";
import { deactivateAlarmService } from "../services/alarm/deactivate-alarm.service";

export const createAlarm = async (req: Request, res:Response) => {
    try {
        const newAlarm = await createAlarmService(req.body);
        res.status(201).json(newAlarm)
    } catch (error) {
        console.error("Error al crear la alarma", error);
        res.status(500).json({ error: "Error al crear la alarma" });
    }
};

export const listAlarmsByPatient = async (req: Request, res: Response) => {
    const { patientId, todaysDay } = req.query;

    if(!patientId || typeof patientId !== 'string') {
        return res.status(400).json({ error: "patientId es requerido" });
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
    } catch(error) {
        console.error("Error al obtener las alarmas:", error);
        res.status(500).json({ error: "Error al obtener las alarmas" });
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
    } catch (error) {
        console.error("Error al listar alarmas para notificación:", error);
        res.status(500).json({ error: "Error al obtener alarmas para notificación" });
    }
};

export const updateAlarm = async (req: Request, res: Response) => {
    try {
        const updatedAlarm = await updateAlarmService(req.body);
        res.status(200).json(updatedAlarm);
    } catch(error) {
        console.error("Error al modificar la alarma:", error);
        res.status(500).json({ error: "Error al modificar la alarma" });
    }
};

export const deactivateAlarm = async (req: Request, res: Response) => {
    try {
        const { alarmId } = req.body;
        const deactivatedAlarm = await deactivateAlarmService(alarmId);
        res.status(200).json(deactivatedAlarm);
    } catch(error) {
        console.error("Error al desactivar la alarma:", error);
        res.status(500).json({ error: "Error al desactivar la alarma" });
    }
};

export const deleteAlarm = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const deletedAlarm = await deleteAlarmService(id);
        res.status(200).json(deletedAlarm);
    } catch(error) {
        res.status(500).json({ error: "Error al eliminar la alarma" });
    }
};
