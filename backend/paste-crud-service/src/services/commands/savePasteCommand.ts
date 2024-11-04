import { Pastedata } from "../../entity/pastedata";
import { MetadataDataSource } from "../../config/data-source";

export class SavePasteCommand {
    private pasteData: Partial<Pastedata>;

    constructor(pasteData: Partial<Pastedata>) {
        this.pasteData = pasteData;
    }

    async execute(): Promise<Pastedata> {
        const pasteRepository = MetadataDataSource.getRepository(Pastedata);
        const newPaste = new Pastedata();
        Object.assign(newPaste, this.pasteData);
        return await pasteRepository.save(newPaste);
    }
}
