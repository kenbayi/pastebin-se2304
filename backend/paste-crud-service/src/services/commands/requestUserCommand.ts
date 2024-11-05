import { MetadataDataSource } from "../../config/data-source";
import { User } from "../../entity/user";

export class getUserCommand {
    private authorId?: number;

    constructor(authorId?: number) {
        this.authorId = authorId;
    }


    async execute(): Promise<User | null>{
        const userRepository = MetadataDataSource.getRepository(User);

        const userData =  userRepository.findOne({where: {id: this.authorId}});

        if(!userData)
            throw new Error(`Paste with author of id ${this.authorId} not found.`);

        return userData;
    
    }
}
