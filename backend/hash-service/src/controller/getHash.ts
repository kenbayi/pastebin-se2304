import { Request, Response } from "express";
import { GetHashCommand } from "../services/hashCommandFactory";

export const getHash = async (req: Request, res: Response) => {
    const command = new GetHashCommand();
    await command.execute(req, res);
};
