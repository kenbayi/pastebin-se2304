import { Pastedata } from "../../entity/pastedata";
import { MetadataDataSource } from "../../config/data-source";
import redisService from "../redisService";


export class DeletePasteCommand {
    private pasteId: number;

    constructor(pasteId: number) {
        this.pasteId = pasteId;
    }

    async execute(): Promise<Pastedata | void> {
        const pasteRepository = MetadataDataSource.getRepository(Pastedata);
        const paste = await pasteRepository.findOne({ where: { id: this.pasteId } });
    
        // Update the isDeleted field to true in the database
        await pasteRepository.update(this.pasteId, { isDeleted: true });

        // Store the deleted paste in Redis with a 320-second expiration
        await redisService.setDeletedPaste(this.pasteId, JSON.stringify(paste), 320);
    }

}
