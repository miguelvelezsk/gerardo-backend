import { MeatType } from '@prisma/client';
import { prisma } from '../../prisma/client';

interface createAndAssignMealData {
  dietId?: string;
  name: string;
  type: MeatType;
  protein: number;
  sugar: number;
  fat:number;
  taken?:boolean;
}

export const createMealService = async (data: createAndAssignMealData) => {

  let dietToConnect = undefined;

  if(data.dietId) {
    const dietExists = await prisma.diet.findUnique({
      where: {id: data.dietId}
    });

    if(!dietExists){
      throw new Error("La dieta no existe")
    }

    dietToConnect = {
      diets: {
        connect: {
          id: data.dietId
        },
      },
    };
  }

  const newMeal = await prisma.meal.create({
    data: {
      name: data.name,
      type: data.type,
      protein: data.protein,
      sugar: data.sugar,
      fat: data.fat,
      taken: data.taken ?? false,
      ...(dietToConnect || {})
    },
  });

  return newMeal;
};