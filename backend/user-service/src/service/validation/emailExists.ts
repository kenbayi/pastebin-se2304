import { MetadataDataSource } from "../../config/data-source";
import { User } from "../../entity/user";

const userRepository = MetadataDataSource.getRepository(User);

export default async function checkEmailExists(email:User["email"]){
    return await userRepository.findOne({
        where: {email: email}
    });
}