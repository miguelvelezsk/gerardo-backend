import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

interface RequestFiltersData {
    userId ?: string;
    caregiverId ?: string;
}

export const getRequestService = async (data: RequestFiltersData) => {

    const whereClause: any = {};

    if(data.userId) {
        whereClause.patientId = data.userId;
    }

    if (data.caregiverId) {
        whereClause.caregiverId = data.caregiverId;
    }
    
    try {
        const request = await prisma.caregiverRequest.findMany({
            where: whereClause,
            include: {
                caregiver: {
                    select: { id: true, name: true, email: true }
                },
                patient: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return request
    } catch(error: any) {
        throw new HttpError("Error al obtener las solicitudes", 500);
    }
    
}