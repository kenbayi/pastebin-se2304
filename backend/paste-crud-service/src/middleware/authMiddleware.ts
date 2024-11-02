import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).send("Not authenticated");
    }

    try {
        const refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET;
        const user: any = jwt.verify(refreshToken, refreshTokenSecret);
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        }

        next();
    } catch (error) {
        return res.status(401).send("Invalid or expired token");
    }
};
