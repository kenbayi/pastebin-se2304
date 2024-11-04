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
export class DeleteHashCommand implements Command {
  async execute(req: Request, res: Response): Promise<void> {
    const pasteId = Number(req.params.pasteId);
    try {
      const message = await hashFacade.deleteHash(pasteId);
      res.status(200).json({ message });
    } catch (error) {
      res.status(404).json({ error: "Failed to delete hash" });
    }
  }
}
export class GetHashCommand implements Command {
  async execute(req: Request, res: Response): Promise<void> {
    const pasteId = Number(req.params.pasteId);
    try {
      const hash = await hashFacade.getHash(pasteId);
      res.status(200).json({ hash });
    } catch (error) {
      res.status(404).json({ error: "Failed to get hash" });
    }
  }
}

export class GetPasteIdCommand implements Command {
  async execute(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;
    try {
      const pasteId = await hashFacade.getPasteId(hash);
      res.status(200).json({ pasteId });
    } catch (error) {
      res.status(404).json({ error: "Failed to get paste id by hash" });
    }
  }
}



