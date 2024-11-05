import { MetadataDataSource } from "../../config/data-source";
import { Pastedata } from "../../entity/pastedata";
import { DeletePasteCommand } from "../../services/commands/deletePasteCommand";
import { PasteHashDeleteCommand } from "../../services/commands/forHashCommands/hashDelete";
import redisService from "../../services/redisService";
 import { Storage } from "@google-cloud/storage";

 const storage = new Storage();
 const bucketName = `${process.env.BUCKET_NAME}`;

 redisService.on("pasteDeleted", async(pasteData) =>{
    setTimeout(async () => {
        const parsedPaste = JSON.parse(pasteData);
        const pasteStill = await redisService.getDeletedPaste(parsedPaste.id);
        if(parsedPaste && pasteStill){
            const fileName = parsedPaste.content.split('/').pop();;
            const filePath = `pastes/${fileName}`;
            const bucket = storage.bucket(bucketName);
            try {
                await bucket.file(filePath).delete();
                console.log(`Deleted paste with ID ${parsedPaste.id} and name ${fileName} from Cloud Storage.`);
                await new DeletePasteCommand(parsedPaste.id).complete();
                await new PasteHashDeleteCommand(parsedPaste.id).execute();
                console.log("Deleted totally paste and hash from DB")
            } catch (error) {
                console.error("Error deleting the file or from db:", error);
            }         
         }  
        else{
            const pasteRepository = MetadataDataSource.getRepository(Pastedata);
            await pasteRepository.update(parsedPaste.id, {isDeleted: false});
            console.log("User restored data, cancel", pasteStill);
        }
    }, 300000);
 })