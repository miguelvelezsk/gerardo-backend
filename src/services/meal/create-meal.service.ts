import { MeatType, PortionSize, FoodGroup, Prisma } from '@prisma/client';
import { prisma } from '../../prisma/client';

type Ingredients = Prisma.JsonArray;

interface CreateAndAssignMealData {
  dietId?: string;
  name: string;
  type: MeatType;
  size: PortionSize;
  protein: number;
  carbs: number;
  calories: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
  foodGroup: FoodGroup;
  tags?: string[];
  ingredients?: Ingredients;
}

export const createMealService = async (data: CreateAndAssignMealData) => {

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
      size: data.size,
      protein: data.protein,
      carbs: data.carbs,
      calories: data.calories,
      sugar: data.sugar,
      fat: data.fat,
      fiber: data.fiber,
      sodium: data.sodium,
      foodGroup: data.foodGroup,
      tags: data.tags ?? [],
      ingredients: data.ingredients ?? [],
      ...(dietToConnect || {}),
    },
    include: {
      diets: !!data.dietId,
    },
  });

  return newMeal;
};