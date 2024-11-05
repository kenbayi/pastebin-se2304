import { Request, Response } from "express";
import { PasteFacade } from "../../services/pasteFacade";
import { ServiceFactory } from "../../services/pasteFactory";

const cloudStorage = ServiceFactory.createCloudStorageAdapter();

export const getAllPastes = async (req: Request, res: Response) => {
    const pasteFacade = new PasteFacade(cloudStorage); // Facade handles the process
    try {
        // Use Facade to handle the entire process of getting all pastes
        const pastes = await pasteFacade.getAllPastes();

        if (!pastes || pastes.length === 0) {
            return res.status(404).send("No pastes found");
        }

        // Format the response to return only necessary fields
        const formattedPastes = pastes.map(({ pasteData, fileContent, user, hash }) => ({
            pasteId: pasteData.id,
            title: pasteData.title,
            content: fileContent, // File content from Cloud Storage
            author: pasteData.author,
            isExpired: pasteData.isExpired,
            isDeleted: pasteData.isDeleted,
            createdAt: pasteData.createdAt,
            expiresAt: pasteData.expiresAt,
            username: user?.username,
            email: user?.email,
            hash: hash.hash,
        }));

        res.status(200).json(formattedPastes); // Return the formatted pastes
    } catch (error) {
        console.error("Error fetching pastes:", error);
        res.status(500).send("Internal server error");
    }
};

export default getAllPastes;
