import * as yup from 'yup';

export const assignSubTeachSchema = yup.object({
    subject: yup.string().required("Subject is  required."),
    teacher: yup.string().required("Teacher  is  required.")
})