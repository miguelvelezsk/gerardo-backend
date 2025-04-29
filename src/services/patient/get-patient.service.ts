import { prisma } from "../../prisma/client";

export const getPatientsService = async (filters: {
    id?: string,
    name?: string,
    dietId?: string,
    eatingHabits?: string,
    medicalHistory?: string,
    age?: number,
}) => {
    const patients = await prisma.patient.findMany({
        where: {
            ...(filters.id && {id: filters.id}),
            ...(filters.name && {name: {contains: filters.name, mode: 'insensitive'}}),
            ...(filters.eatingHabits && {eatingHabits: {contains: filters.eatingHabits, mode: 'insensitive'}}),
            ...(filters.medicalHistory && {medicalHistory: {contains: filters.medicalHistory, mode: 'insensitive'}}),
            ...(filters.age && {age: filters.age}),
            ...(filters.dietId && {
                diets: {
                    some: {id: filters.dietId}
                }
            }),
        },
        include: {diet: true},
    });

    return patients;
}