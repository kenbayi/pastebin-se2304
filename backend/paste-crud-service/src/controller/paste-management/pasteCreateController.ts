import { Request, Response } from "express";
import { PasteFacade } from "../../services/pasteFacade";
import { ServiceFactory } from "../../services/pasteFactory";

export const createPaste = async (req: Request, res: Response) => {
    const { userid, title, content, expiresAt } = req.body;
    const cloudStorage = ServiceFactory.createCloudStorageAdapter();  // Factory creates the adapter
    const pasteFacade = new PasteFacade(cloudStorage);  // Facade handles the rest

    try {
        // Use Facade to handle the entire process of creating a paste
        const shortUrl = await pasteFacade.createPaste(title, content, userid, expiresAt);
        res.status(201).json({ shortUrl });
    } catch (error) {
        console.error("Error creating paste:", error);
        res.status(500).send("Internal server error");
    }
};

export default createPaste;
