import axios from "axios";

export class PasteHashCommand {
    private pasteId: number;

    constructor(pasteId: number) {
        this.pasteId = pasteId;
    }

    async generateHash() {
        try {
            const response = await axios.post(`${process.env.HASH_SERVICE_URL}/hash/generate-hash`, { pasteId: this.pasteId });
            return response.data;
        } catch (error:any) {
            throw new Error("Error generating hash: " + error.message);
        }
    }
}
