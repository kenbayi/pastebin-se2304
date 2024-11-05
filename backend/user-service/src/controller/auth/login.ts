import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import checkValidation from "../../service/validation/invalid";
import comparePassword from "../../service/validation/passwordCheck";
import checkUserExists from "../../service/validation/userExists";

export default async (req: Request, res: Response) => {
    
    // throws error when the POST-ed queries are invalid (username and password)
    const validationResult = await checkValidation(req.body, 'login');

    if (validationResult !== true) {
        return res.status(400).json({ errors: validationResult });
    }

    const user:any = await checkUserExists(req.body.username);
    // throws error if user with provided username not found
    if(!await user)
        return res.status(404).send("User Not Found")

    //exits if password doesn't match
    if (!await comparePassword(req.body.password, user.password)) 
        return res.status(400).send("password doesn't match");

    // if the code reaches here then the user is authenticated
    const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret: any = process.env.REFRESH_TOKEN_SECRET;

    const plainUserObject = {
    id: user.id,
    username: user.username,
    email: user.email,
    };

    const accessToken = jwt.sign(plainUserObject, accessTokenSecret, {
    expiresIn: 120,
    });
    const refreshToken = jwt.sign(plainUserObject, refreshTokenSecret, {
    expiresIn: "1d",
    });

    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        expires: dayjs().add(1, "days").toDate(),
    });

    return res.send({ user, accessToken });
};