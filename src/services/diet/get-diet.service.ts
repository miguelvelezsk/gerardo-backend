import {prisma} from '../../prisma/client'

export const getDietsService = async (filters: {
    id?: string,
    name?: string,
    patientId?: string;
}) =>   {
    const diets = await prisma.diet.findMany({
        where: {
            ...(filters.id && {id: filters.id}),
            ...(filters.name && {name: {contains: filters.name, mode: 'insensitive'}}),
            ...(filters.patientId && {
                patients: {
                    some: {id: filters.patientId}
                }
            }),
        },
        include: {
            patients: true,
            meals: true,
        },
    });

    return diets;
}