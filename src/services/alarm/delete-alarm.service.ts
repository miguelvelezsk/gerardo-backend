import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const deleteAlarmService = async(alarmId: string) => {

    const alarmExists = await prisma.alarm.findUnique({
        where: {id: alarmId},
    });

    if(!alarmExists) {
        throw new HttpError("Alarma no encontrada", 404);
    }

    const deletedAlarm = await prisma.alarm.delete({
        where: {id: alarmId},
    });

    return deletedAlarm;
}