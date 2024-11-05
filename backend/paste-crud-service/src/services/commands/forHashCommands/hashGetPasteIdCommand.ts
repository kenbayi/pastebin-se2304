import axios from "axios";

export class getPasteIdCommand {
    private hash: string;

    constructor(hash: string) {
        this.hash = hash;
    }

    async execute() {
        try {
            const response = await axios.get(`${process.env.HASH_SERVICE_URL}/hash/getPasteId/${this.hash}`);
            return response.data;
        } catch (error:any) {
            throw new Error("Error getting pasteid: " + error.message);
        }
    }
}
