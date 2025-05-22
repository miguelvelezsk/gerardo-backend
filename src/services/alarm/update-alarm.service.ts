import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

interface UpdateAlarmData {
    alarmId: string;
    name?: string;
    type?: "MEDICAMENTO" | "SUPLEMENTO";
    daysOfWeek?: number[];
    time?: string;
    notes?: string;
}

export const updateAlarmService = async (data: UpdateAlarmData) => {

    const alarmExists = await prisma.alarm.findUnique({
        where: {id: data.alarmId},
    });

    if (!alarmExists) {
        throw new HttpError("Alarma no encontrada", 404);
    }

    const updatedAlarm = await prisma.alarm.update({
        where: {id: data.alarmId},
        data: {
            name: data.name,
            type: data.type,
            daysOfWeek: data.daysOfWeek,
            time: data.time,
            notes: data.notes,
        },
    });

    return updatedAlarm;
}