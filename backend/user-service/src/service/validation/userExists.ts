import { MetadataDataSource } from "../../config/data-source";
import { User } from "../../entity/user";

const userRepository = MetadataDataSource.getRepository(User);

export default async function checkUserExists(username: User["username"]){
    return await userRepository.findOne({
        where: {username: username}
    });
}
