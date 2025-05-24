import { prisma } from "../../prisma/client";

export const getAlarmService = async (filters: {
    id?: string,
    name?: string,
}) => {
    const alarms = await prisma.alarm.findMany({
        where: {
            ...(filters.id && {id: filters.id}),
            ...(filters.name && {
                name: {
                    equals: filters.name,
                    mode: "insensitive",
                }
            }),
        },
    });

    return alarms;
};