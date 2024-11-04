import {Request, Response} from "express";
import { CreateHashCommand } from "../services/hashCommandFactory";

export const hashgenerator = async(req: Request, res:Response) => {
    const command = new CreateHashCommand();
    await command.execute(req, res);
};

export default hashgenerator;