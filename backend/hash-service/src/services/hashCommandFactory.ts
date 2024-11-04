import { Request, Response } from "express";
import hashFacade from "./hashFacade";

export interface Command {
  execute(req: Request, res: Response): Promise<void>;
}

export class CreateHashCommand implements Command {
  async execute(req: Request, res: Response): Promise<void> {
    const { pasteId } = req.body;
    try {
      const hash = await hashFacade.createHash(pasteId);
      res.status(201).json({ hash });
    } catch (error) {
      res.status(500).json({ error: "Failed to create hash" });
    }
  }
}


