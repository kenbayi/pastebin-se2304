import * as yup from "yup";

const schemas = {
    signup: yup.object({
        username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        email: yup.string().email("Must be a valid email").required("Email is required"),
    }),
    login: yup.object({
        username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    }),
};

export default async function checkValidation(object:any, action: 'signup' | 'login'){ 
    const selectedSchema = schemas[action];
    try {
        await selectedSchema.validate(object);
        return true;
    } catch (error:any) {
        return error.errors; 
    }
};
