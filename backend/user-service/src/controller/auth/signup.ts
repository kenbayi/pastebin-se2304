import {Response, Request} from "express";
import checkValidation from "../../service/validation/invalid";
import checkUserExists from "../../service/validation/userExists";
import checkEmailExists from "../../service/validation/emailExists";
import hashPassword from "../../service/hashPassword";
import { saveUserToDatabase } from "../../service/savingDB";
 
export default async (req: Request, res: Response) => {
    //validating request from client side.
    if(!await checkValidation(req.body, 'signup'))
        return res.status(400).send("Validation error");

    //checking if username or email exists in database
    if(await checkUserExists(req.body.username))
        return res.status(409).send("User Already Exists")
    
    if(await checkEmailExists(req.body.email))
        return res.status(409).send({ error: "email already exists"})

    //hashing password
    const hashedPassword: any = await hashPassword(req.body.password);
    if(!hashedPassword)
        return res.status(500).send(hashedPassword);

    //saving user to database
    const savedUser = await saveUserToDatabase({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    if(!savedUser)
        return res.status(400).send("Error while saving user to db");

    return res.send(savedUser); 
}
