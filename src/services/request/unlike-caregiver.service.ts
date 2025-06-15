import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const unlinkCaregiverService = async (patientId: string, userId: string, role: string) => {
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: { user: true },
  });

  if (!patient) {
    throw new HttpError("Paciente no encontrado", 404);
  }

  const isPatient = patient.id === userId && role === "PACIENTE";
  const isCaregiver = patient.caregiverId === userId && role === "CUIDADOR";

  if (!isPatient && !isCaregiver) {
    throw new HttpError("No autorizado para desvincular este cuidador", 403);
  }

  if (!patient.caregiverId) {
    throw new HttpError("Este paciente no tiene cuidador asignado", 400);
  }

  await prisma.patient.update({
    where: { id: patient.id },
    data: { caregiverId: null },
  });

  await prisma.caregiverRequest.updateMany({
    where: {
      caregiverId: patient.caregiverId,
      patientId: patient.id,
      status: "ACCEPTED",
    },
    data: { status: "ENDED" },
  });

  return { message: "Cuidador desvinculado correctamente." };
};