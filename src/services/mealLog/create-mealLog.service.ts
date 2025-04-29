import { prisma } from "../../prisma/client";

interface createMealLogData {
    patientId: string;
    mealId: string;
    date?: Date;
}

export const createMealLogService = async (data: createMealLogData) => {

    try {
        await prisma.patient.findUniqueOrThrow({
            where: {id: data.patientId},  
        });
    } catch (err) {
        throw new Error("Paciente no encontrado");
    }

    try {
        await prisma.meal.findUniqueOrThrow({
            where: {id: data.mealId},
        });
    } catch(err) {
        throw new Error("No existe la comida")
    }

    const newMealLog = await prisma.mealLog.create({
        data: {
            patientId: data.patientId,
            mealId: data.mealId,
            date: data.date ?? new Date(),
        },
    });

    return newMealLog;
}