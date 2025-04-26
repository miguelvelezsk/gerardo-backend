import { prisma } from "../../prisma/client";

interface updatePatientData {
    patientId: string;
    name?: string;
    age?: number;
    medicalHistory?: string;
    eatingHabits?: string;
}

export const updatePatientData = async(data: updatePatientData) => {

    const patientExists = await prisma.patient.findUnique({
        where: {id: data.patientId},
    });

    if(!patientExists) {
        throw Error("El paciente no existe");
    }

    const updatedPatient = await prisma.patient.update({
        where: {id: data.patientId},
        data: {
            name: data.name,
            age: data.age,
            medicalHistory: data.medicalHistory,
            eatingHabits: data.eatingHabits,
        },
    });

    return updatedPatient;

}