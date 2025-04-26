import { prisma } from '../../prisma/client';

interface createPatientData {
  	id: string;
	name: string;
	age: number;
	medicalHistory?: string;
	dietId?: string;
	eatingHabits: string;
}

export const createPatientService = async (data: createPatientData) => {

  let dietToConnect = undefined;

  if(data.dietId) {
		const dietExists = await prisma.diet.findUnique({
		where: {id: data.dietId}
  	});

		if(!dietExists){
			throw new Error("La dieta no existe")
		}

		dietToConnect = {
			diet: {
				connect: {
					id: data.dietId,
				},
			},
		};
	}

  const newPatient = await prisma.patient.create({
	data: {
	  id: data.id,
		name: data.name,
		age: data.age,
		medicalHistory: data.medicalHistory || "",
		eatingHabits: data.eatingHabits,
		...(dietToConnect ?? {}),
	},
	include: {
	  diet: true,
	}
  });

  return newPatient;
};