import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const cancelRequestService = async (requestId: string, userId: string, role: string) => {
    const request = await prisma.caregiverRequest.findUnique({
        where: {id: requestId},
    });

    if(!request) {
        throw new HttpError("Solicitud no encontrada", 404);
    }

    const isCaregiver = request.caregiverId === userId && role === "CUIDADOR";
    const isPatient = request.patientId === userId && role === "PACIENTE";
    
    if(!isCaregiver && !isPatient) {
        throw new HttpError("No autorizado para cancelar esta solicitud", 403);
    }

    if(request.status !== 'PENDING') {
        throw new HttpError("Solo se pueden cancelar solicitudes pendientes", 400);
    } 

    await prisma.caregiverRequest.update({
        where: { id: requestId },
        data: { status: "REJECTED" },
    });

    return { message: "Solicitud cancelada o rechazada correctamente." };
}