import { prisma } from "../../prisma/client";

interface updatePatientData {
    patientId: string;
    name?: string;
    gender?: string,
    weight?: number,
    height?: number,
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

    if(data.height) {
        if(data.height <= 0) {throw new Error("La altura debe ser mayor a cero")}
    }

    if(data.weight) {
        if(data.weight <= 0) {throw new Error("El peso debe ser mayor a cero")}
    }

    const updatedPatient = await prisma.patient.update({
        where: {id: data.patientId},
        data: {
            name: data.name,
            gender: data.gender,
            height: data.height,
            weight: data.weight,
            medicalHistory: data.medicalHistory,
            eatingHabits: data.eatingHabits,
        },
    });

    return updatedPatient;

}