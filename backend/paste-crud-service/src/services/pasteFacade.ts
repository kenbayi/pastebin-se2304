import { CloudStorageAdapter } from "./cloudServiceAdapter";
import { PasteHashCommand } from "./commands/forHashCommands/hashGeneratorCommand";
import { PastedataBuilder } from "./paste-data-builder";  
import { SavePasteCommand } from "./commands/savePasteCommand";
import { getPasteIdCommand } from "./commands/forHashCommands/hashGetPasteIdCommand";
import { GetPasteCommand } from "./commands/getPasteCommand";
import { getUserCommand } from "./commands/requestUserCommand";
import { getAllPastesCommand } from "./commands/getAllPasteCommand";
import { getHashCommand } from "./commands/forHashCommands/getHashCommand";
import checkPasteExists from "./validation/pasteExists";
import { DeletePasteCommand } from "./commands/deletePasteCommand";

export class PasteFacade {
    private cloudStorage?: CloudStorageAdapter;

    constructor(cloudStorage?: CloudStorageAdapter) {
        this.cloudStorage = cloudStorage;
    }

    async createPaste(title: string, content: string, author: number, expiresAt?: number,) {
        try {
            // 1. Upload content to cloud storage
            const cloudUrl = await this.cloudStorage?.upload(content, title);

            // 2. Use Builder to create the Paste object
            const paste = new PastedataBuilder()
                .setTitle(title)
                .setContent(cloudUrl)
                .setAuthor(author)
                .setExpiresAt(expiresAt)
                .build();

            // 3. Save paste to the database using the factory
            const savePasteCommand = new SavePasteCommand(paste);
            const savedPaste = await savePasteCommand.execute();
            
            // 4. Generate hash using Command pattern
            const pasteCommand = new PasteHashCommand(savedPaste.id);
            const { hash } = await pasteCommand.generateHash();

            // 5. Return the short URL
            const shortUrl = `${process.env.FRONTEND_URL}/${hash}`;
            return shortUrl;
        } catch (error:any) {
            throw new Error("Error creating paste: " + error.message);
        }
    }
    
    async getPaste(hash: string){
        const { pasteId } = await new getPasteIdCommand(hash).execute();
        const pasteData = await new GetPasteCommand(pasteId).execute();
        const fileContent = await this.cloudStorage?.download(pasteData?.content)
        const user = await new getUserCommand(pasteData?.author).execute();
        
        return {pasteData, fileContent, user};
    }

    async getAllPastes() {
        // Fetch all pastes
        const pastes = await new getAllPastesCommand().execute(); // Use the command to fetch all pastes
    
        // Map through pastes to fetch additional data
        const pasteDetails = await Promise.all(pastes.map(async (paste) => {
            const fileContent = await this.cloudStorage?.download(paste.content); // Assuming content holds the file reference
            const user = await new getUserCommand(paste.author).execute(); // Fetch user info by author
            const hash = await new getHashCommand(paste.id).execute(); // Get the hash using the paste ID
            
            return { pasteData: paste, fileContent, user, hash }; // Return combined data including hash
        }));
    
        return pasteDetails; // Returns an array of all pastes with additional info
    }

    async deletePaste(pasteId: number) {
        if (!await checkPasteExists(pasteId)) {
            throw new Error("Paste not found.");
        }

        await new DeletePasteCommand(pasteId).execute(); 
    }
}
