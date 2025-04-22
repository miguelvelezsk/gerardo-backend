import {prisma} from '../../prisma/client'

export const deleteDietData = async(dietId: string) => {
    
    const dietExists = await prisma.diet.findUnique({
        where: {id: dietId},
    });

    if(!dietExists) {
        throw Error("La dieta no existe")
    }

    const deleteDiet = await prisma.diet.delete({
        where: {id: dietId},
    });

    return deleteDiet;

}