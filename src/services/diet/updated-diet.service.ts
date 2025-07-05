import {prisma} from '../../prisma/client'

interface updateDietData{
  dietId: string;
  name?: string;
  description?: string;
  observations?: string;
  mealIds?: string[];
}

export const updateDietData = async(data: updateDietData) => {

	const dietExists = await prisma.diet.findUnique({
		where: {id: data.dietId},
		include: {meals: true},
	});

	if(!dietExists) {
		throw Error("La dieta no existe")
	}

	const currentMealIds = dietExists.meals.map(meal => meal.id);
	const newMealIds = data.mealIds || [];

	const mealsToConnect = newMealIds.filter(id => !currentMealIds.includes(id));
	const mealsToDisconnect = currentMealIds.filter(id => !newMealIds.includes(id));

	const updatedDiet = await prisma.diet.update({
		where: {id: data.dietId},
		data: {
        	name: data.name,
        	description: data.description,
			observations: data.observations,
			meals: {
				connect: mealsToConnect.map(id => ({id})),
				disconnect: mealsToDisconnect.map(id => ({id})),
			},
		},
	});

	return updatedDiet;

}