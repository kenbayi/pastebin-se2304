import { CloudStorageAdapter } from "./cloudServiceAdapter";
import { PasteHashCommand } from "./commands/forHashCommands/hashGeneratorCommand";
import { PastedataBuilder } from "./paste-data-builder";  
import { SavePasteCommand } from "./commands/savePasteCommand";

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
    

}
