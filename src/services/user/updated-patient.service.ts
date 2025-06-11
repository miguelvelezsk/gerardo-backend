import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";
import { encryptPassword } from "../../utils/register-user-utils";
import cloudinary from "../../config/cloudinary.config";

interface updateUserData {
    userId: string;
    password?: string;
    picture?: Express.Multer.File;
}

export const updateUserService = async (data: updateUserData) => {

    const user = await prisma.user.findUnique({
        where: {id: data.userId},
    });

    if(!user) {
        throw new HttpError("El usuario no existe", 404);
    }

    let imageUrl = user.picture;
    let newPublicId = user.picturePublicId;
    
    if(data.picture) {
        try {
            if(user.picturePublicId) {
                await cloudinary.uploader.destroy(user.picturePublicId);
            }

            const b64 = Buffer.from(data.picture.buffer).toString("base64");
            const dataURI = `data:${data.picture.mimetype};base64,${b64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "profile_avatars",
                public_id: `user_${data.userId}_picture_${Date.now()}`,
            });

            imageUrl = result.secure_url;
            newPublicId = result.public_id;

        } catch(error) {
            throw new HttpError("Error al subir la imagen de perfil durante el registro", 500);
        }
    }

    const updatedUser = await prisma.user.update({
        where: {id: data.userId},
        data: {
            ...(data.password && { password: await encryptPassword(data.password) }),
            picture: imageUrl,
            picturePublicId: newPublicId,
        }
    });

    return updatedUser;

}