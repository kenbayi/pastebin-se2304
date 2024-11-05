import { Request, Response } from "express";
import { PasteFacade } from "../../services/pasteFacade"; 

const pasteFacade = new PasteFacade();

export class DeletePasteController {
    async deletePaste(req: Request, res: Response) {
        const { pasteId } = req.params;

        try {
            await pasteFacade.deletePaste(parseInt(pasteId, 10));
            res.status(204).send("Paste deleted successfully!");
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new DeletePasteController();
