import { User } from "../entity/user";
import { MetadataDataSource } from "../config/data-source";

// Function to save the user to the database
export const saveUserToDatabase = async (userData: { username: string; email: string; password: string }) => {
    const userRepository = MetadataDataSource.getRepository(User);
    
    const newUser = new User();
    newUser.username = userData.username;
    newUser.email = userData.email;
    newUser.password = userData.password;

    try {
        const savedUser = await userRepository.save(newUser);
        return savedUser;
    } catch (error:any) {
        return false;
    }
};
