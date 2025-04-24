import { prisma } from "../../prisma/client";

export const deletePatientService = async(patientId: string) => {

    const patientExist = await prisma.patient.findUnique({
        where: {id: patientId},
    });

    if(!patientExist) {
        throw Error("El paciente no existe");
    }

    const deletedPatient = await prisma.patient.delete({
        where: {id: patientId}
    });

    return deletedPatient;

}