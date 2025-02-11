import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { descriptionSchema } from "../../../yupSchema/contactSchema";

import ("./Contact.css")
export default function Contact() {


    const initialValues = {
        email: "",
        subject: "",
        description: ""
    }
    const Formik = useFormik({
        initialValues: initialValues,
        validationSchema: descriptionSchema,
        onSubmit: (values) => {
            console.log("Contact Formik values", values)
        }
    })

    return (<>

<Box component={'div'} sx={{background:"black",padding:'40px'}}> 
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", background: "black" }} component={'div'}>
            <Typography className="text-beautify hero-text">Contact</Typography>
        </Box>
        <Paper className="container-form-paper" sx={{ padding: "20px", margin: "10px" }}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={Formik.handleSubmit}
            >
                <TextField fullWidth sx={{ marginTop: "10px" }} id="outlined-basic"
                    label="Email" variant="outlined"
                    name="email"
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.email && Formik.errors.email && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.email}</p>}

                <TextField fullWidth sx={{ marginTop: "10px" }} id="filled-basic"
                    label="Subject" variant="outlined" name="subject"
                    value={Formik.values.subject}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.touched.subject && Formik.errors.subject && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.subject}</p>}

                <TextField fullWidth sx={{ marginTop: "10px" }} id="standard-basic"
                    label="Description" variant="outlined" name="description"
                    value={Formik.values.description}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    multiline
                    rows={4} />
                {Formik.touched.description && Formik.errors.description && <p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.description}</p>}

                <Box sx={{ marginTop: "10px" }} component={'div'}>
                    <Button type="submit" sx={{ marginRight: "10px" }} variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
        </Box>
    </>)
}