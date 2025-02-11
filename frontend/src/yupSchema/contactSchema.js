import * as yup from 'yup';

export const descriptionSchema = yup.object({
    email:yup.string().email("It must be an  Email").min(2,"Country must contain 2 characters").required("Country is required"),
    Subject:yup.string().min(2, "Must contain 2 characters.").required("Subject is a required fild."),
    description:yup.string().min(27, "Must contain 27 characters.").required("Description is a required fild."),
})