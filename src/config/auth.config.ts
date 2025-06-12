import dotenv from 'dotenv';

dotenv.config();

export const config = {
    emailDomains: process.env.ALLOWED_EMAIL_DOMAINS as string,
    enterpriseKey: process.env.ENTERPRISE_SECRET_KEY as string,
    defaultProfilePicture: process.env.DEFAULT_PROFILE_PICTURE as string,
    mailUser: process.env.MAIL_USER as string,
    mailPass: process.env.MAIL_PASS as string,
}

if(!config.emailDomains || !config.enterpriseKey) {
    throw new Error("Problemas con la autenticación del dominio");
}