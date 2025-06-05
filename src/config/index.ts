import dotenv from 'dotenv';

dotenv.config();

export const config = {
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
};

if(!config.jwtSecret || !config.jwtExpiresIn || !config.refreshTokenSecret || !config.refreshTokenExpiresIn) {
    throw new Error("Problemas con autenticación");
}