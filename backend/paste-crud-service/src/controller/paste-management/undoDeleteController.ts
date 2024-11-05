import { Request, Response } from "express";
import { PasteFacade } from "../../services/pasteFacade"; 

const pasteFacade = new PasteFacade();

export class UndoDeletePasteController {
    async undoDelete(req: Request, res: Response) {
        const { pasteId } = req.params;

        try {
            await pasteFacade.undoDelete(Number(pasteId));
            res.status(200).send("Paste restored successfully.");
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new UndoDeletePasteController();
