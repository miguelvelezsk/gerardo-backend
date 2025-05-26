import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const logAlarmTakenService = async ( alarmId: string) => {
    try {
        await prisma.alarm.findFirstOrThrow({
            where: {id: alarmId},
        });

    } catch(error) {
        throw new HttpError("Alarma no encontrada", 404);
    }

    const log = await prisma.alarmLog.create({
        data: {
            alarmId
        }
    });

    return log;

};