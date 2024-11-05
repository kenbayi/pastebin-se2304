import axios from "axios";

export class PasteHashDeleteCommand {
    private pasteId: number;

    constructor(pasteId: number) {
        this.pasteId = pasteId;
    }

    async execute() {
        try {
            await axios.delete(`${process.env.HASH_SERVICE_URL}/hash/delete-hash/${this.pasteId}`);
        } catch (error:any) {
            throw new Error("Error deleting hash: " + error.message);
        }
    }
}
