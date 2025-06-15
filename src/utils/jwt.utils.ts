import jwt from 'jsonwebtoken';
import { config } from '../config/jwt.config';

interface UserPayload {
    id: string;
    role: string;
    email: string;
}

export const generateAccessToken = (payload: UserPayload): string => {
    return jwt.sign(payload, config.jwtSecret, { 
        expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'] 
    });
};

export const generateRefreshToken = (payload: UserPayload): string => {
    return jwt.sign(payload, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenExpiresIn as jwt.SignOptions['expiresIn']
    });
};

export const verifyAccessToken = (token: string): UserPayload => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as UserPayload;
    return decoded;
  } catch (error) {
    throw new Error("Problemas en la autenticación");
  }
};

export const verifyRefreshToken = (token: string): UserPayload | null => {
  try {
    const decoded = jwt.verify(token, config.refreshTokenSecret) as UserPayload;
    return decoded;
  } catch (error) {
    throw new Error("Problemas al refrescar el token");
  }
};

