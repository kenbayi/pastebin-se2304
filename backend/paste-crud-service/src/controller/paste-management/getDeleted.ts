import { Request, Response } from "express";
import redisService from "../../services/redisService";
import { MetadataDataSource } from "../../config/data-source";
import { Pastedata } from "../../entity/pastedata";

const pasteRepository = MetadataDataSource.getRepository(Pastedata);

export const getDeleted = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const pastes = await pasteRepository.find({ where: { author: Number(userId) } });
        const deletedPastes: any[] = []; 

        for (const paste of pastes) {
            const deletedPasteString = await redisService.getDeletedPaste(paste.id);
            if (deletedPasteString) {
                const deletedPaste = JSON.parse(deletedPasteString);

                // Get the TTL (expiration time) for the deleted paste
                const ttl = await redisService.getTTL(paste.id);
                if (ttl !== -1) {
                    deletedPaste.expirationTime = ttl - 20 ; 
                }

                deletedPastes.push(deletedPaste);
            }
        }

        // Respond with the array of deleted pastes including expiration time
        return res.status(200).json(deletedPastes);
    } catch (error) {
        console.error("Error fetching deleted pastes:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
