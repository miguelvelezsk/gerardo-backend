import { prisma } from "../../prisma/client";

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
        throw new Error("La alarma no existe");
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