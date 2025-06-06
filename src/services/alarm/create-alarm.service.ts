import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error"

interface CreateAlarmData {
    patientId: string;
    name: string;
    type: "MEDICAMENTO" | "SUPLEMENTO";
    time: string;
    daysOfWeek: number[];
    notes?: string;
}

export const createAlarmService = async (data: CreateAlarmData) => {

    if(data.patientId) {
        const patientExists = await prisma.patient.findUnique({
            where: {id: data.patientId}
        });

        if(!patientExists) {
            throw new HttpError("Paciente no encontrado", 404);
        }
    }

    const newAlarm = await prisma.alarm.create({
        data: {
            name: data.name,
            type: data.type,
            time: data.time,
            daysOfWeek: data.daysOfWeek,
            notes: data.notes,
            patient: {
                connect: {
                    id: data.patientId
                },
            },
        },
    });

    return newAlarm;
};