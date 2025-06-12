import { prisma } from "../../prisma/client";
import { Role } from "@prisma/client";
import { HttpError } from "../../utils/http-error";
import { encryptPassword } from "../../utils/register-user-utils";
import cloudinary from "../../config/cloudinary.config";
import { config } from "../../config/auth.config";

interface RegisterUserData {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    picture?: Express.Multer.File;
    birthDate: string;
    gender: string;
    weight: number;
    height: number;
    medicalHistory?: string;
    eatingHabits?: string; 
}

export const registerUserService = async (data: RegisterUserData) => {

    const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if (existingUser) {
        console.error("El correo ya está registrado");
        throw new HttpError("El correo ya está registrado", 409);
    }

    if (new Date(data.birthDate) > new Date()) {
        throw new HttpError("La fecha de nacimiento no puede ser futura", 409);
    }

    const hashedPassword = await encryptPassword(data.password);

    let imageUrl: string | undefined = config.defaultProfilePicture;
    let imagePublicId: string | undefined = undefined;

    if(data.picture) {
        try {
            const b64 = Buffer.from(data.picture.buffer).toString("base64");
            const dataURI = `data:${data.picture.mimetype};base64,${b64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "profile_avatars",
                public_id: `user_${data.id}_picture_${Date.now()}`
            });
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
        } catch (error) {
            console.log('Error al subir la imagen a Cloudinary durante el registro:', error);
            throw new HttpError("Error al subir la imagen de perfil durante el registro", 500);
        }
    }

    const user = await prisma.user.create({
        data: {
            id: data.id,
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
            picture: imageUrl,
            picturePublicId: imagePublicId,
            birthDate: new Date(data.birthDate),
        },
    });

    if (user.role === 'PACIENTE') {
        await prisma.patient.create({
            data: {
                id: user.id,
                name: user.name,
                gender: data.gender,
                weight: data.weight,
                height: data.height,
                ...(data.medicalHistory && {medicalHistory: data.medicalHistory}),
                ...(data.eatingHabits && {eatingHabits: data.eatingHabits}),
            },
        });
    };

    return user;
}