import { Request, Response } from "express";
import { GetPasteIdCommand } from "../services/hashCommandFactory";

export const getPasteId = async (req: Request, res: Response) => {
    const command = new GetPasteIdCommand();
    await command.execute(req, res);
};
