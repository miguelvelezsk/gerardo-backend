import {prisma} from '../../prisma/client';
import { MeatType, PortionSize, FoodGroup, Prisma } from '@prisma/client';
import { handleDietUpdate } from '../../utils/handlers/diets-tags.handler';

type Ingredients = Prisma.JsonArray;

interface UpdateMealData {
  mealId: string;  
  name?: string;
  type?: MeatType;
  size?: PortionSize;
  protein?: number;
  carbs?: number;
  calories?: number;
  sugar?: number;
  fat?: number;
  fiber?: number;
  sodium?: number;
  foodGroup?: FoodGroup;
  tags?: string[];
  ingredients?: Ingredients;
}


export const updateMealService = async (data: UpdateMealData) => {


    const mealExists = await prisma.meal.findUnique({
        where: {id: data.mealId},
    });

    if (!mealExists) {
        throw new Error("La comida no existe");
    }

    const updatedMeal = await prisma.meal.update({
        where: {id: data.mealId},
        data: {
            name: data.name,
            type: data.type as MeatType,
            size: data.size as PortionSize,
            protein: data.protein,
            carbs: data.carbs,
            calories: data.calories,
            sugar: data.sugar,
            fat: data.fat,
            fiber: data.fiber,
            sodium: data.sodium,
            foodGroup: data.foodGroup as FoodGroup,
            tags: data.tags,
            ingredients: data.ingredients as Ingredients,
        },
    });

    await handleDietUpdate(data.mealId, prisma);

    return updatedMeal;
}