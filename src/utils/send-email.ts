import nodemailer from 'nodemailer';
import { config } from '../config/auth.config';

interface SendOtpEmailProps {
    email: string;
    otp: string;
    name: string;
}

export const sendOtpEmail = async (data: SendOtpEmailProps) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.mailUser,
            pass: config.mailPass,
        },
    });

    const mailOptions = {
        from: `Gerardo <${config.mailUser}>`,
        to: data.email,
        subject: "Código de verificación",
        html: `
            <h2>Hola, ${data.name}</h2>
            <p>Tu código de verificación</p>
            <h1>${data.otp}</h1>
            <p>Este código expira en 5 minutos</p>
            `,
    };

    await transporter.sendMail(mailOptions);
}