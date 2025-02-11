import * as yup from 'yup';

export const examSchema = yup.object({
    exam_date:yup.string().required("Exam  date is required."),
    subject:yup.string().required("Subject is a required fild."),
    exam_type:yup.string().min(3, "Must contain 3 characters.").required("Exam Type is a required field.")
})