import { prisma } from "../prisma/client";

interface assignDietData {
  patientId: string;
  startDate: Date;
  endDate: Date;
}

export const assignDietService = async (data: assignDietData) => {
  const { patientId, startDate, endDate} = data;

  const newDiet = await prisma.diet.create({
    data: {
      patientId: patientId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });

  return newDiet;
};