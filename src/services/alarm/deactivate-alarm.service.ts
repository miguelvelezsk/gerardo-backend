import { prisma } from "../../prisma/client";

export const deactivateAlarmService = async (alarmId: string) => {

    const alarmExists = await prisma.alarm.findUnique({
        where: {id: alarmId},
    });

    if (!alarmExists) {
        throw new Error("La alarma no existe");
    }

    const updatedAlarm = await prisma.alarm.update({
        where: {id: alarmId},
        data: {
            lastTriggered: new Date(),
        },
    });

    return updatedAlarm;
}