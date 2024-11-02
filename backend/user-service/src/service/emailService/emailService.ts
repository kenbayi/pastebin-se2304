import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                reject(error);
            } else {
                console.log("Email sent:", info.response);
                resolve(info);
            }
        });
    });
};

export default sendEmail;
