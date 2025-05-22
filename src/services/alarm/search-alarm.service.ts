import { prisma } from "../../prisma/client";

export const searchAlarmsByPatientService = async (search: string) => {
  const alarms = await prisma.alarm.findMany({
    where: {
      patient: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            id: {
              contains: search,
            },
          },
        ],
      },
    },
    include: {
      patient: true,
    },
    orderBy: {
      time: "asc",
    },
  });

  return alarms;
};
