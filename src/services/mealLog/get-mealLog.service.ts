import { prisma } from "../../prisma/client";

interface filters {
    patientId?: string;
    mealId?: string;
    date?: string;
}

export const getMealLogService = async (filters: filters) => {

    const mealLogs = await prisma.mealLog.findMany({
        where: {
            ...(filters.patientId && {
                patient: {
                    id: filters.patientId
                },
            }),
            ...(filters.mealId && {
                meal: {
                    id: filters.mealId
                },
            }),
            ...(filters.date && {date: new Date(filters.date)}),
        },
        include: {
            patient: true,
            meal: true,
        },
    });

    return mealLogs;
}