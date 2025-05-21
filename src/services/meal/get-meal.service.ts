import {MeatType} from '@prisma/client';
import {prisma,} from '../../prisma/client'

export const getMealsService = async (filters: {
    id?: string,
    name?: string,
    dietId?: string;
    type?: string;
}) => {
    const meals = await prisma.meal.findMany({
        where: {
            ...(filters.id && {id: filters.id}),
            ...(filters.name && {name: {contains: filters.name, mode: 'insensitive'}}),
            ...(filters.dietId && {dietId: filters.dietId}),
            ...(filters.type && {type: filters.type as MeatType}),
        },
        include: {
            diets: true,
            
        },
    });

    return meals;
};