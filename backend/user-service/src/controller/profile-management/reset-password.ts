import { Request, Response } from "express";
import { User } from "../../entity/user";
import { MetadataDataSource } from "../../config/data-source";
import hashPassword from "../../service/hashPassword";
import redisService from "../../service/redisService";

export const resetPassword = async (req: Request, res: Response) => {
    const { token, password } = req.body;
    try {
        const email = await redisService.findEmailByToken(token);
        
        if (!email) {
            return res.status(400).send({error: "Invalid or expired token"});
        }


        const hashedPassword:any = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).send(hashedPassword);
        }

        const userRepository = MetadataDataSource.getRepository(User);
        await userRepository
            .createQueryBuilder()
            .update(User)
            .set({ password: hashedPassword })
            .where("email = :email", { email })
            .execute();
        
        await redisService.emitPasswordUpdated(email);

        res.send("Password reset successful. You may close this page.");
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).send("Internal server error");
    }
};

export default resetPassword;
