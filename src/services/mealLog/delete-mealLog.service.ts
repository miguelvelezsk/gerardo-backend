import { prisma } from "../../prisma/client";

interface deleteMealLogData {
    patientId: string,
    mealId: string,
    date: string,
}

export const deleteMealLogService = async ( data: deleteMealLogData ) => {

    try {
        await prisma.mealLog.findUniqueOrThrow({
            where: {
                patientId_mealId_date: {
                    patientId: data.patientId,
                    mealId: data.mealId,
                    date: data.date,
                },
            },
        });
    } catch(err) {
        throw new Error("El registro de comida no existe");
    }
    
    const deletedMealLog = await prisma.mealLog.delete({
        where: { 
            patientId_mealId_date: {
                patientId: data.patientId,
                mealId: data.mealId,
                date: data.date,
            },
         },
    });

    return deletedMealLog;
};