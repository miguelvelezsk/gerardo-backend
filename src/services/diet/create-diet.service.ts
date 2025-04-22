import { prisma } from '../../prisma/client';

interface assignDietData {
	patientId?: string;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
}

export const createDietService = async (data: assignDietData) => {

  let patientToConnect = undefined;

  if(data.patientId) {
    const patientExists = await prisma.patient.findUnique({
      where: {id: data.patientId}
    });

    if(!patientExists){
      throw new Error("El paciente no existe")
    }

    patientToConnect = {
      patients: {
        connect: {
          id: data.patientId
        },
      },
    };
  }

  const newDiet = await prisma.diet.create({
    data: {
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      ...(patientToConnect || {})
    },
    include: {
      patients: true,
      meals: true,
    }
  });

  return newDiet;
};