import { MetadataDataSource } from "../../config/data-source";
import { Pastedata } from "../../entity/pastedata";

const userRepository = MetadataDataSource.getRepository(Pastedata);

export default async function checkPasteExists(pasteId:Pastedata["id"]){
    return await userRepository.findOneBy({
         id: pasteId
    });
}