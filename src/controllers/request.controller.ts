import { Request, Response } from "express";
import { sendCaregiverService } from "../services/request/send-caregiver-request.service";
import { HttpError } from "../utils/http-error";
import { getRequestService } from "../services/request/get-requests.service";
import { acceptCaregiverRequestService } from "../services/request/accept-caregiver-request.service";
import { cancelRequestService } from "../services/request/cancel-request.service";
import { unlinkCaregiverService } from "../services/request/unlike-caregiver.service";

export const sendCaregiver = async (req: Request, res: Response) => {
    
    try{
        const caregiverId = req.user!.id;
        const { identifier } = req.body;

        const result = await sendCaregiverService(caregiverId, identifier);

        res.status(200).json(result)
    } catch(error: any) {
        console.error("Error al enviar la solicitud", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }

};

export const getRequest = async (req: Request, res: Response) => {
    const { userId, caregiverId } = req.query;

    try {
        const requests = await getRequestService({
            userId: userId as string,
            caregiverId: caregiverId as string,
        });

        res.status(200).json(requests);
    } catch(error: any) {
        console.error("Error al obtener solicitudes", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
};

export const acceptCaregiver = async (req: Request, res: Response) => {

    const { requestId, patientId } = req.body;

    try {
        const request = await acceptCaregiverRequestService(requestId, patientId);

        res.status(200).json(request);
    } catch(error: any) {
        console.error("Error al aceptar solicitud", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }

}

export const cancelRequest = async (req: Request, res: Response) => {
    const { id: requestId } = req.params;
    const { id: userId, role } = req.user!;

    try {
        const result = await cancelRequestService(requestId, userId, role);
        res.status(200).json(result);
    } catch(error: any) {
        console.error("Error al cancelar solicitud", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
    }
}

export const unlinkCaregiver = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const { id: userId, role } = req.user!;

  try {
    const result = await unlinkCaregiverService(patientId, userId, role);
    res.status(200).json(result);
  } catch(error: any) {
        console.error("Error al cancelar solicitud", error);
        const statusCode = error instanceof HttpError ? error.statusCode : 500;
        const message = error.message || "Error interno del servidor"

        res.status(statusCode).json({ error: message });
  }
}