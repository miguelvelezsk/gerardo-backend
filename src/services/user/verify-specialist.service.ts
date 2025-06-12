import { redis } from "../../config/redis.config";
import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";
import { config } from "../../config/auth.config";
import cloudinary from "../../config/cloudinary.config";

interface VerifySpecialistData {
    email: string,
    otp: string,
    picture?: Express.Multer.File;
}

export const verifySpecialistService = async (data: VerifySpecialistData) => {
    const savedOtp = await redis.get(`otp:${data.email}`);
    if(!savedOtp || String(savedOtp) !== String(data.otp)) {
        throw new HttpError("Código inválido o expirado", 401);
    }

    const pendingData = await redis.get<string>(`pending-specialist:${data.email}`);
    if(!pendingData) {
        throw new HttpError("Datos de registro no encontrados o expirados", 404);
    }
    let parsedData;
    try{
        parsedData = typeof pendingData === "string" ? JSON.parse(pendingData) : pendingData;
    } catch(error: any) {
        console.error("Error al parsear pendingData:", error);
        throw new HttpError("Datos corruptos o mal formateados", 500);
    }

    let imageUrl: string | undefined = config.defaultProfilePicture;
    let imagePublicId: string | undefined = undefined;

    if(data.picture) {
        try {
            const b64 = Buffer.from(data.picture.buffer).toString("base64");
            const dataURI = `data:${data.picture.mimetype};base64,${b64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
            folder: "profile_avatars",
            public_id: `user_${parsedData.id}_picture_${Date.now()}`,
            });
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
        } catch (error) {
            console.error("Error al subir imagen a Cloudinary:", error);
            throw new HttpError("Error al subir la imagen", 500);
        }
    }

    const user = await prisma.user.create({
        data: {
            id: parsedData.id,
            name: parsedData.name,
            email: parsedData.email,
            password: parsedData.password,
            role: "ESPECIALISTA",
            picture: imageUrl,
            picturePublicId: imagePublicId,
            birthDate: new Date(parsedData.birthDate),
        }
    });

    await redis.del(`otp:${data.email}`);
    await redis.del(`pending-specialist:${data.email}`);

    return user;
    
}

