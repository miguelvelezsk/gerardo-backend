import {prisma} from '../../prisma/client'

interface assignDietData{
    patientId: string;
    dietId: string;
}

export const assignDietData = async(data: assignDietData) => {
    const patientExists = await prisma.patient.findUnique({
        where: {id: data.patientId},
    });

    if(!patientExists) {
        throw Error("El paciente no existe");
    }

    const dietExists = await prisma.diet.findUnique({
        where: {id: data.dietId},
    });

    if(!dietExists) {
        throw Error("La dieta no existe");
    }

    const updatedDiet = await prisma.diet.update({
        where: {id: data.dietId},
        data: {
            patients: {
                connect: {
                    id: data.patientId,
                },
            },
        },
    });

    return updatedDiet;

}