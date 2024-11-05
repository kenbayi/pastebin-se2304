import { Request, Response } from "express";
import { PasteFacade } from "../../services/pasteFacade";
import { ServiceFactory } from "../../services/pasteFactory";

const cloudStorage = ServiceFactory.createCloudStorageAdapter();

export const getPaste = async (req: Request, res: Response) => {
    const pasteFacade = new PasteFacade(cloudStorage);  // Facade handles the rest
    const hash = req.params.hash;
    try {
        // Use Facade to handle the entire process of creating a paste
        const {pasteData, fileContent, user} = await pasteFacade.getPaste(hash);

        if(!pasteData || !fileContent || !user)
            res.status(404).send("Not Found")

        res.status(200).json({
            pasteId: pasteData?.id,
            title: pasteData?.title,
            content: fileContent, // File content from Cloud Storage
            author: pasteData?.author,
            createdAt: pasteData?.createdAt,
            expiresAt: pasteData?.expiresAt,
            username: user?.username,
            email: user?.email,
          });

    } catch (error) {
        console.error("Error creating paste:", error);
        res.status(500).send("Internal server error");
    }
};

export default getPaste;
