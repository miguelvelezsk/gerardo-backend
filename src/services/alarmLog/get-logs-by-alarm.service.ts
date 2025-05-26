import { prisma } from "../../prisma/client";

export const getAlarmLogsService = async (alarmId: string) => {
    return await prisma.alarmLog.findMany({
        where: {alarmId},
        orderBy: { takenAt: 'desc' },
    });
};