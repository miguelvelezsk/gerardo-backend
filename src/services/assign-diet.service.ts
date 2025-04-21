import { prisma } from "../prisma/client";

interface assignDietData {
  patientId: string;
  startDate: Date;
  endDate: Date;
}

export const assignDietService = async (data: assignDietData) => {
  const { patientId, startDate, endDate} = data;

  const patiendExists = await prisma.patient.findUnique({
    where: {id: data.patientId}
  })

  if (!patiendExists) {
    throw new Error("El paciente no existe")
  }

  const newDiet = await prisma.diet.create({
    data: {
      patientId: patientId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });

  return newDiet;
};