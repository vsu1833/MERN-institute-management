import * as yup from 'yup';

export const castingSchema = yup.object({
    title:yup.string().min(2, "Must contain 2 characters.").required("Title is a required fild."),
    description:yup.string().min(27, "Must contain 27 characters.").required("Description is a required fild.")
})