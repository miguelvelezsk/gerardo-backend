import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const acceptCaregiverRequestService = async (requestId: string, patientId: string) => {
    const request = await prisma.caregiverRequest.findUnique({
        where: {id: requestId},
    });

    console.log(requestId, patientId);

    if(!requestId || request?.patientId !== patientId) {
        throw new HttpError("Solicitud no válida o no pertenece al paciente", 403);
    }

    await prisma.patient.update({
        where: { id: patientId },
        data: {
            caregiverId: request.caregiverId,
        },
    });

    await prisma.caregiverRequest.update({
        where: {id: requestId},
        data: {
            status: "ACCEPTED",
        }
    })

    return {
        message: "Solicitud aceptada y cuidador asignado"
    };
}