import { createTransport } from 'nodemailer';

const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: Bun.env.MAIL_USER,
        pass: Bun.env.MAIL_PASSWORD,
    }
})

// console.log(Bun.env.MAIL_USER, Bun.env.MAIL_PASS);

export const sendEmail = async (emails: string[], trackingId: string) => {
    const trackingUrl = `${Bun.env.BASE_URL}/api/trackemail/${trackingId}`
    const mailOptions = {
        from: Bun.env.MAIL_USER,
        to: emails,
        subject: 'Tracking ID',
        html: `<h1>Tracking ID: ${trackingId}</h1>
        <img src="${trackingUrl}" alt="dead pixel" style="display: none" />`
    }

    try {
        await transport.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}