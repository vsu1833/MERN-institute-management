import * as yup from 'yup';

export const loginSchema = yup.object({
    email:yup.string().email("It must be an  Email").min(2,"Email must contain 2 characters").required("Email is required"),
      password:yup.string().required("Password is a required field."),
})