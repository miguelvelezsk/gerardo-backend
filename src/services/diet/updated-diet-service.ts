import {prisma} from '../../prisma/client'

interface updateDietData{
  dietId: string;
  patientId?: string;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

export const updateDietData = async(data: updateDietData) => {

	let patientToSet = {};

	const dietExists = await prisma.diet.findUnique({
			where: {id: data.dietId},
	});

	if(!dietExists) {
			throw Error("La dieta no existe")
	}

	if(data.patientId) {
    const patientExists = await prisma.patient.findUnique({
      where: {id: data.patientId}
    });

    if(!patientExists){
      throw new Error("El paciente no existe")
    }

    patientToSet = {
      patients: {
        set: [{
          id: data.patientId
        }],
      },
    };
  }

	const updatedDiet = await prisma.diet.update({
			where: {id: data.dietId},
			data: {
					name: data.name,
					description: data.description,
					startDate: data.startDate,
					endDate: data.endDate,
					...patientToSet,
			},
	});

	return updatedDiet;

}