import { prisma } from "../../prisma/client";
import { encryptPassword } from "../../utils/register-user-utils";
import { HttpError } from "../../utils/http-error";
import { config } from "../../config/auth.config";
import { redis } from "../../config/redis.config";

interface PendingSpecialistData {
    id: string;
    name: string;
    email: string;
    password: string;
    birthDate: string;
    enterpriseCode: string;
}

export const registerSpecialistService = async (data: PendingSpecialistData) => {
    const existingUser = await prisma.user.findUnique({
        where: {email: data.email},
    });

    if (existingUser) {
        throw new HttpError("El correo ya está registrado", 409);
    }

    if (new Date(data.birthDate) > new Date()) {
        throw new HttpError("La fecha de nacimiento no puede ser futura", 409);
    }

    const allowedDomains = config.emailDomains?.split(",") || [];
    const userDomain = data.email.split("@")[1];
    if(!allowedDomains.includes(userDomain)) {
        throw new HttpError("Usted no pertenece a una empresa válida", 403);
    }

    if(data.enterpriseCode !== config.enterpriseKey) {
        throw new HttpError("Usted no pertenece a una empresa válida", 401);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedPassword = await encryptPassword(data.password);

    await redis.set(
        `pending-specialist:${data.email}`,
        JSON.stringify({
            ...data,
            password: hashedPassword,
        }),
        { ex: 300 }
    );

    console.log(`Código de verificación para ${data.email}: ${otp}`);

    await redis.set(`otp:${data.email}`, otp, {ex: 300});

    return { message: "Código enviado al correo", email: data.email };
}