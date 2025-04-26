import { prisma } from "../../prisma/client";

interface createMealLogData {
    patiendId: string;
    mealId: string;
    date?: Date;
}

export const createMealLogService = async (data: createMealLogData) => {

    try {
        const patientExists = await prisma.patient.findUniqueOrThrow({
            where: {id: data.patiendId},  
        });
    } catch (err) {
        console.error("Paciente no encontrado");
    }

    try {
        const mealExists = await prisma.meal.findUniqueOrThrow({
            where: {id: data.mealId},
        });
    } catch(err) {
        console.error("No existe la comida")
    }

    const newMealLog = await prisma.mealLog.create({
        data: {
            patientId: data.patiendId,
            mealId: data.mealId,
            date: data.date ?? new Date(),
        },
    });

    return newMealLog;
}