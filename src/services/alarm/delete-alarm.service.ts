import { prisma } from "../../prisma/client";

export const deleteAlarmService = async(alarmId: string) => {

    const alarmExists = await prisma.alarm.findUnique({
        where: {id: alarmId},
    });

    if(!alarmExists) {
        throw Error("La alarma no existe");
    }

    const deletedAlarm = await prisma.alarm.delete({
        where: {id: alarmId},
    });

    return deletedAlarm;
}