import * as yup from 'yup';

export const userEditSchema = yup.object({
    country:yup.string().min(2,"Country must contain 2 characters").required("Country is required"),
    eye_color:yup.string().min(2, "Must contain 2 characters.").required("Eye color is a required fild."),
    hair_color:yup.string().min(2, "Must contain 2 characters.").required("Hair color is a required fild."),
    height:yup.string().min(3, "Must contain 3 characters.").required("Height is a required fild."),
    weight:yup.string().min(2, "Must contain 2 characters.").required("Weight is a required fild."),
})