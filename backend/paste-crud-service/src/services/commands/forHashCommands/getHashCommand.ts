import axios from "axios";

export class getHashCommand {
    private pasteId: number;

    constructor(pasteId: number) {
        this.pasteId = pasteId;
    }

    async execute() {
        try {
            const response = await axios.get(`${process.env.HASH_SERVICE_URL}/hash/getHash/${this.pasteId}`);
            return response.data;
        } catch (error:any) {
            throw new Error("Error getting pasteid: " + error.message);
        }
    }
}
