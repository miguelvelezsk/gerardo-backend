import {prisma} from '../../prisma/client'

export const deleteMealData = async(mealId: string) => {
    
    const mealExists = await prisma.meal.findUnique({
        where: {id: mealId},
    });

    if(!mealExists) {
        throw Error("La comida no existe")
    }

    const deleteMeal = await prisma.meal.delete({
        where: {id: mealId},
    });

    return deleteMeal;

}