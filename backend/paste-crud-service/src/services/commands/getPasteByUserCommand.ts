import { Pastedata } from "../../entity/pastedata";
import { MetadataDataSource } from "../../config/data-source";

export class GetPasteByUserCommand {
    private id: number;

    constructor(id: number) {
        this.id = id;
    }

    async execute(): Promise<Pastedata[]> {
        const pasteRepository = MetadataDataSource.getRepository(Pastedata);
        // Find the paste by id
        const paste = await pasteRepository.find({ where: { author: this.id } });

        // Return the found paste
        return paste; 
    }
}
