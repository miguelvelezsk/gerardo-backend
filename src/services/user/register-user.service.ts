import { prisma } from "../../prisma/client";
import { Role } from "@prisma/client";
import { HttpError } from "../../utils/http-error";
import { encryptPassword, calculateAge } from "../../utils/register-user-utils";

interface RegisterUserData {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    picture?: string;
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

    const user = await prisma.user.create({
        data: {
            id: data.id,
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
            ...(data.picture && { picture: data.picture} ),
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