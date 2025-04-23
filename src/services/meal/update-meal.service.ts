import {prisma} from '../../prisma/client';
import { MeatType } from '@prisma/client';

interface UpdateMealData {
    mealId: string;
    name?: string;
    type?: string;
    protein?: number;
    sugar?: number;
    fat?: number;
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
            protein: data.protein,
            sugar: data.sugar,
            fat: data.fat, 
            
        },
    });

    return updatedMeal;
}