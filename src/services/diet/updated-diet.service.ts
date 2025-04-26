import {prisma} from '../../prisma/client'

interface updateDietData{
  dietId: string;
  name?: string;
  description?: string;
  observations?: string;
}

export const updateDietData = async(data: updateDietData) => {

	const dietExists = await prisma.diet.findUnique({
		where: {id: data.dietId},
	});

	if(!dietExists) {
		throw Error("La dieta no existe")
	}

	const updatedDiet = await prisma.diet.update({
		where: {id: data.dietId},
		data: {
        	name: data.name,
        	description: data.description,
			observations: data.observations,
			},
	});

	return updatedDiet;

}