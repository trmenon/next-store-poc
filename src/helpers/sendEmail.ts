import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { createNewToken } from '@/services';

interface SendEmailProps {
    email: string;
    emailType: string;
    userId: string;
}

export const sendEmail = async (data: SendEmailProps)=> {
    console.log("Sending mail");
    // const token = await bcrypt.hash(data?.userId.toString(), 10);
    const token = uuidv4();
    
    const new_token = await createNewToken({
        tokenString: token,
        userId: data?.userId,
        emailType: data?.emailType
    });

    try{
        // TRANSPORTER CONFIG
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: 'gmail',
            auth: {
                user: process.env?.auth_email,
                pass: process.env?.auth_email_password
            }
        });

        // MAIL OPTIONS
        let mailOptions = {
            from: process.env?.auth_email,
            to: data?.email,
            subject: '',
            html: ''
        };

        if(data?.emailType === 'VERIFICATION') {
            mailOptions['subject'] = 'Email verification';
            mailOptions['html'] = `
                <h1>Click on the link below to verify your email</h1>
                <a href="${process.env.domain}/verify-email?token=${token}">Verify</a>
            `;
        }
        if(data?.emailType === 'RESET') {
            mailOptions['subject'] = 'Reset your password';
            mailOptions['html'] = `
                <h1>Click on the link below to verify your email</h1>
                <a href="${process.env.domain}/verify-email?token=${token}">Verify</a>
            `;
        }

        // Sendimg email
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log(mailResponse);
    }catch(err) {
        console.log('[ERROR] Sending Email');
        console.log(err);
    }
}