import * as yup from 'yup';

export const registerSchema = yup.object({
    school_name:yup.string().min(4,"School name must contain 4 characters").required("School Name is required"),
    email:yup.string().email("It must be an  Email").min(2,"Email must contain 2 characters").required("Email is required"),
    owner_name:yup.string().min(2,"User must contain 2 characters").required("User is required"),
    password:yup.string().min(8,"Password must contain 8 characters.").required("Password is a required fild."),
    confirm_password:yup.string().oneOf([yup.ref('password'),null],"Password Must Match.").required("Confirm Password is a required fild."),
})