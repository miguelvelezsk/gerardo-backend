import {prisma} from '../../prisma/client'
import { handleDietAssignUnassign, handleDietUpdate } from '../../utils/handlers/diets-tags.handler';

interface unAssignMealData{
    mealId: string;
    dietId: string;
}

export const unAssignMealData = async(data: unAssignMealData) => {
    
    const dietExist = await prisma.diet.findUnique({
        where: {id: data.dietId},
    });

    if(!dietExist) {
        throw Error("La dieta no existe")
    }

    const mealExist = await prisma.meal.findUnique({
        where: {id: data.mealId},
    });

    if(!mealExist) {
        throw Error("El alimento no existe")
    }

    const updatedMeal = await prisma.meal.update({
        where: {id: data.mealId},
        data: {
            diets: {
                disconnect: {id: data.dietId},
            },
        },
        include: {diets: true}
    });

    await handleDietAssignUnassign(data.dietId, prisma);

    return updatedMeal;

}
