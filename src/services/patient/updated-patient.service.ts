import { prisma } from "../../prisma/client";

interface updatePatientData {
    patientId: string;
    dietId?: string;
    name?: string;
    age?: number;
    medicalHistory?: string;
    eatingHabits?: string;
}

export const updatePatientData = async(data: updatePatientData) => {

    let dietToSet = {};

    const patientExists = await prisma.patient.findUnique({
        where: {id: data.patientId},
    });

    if(!patientExists) {
        throw Error("El paciente no existe");
    }

    if(data.dietId) {
        const dietExists = await prisma.diet.findUnique({
            where: {id: data.dietId},
        });

        if(!dietExists) {
            throw Error("La dieta no existe");
        }

        dietToSet = {
            diets: {
                set: [{
                    id: data.patientId
                }],
            },
        };
    }

    const updatedPatient = await prisma.patient.update({
        where: {id: data.patientId},
        data: {
            name: data.name,
            age: data.age,
            medicalHistory: data.medicalHistory,
            eatingHabits: data.eatingHabits,
            ...dietToSet,
        },
    });

    return updatedPatient;

}