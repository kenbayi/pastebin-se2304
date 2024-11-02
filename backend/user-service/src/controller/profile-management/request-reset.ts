import { Request, Response } from "express";
import crypto from "crypto";
import redisService from "../../service/redisService";
import EmailFacade from "../../service/emailService/emailFacade"; 
import checkEmailExists from "../../service/validation/emailExists";

export const requestPasswordReset = async (req: Request, res: Response) => {
    const { email } = req.body;

    if(!await checkEmailExists(email))
        return res.status(404).send({ error: "Email not found"})

    const resetToken = crypto.randomBytes(32).toString("hex");
    await redisService.setResetToken(email, resetToken);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    try {
        await EmailFacade.sendPasswordResetEmail(email, resetLink); 
        return res.send("Password reset email sent");
    } catch (error) {
        return res.status(500).send("Error sending email");
    }
};

export default requestPasswordReset;
