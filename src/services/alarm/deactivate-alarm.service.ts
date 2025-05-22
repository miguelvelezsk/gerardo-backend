import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const deactivateAlarmService = async (alarmId: string) => {

    const alarmExists = await prisma.alarm.findUnique({
        where: {id: alarmId},
    });

    if (!alarmExists) {
        throw new HttpError("Alarma no encontrada", 404);
    }

    const updatedAlarm = await prisma.alarm.update({
        where: {id: alarmId},
        data: {
            lastTriggered: new Date(),
        },
    });

    return updatedAlarm;
}