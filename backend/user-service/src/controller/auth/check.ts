import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

export default async(req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    
    if(!refreshToken)
        return res.status(400).send("not authenticated");
    try{
        const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET;
        const refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET;

        const user: any = jwt.verify(refreshToken, refreshTokenSecret);
        const userPlainObj = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        const accessToken = jwt.sign(userPlainObj, accessTokenSecret,{
            expiresIn: 120,
        });

        const newRefreshToken = jwt.sign(userPlainObj, refreshTokenSecret,{
            expiresIn: "1d",
        });

        res.cookie("refresh", newRefreshToken, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
            expires: dayjs().add(1, "days").toDate(),
        });

        return res.status(200).send({ user: userPlainObj, accessToken});
    } catch (error) {
        return res.status(400).send(error);
    }
}
