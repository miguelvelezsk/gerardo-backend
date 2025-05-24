import { prisma } from "../../prisma/client";

export const listAlarmsByPatientService = async ({patientId, todaysDay = false}: {
    patientId: string,
    todaysDay?: boolean,
}) => {

    const today = new Date();
    const currentDay = today.getDay();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const alarms = await prisma.alarm.findMany({
        where: { 
            patientId: patientId,
            ...(todaysDay && {
                daysOfWeek: {
                    has: currentDay
                }
            }),
            OR: [
                { lastTriggered: null },
                { lastTriggered: { lt: startOfDay } }
            ],
        },
        orderBy: { time: 'asc' }
    });

    return alarms;
};