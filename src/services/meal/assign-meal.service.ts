import {prisma} from '../../prisma/client'
import { handleDietAssignUnassign } from '../../utils/handlers/diets-tags.handler';
import { HttpError } from '../../utils/http-error';

interface assignMealData{
    mealIds: string[];
    dietId: string;
}

export const assignMealData = async(data: assignMealData) => {
    
    if (!data.mealIds || !Array.isArray(data.mealIds) || data.mealIds.length === 0) {
        throw new HttpError("No se seleccionaron comidas para asignar", 404);
    }

    const dietExist = await prisma.diet.findUnique({
        where: {id: data.dietId},
    });

    if(!dietExist) {
        throw Error("La dieta no existe")
    }

    const existingMeals = await prisma.meal.findMany({
        where: {
            id: {in: data.mealIds},
        },
        select: { id: true },
    });

    const existingMealsIds = new Set(existingMeals.map(meal => meal.id));
    const missingMeals = data.mealIds.filter(id => !existingMealsIds.has(id));

    if (missingMeals.length > 0) {
        throw new HttpError(`Las siguientes comidas no existen: ${missingMeals.join(', ')}`, 404);
    }

    const alreadyAssignedMeals = await prisma.meal.findMany({
        where: {
            id: { in: data.mealIds },
            diets: {
                some: { id: data.dietId },
            },
        },
        select: { id: true },
    });

    if(alreadyAssignedMeals.length > 0) {
        throw new HttpError("Algunas comidas ya existen en la dieta", 404);
    }

    const result = await prisma.$transaction([
        ...data.mealIds.map(mealId => 
            prisma.meal.update({
                where: { id: mealId },
                data: {
                    diets: {
                        connect: { id: data.dietId }
                    }
                }
            })
        ),
        prisma.diet.update({
            where: { id: data.dietId },
            data: {
                meals: {
                    connect: data.mealIds.map(id => ({id}))
                }
            },
            include: { meals: true }
        })
    ]);

    await handleDietAssignUnassign(data.dietId, prisma);

    return {diet: result[result.length - 1]}

}
