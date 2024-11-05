import { Pastedata } from "../../entity/pastedata";
import { MetadataDataSource } from "../../config/data-source";

export class getAllPastesCommand { // Rename the class to GetPastesCommand for clarity

    async execute(): Promise<Pastedata[]> { // Change the return type to an array
        const pasteRepository = MetadataDataSource.getRepository(Pastedata);
        
        const pastes = await pasteRepository.find(); // Fetch all pastes

        // Return the found pastes
        return pastes; 
    }
}
