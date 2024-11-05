import { Pastedata } from "../../entity/pastedata";
import { MetadataDataSource } from "../../config/data-source";

export class GetPasteCommand {
    private pasteId: number;

    constructor(pasteId: number) {
        this.pasteId = pasteId;
    }

    async execute(): Promise<Pastedata | null> {
        const pasteRepository = MetadataDataSource.getRepository(Pastedata);
        
        // Find the paste by id
        const paste = await pasteRepository.findOne({ where: { id: this.pasteId } });

        // Handle the case where paste is not found
        if (!paste) {
            throw new Error(`Paste with ID ${this.pasteId} not found.`);
        }

        // Return the found paste
        return paste; 
    }
}
