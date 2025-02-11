import * as yup from 'yup';

export const teacherSchema = yup.object({
    email:yup.string().email("Must be an Email.").required("Email is required field."),
    name: yup.string().min(4, "Name must contain 4 characters").required("Name is required"),
    qualification: yup.string().min(4, "Qualification must contain 4 characters.").required("Qualification is required."),
    gender: yup.string("Gender must be string value.").required("You must select a Gender."),
    age: yup.number("Age must be a number.").required("You must give Age."),
    password: yup.string().required("Password is a required field."),
})