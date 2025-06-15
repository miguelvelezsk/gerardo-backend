import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const sendCaregiverService = async (caregiverId: string, identifier: string) => {

    const caregiver = await prisma.user.findUnique({
        where: {id: caregiverId}
    });

    if(!caregiver || caregiver.role !== 'CUIDADOR') {
        throw new HttpError("El usuario no es cuidador", 409);
    }

    const patient = await prisma.patient.findFirst({
        where: {
            OR: [
                {id: identifier},
                {user: {email: identifier}},
            ],
        },
        include: { user: true },
    });

    if(!patient || patient.user.role !== "PACIENTE") {
        throw new HttpError("Paciente no encontrado con ese identificador", 404);
    }

    const existingRequest = await prisma.caregiverRequest.findFirst({
        where: {
            caregiverId,
            patientId: patient.id,
            status: 'PENDING',
        },
    });

    if(existingRequest) {
        throw new HttpError('Ya existe una solicitud pendiente para este paciente.', 409);
    }

    await prisma.caregiverRequest.create({
        data: {
            caregiverId,
            patientId: patient.id,
            status: 'PENDING',
        },
    });

    return {
        message: `Solicitud enviada correctamente al paciente con cédula ${patient.id}`,
    }

}