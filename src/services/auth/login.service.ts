import { prisma } from "../../prisma/client";
import { compare } from "bcrypt";
import { HttpError } from "../../utils/http-error";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.utils";

export const loginUserService = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user) throw new HttpError("Fallo en las credenciales", 404);

    const isValidPassword = await compare(password, user.password);
    if(!isValidPassword) throw new HttpError("Fallo en las credenciales", 404);

    const payload = {
        id: user.id,
        role: user.role,
        email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken, user };
}