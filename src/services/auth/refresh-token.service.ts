import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../../utils/jwt.utils";
import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";

export const refreshAccessTokenService = async (refreshToken: string) => {
    try {
        const decoded: any = verifyRefreshToken(refreshToken);

        const newAccessToken = generateAccessToken({
            id: decoded.id,
            role: decoded.role,
            email: decoded.email,
        });

        const newRefreshToken = generateRefreshToken({
            id: decoded.id,
            role:decoded.role,
            email:decoded.email,
        });

        return { 
            accessToken: newAccessToken, 
            refreshToken: newRefreshToken
        };
    } catch(error) {
        throw new HttpError("Error al refrescar el token de acceso", 404);
    }
}