import * as yup from 'yup';

export const studentSchema = yup.object({
    name: yup.string().min(4, "Name must contain 4 characters").required("Name is required"),
    email: yup.string().email("It must be an Email.").min(4, "email must contain 4 characters").required("email is required"),
    student_class: yup.string("Student Class must be string value.").required("Select A Class || Add New Class & Select."),
    gender: yup.string("Gender must be string value.").required("You must select a Gender."),
    age: yup.number("Age must be a number.").required("You must give Age."),
    guardian: yup.string().min(4, "Guardian must contain 4 characters").required("Guardian is required"),
    guardian_phone: yup.string().min(10, "Phone must contain 10 characters").required("Phone is required"),
    password: yup.string().required("Password is a required field."),
})