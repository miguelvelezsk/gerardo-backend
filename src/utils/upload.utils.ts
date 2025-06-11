import multer from "multer";
import { Request } from "express";
import { HttpError } from "./http-error";

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024  },
    fileFilter: (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
        const allowedMimeType = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedMimeType.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new HttpError("Solo se permiten archivos de imagen (jpeg, png, webp)", 404) as any, false);
        }
    },
});

export const uploadedAvatar = upload.single('picture');