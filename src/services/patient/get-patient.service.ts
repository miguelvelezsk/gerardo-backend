import { prisma } from "../../prisma/client";
import { calculateAge } from "../../utils/register-user-utils";

export const getPatientsService = async (filters: {
    id?: string,
    name?: string,
    dietId?: string,
    eatingHabits?: string,
    medicalHistory?: string,
}) => {
    const patients = await prisma.patient.findMany({
        where: {
            ...(filters.id && {id: filters.id}),
            ...(filters.name && {name: {contains: filters.name, mode: 'insensitive'}}),
            ...(filters.eatingHabits && {eatingHabits: {contains: filters.eatingHabits, mode: 'insensitive'}}),
            ...(filters.medicalHistory && {medicalHistory: {contains: filters.medicalHistory, mode: 'insensitive'}}),
            ...(filters.dietId && {
                diets: {
                    some: {id: filters.dietId}
                }
            }),
        },
        include: {
            diet: true,
            user: {
                select: {
                    birthDate: true,
                },
            },
        },
    });

    const enrichedPatients = patients.map(patient => ({
        ...patient,
        age: patient.user?.birthDate ? calculateAge(patient.user.birthDate) : null,
    }))

    return enrichedPatients;
}