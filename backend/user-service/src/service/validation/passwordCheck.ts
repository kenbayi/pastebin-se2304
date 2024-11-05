import bcrypt from "bcrypt"

export default async function comparePassword(income:string, existone:string){
    return await bcrypt.compare(income, existone);
}
