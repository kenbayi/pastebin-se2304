import bcrypt from "bcrypt";
 
export default async function hashPassword(password:string){
    try{
        return await bcrypt.hash(password, 10);
    } catch (error:any){
        return error.errors;
    }
}
