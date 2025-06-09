import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const getUserService = async (userId: string) => {

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {id: userId},
        })
        return user
    } catch(err) {
        throw new HttpError("Paciente no encontrado", 404);
    }
};