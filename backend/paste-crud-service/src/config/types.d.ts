import { User } from "../entity/user"; 
declare global {
    module Express {
        interface Request {
            user: {
                id: User["id"];
                username: User["username"];
                email: User["email"];
            };
        }
    }
}
