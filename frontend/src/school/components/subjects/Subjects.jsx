/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    Table,
    TableContainer,
  } from "@mui/material";
  import dayjs from "dayjs";
  import { useFormik } from "formik";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { baseUrl } from "../../../environment";
  import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
  import { subjectSchema } from "../../../yupSchema/subjectSchema";
  
  export default function Subject() {
    const [studentSubject, setStudentSubject] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
  
  
   
  
    
  
    const handleDelete = (id) => {
      if (confirm("Are you sure you want to delete?")) {
        axios
          .delete(`${baseUrl}/subject/delete/${id}`)
          .then((resp) => {
            setMessage(resp.data.message);
            setType("success");
          })
          .catch((e) => {
            setMessage(e.response.data.message);
            setType("error");
            console.log("Error, deleting", e);
          });
      }
    };
    const handleEdit = (id) => {
      console.log("Handle  Edit is called", id);
      setEdit(true);
      axios.get(`${baseUrl}/subject/fetch-single/${id}`)
        .then((resp) => {
          Formik.setFieldValue("subject_name", resp.data.data.subject_name);
          Formik.setFieldValue("subject_codename", resp.data.data.subject_codename);
          setEditId(resp.data.data._id);
        })
        .catch((e) => {
          console.log("Error  in fetching edit data.");
        });
    };
  
    const cancelEdit = () => {
      setEdit(false);
    Formik.resetForm()
    };
  
    //   MESSAGE
    const [message, setMessage] = useState("");
    const [type, setType] = useState("succeess");
  
    const resetMessage = () => {
      setMessage("");
    };
  
    const initialValues = {
      subject_name: "",
      subject_codename:""
    };
    const Formik = useFormik({
      initialValues: initialValues,
      validationSchema: subjectSchema,
      onSubmit: (values) => {
        if (isEdit) {
          console.log("edit id", editId);
          axios
            .patch(`${baseUrl}/subject/update/${editId}`, {
              ...values,
            })
            .then((resp) => {
              console.log("Edit submit", resp);
              setMessage(resp.data.message);
              setType("success");
              cancelEdit();
            })
            .catch((e) => {
              setMessage(e.response.data.message);
              setType("error");
              console.log("Error, edit casting submit", e);
            });
        } else {
        
            axios
              .post(`${baseUrl}/subject/create`,{...values})
              .then((resp) => {
                console.log("Response after submitting admin casting", resp);
                setMessage(resp.data.message);
                setType("success");
              })
              .catch((e) => {
                setMessage(e.response.data.message);
                setType("error");
                console.log("Error, response admin casting calls", e);
              });
            Formik.resetForm();
          
        }
      },
    });
  
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const fetchStudentSubject = () => {
      // axios
      //   .get(`${baseUrl}/casting/get-month-year`)
      //   .then((resp) => {
      //     console.log("Fetching month and year.", resp);
      //     setMonth(resp.data.month);
      //     setYear(resp.data.year);
      //   })
      //   .catch((e) => {
      //     console.log("Error in fetching month and year", e);
      //   });
    };
  
    const fetchstudentssubject = () => {
      axios
        .get(`${baseUrl}/subject/fetch-all`)
        .then((resp) => {
          console.log("Fetching data in  Casting Calls  admin.", resp);
          setStudentSubject(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching casting calls admin data", e);
        });
    };
    useEffect(() => {
      fetchstudentssubject();
      fetchStudentSubject();
    }, [message]);
    return (
      <>
        {message && (
          <CustomizedSnackbars
            reset={resetMessage}
            type={type}
            message={message}
          />
        )}
        <Box
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            component={"div"}
          >
            <Typography className="hero-text" variant="h2">Subject</Typography>
          </Box>
  
          <Box component={"div"} sx={{ }}>
            <Paper
              sx={{ padding:'20px', margin: "10px" }}
            >
              {isEdit ? (
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "800", textAlign: "center" }}
                >
                  Edit subject
                </Typography>
              ) : (
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "800", textAlign: "center" }}
                >
                  Add New  subject
                </Typography>
              )}{" "}
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={Formik.handleSubmit}
              >
                
  
                <TextField
                  fullWidth
                  sx={{ marginTop: "10px" }}
                  id="filled-basic"
                  label="Subject Text "
                  variant="outlined"
                  name="subject_name"
                  value={Formik.values.subject_name}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
                {Formik.touched.subject_name && Formik.errors.subject_name && (
                  <p style={{ color: "red", textTransform: "capitalize" }}>
                    {Formik.errors.subject_name}
                  </p>
                )}
  
  
                <TextField
                  fullWidth
                  sx={{ marginTop: "10px" }}
                  id="filled-basic"
                  label="Subject Codename "
                  variant="outlined"
                  name="subject_codename"
                  value={Formik.values.subject_codename}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
                {Formik.touched.subject_codename && Formik.errors.subject_codename && (
                  <p style={{ color: "red", textTransform: "capitalize" }}>
                    {Formik.errors.subject_codename}
                  </p>
                )}
  
             
           
  
  
  
  
  
                <Box sx={{ marginTop: "10px" }} component={"div"}>
                  <Button
                    type="submit"
                    sx={{ marginRight: "10px" }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                  {isEdit && (
                    <Button
                      sx={{ marginRight: "10px" }}
                      variant="outlined"
                      onClick={cancelEdit}
                    >
                      Cancel Edit
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </Box>
  
        
  
          <Box>
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
               <TableCell component="th" scope="row"> subject Name</TableCell>
                <TableCell align="right">Codename</TableCell>
                <TableCell align="right">Details</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentSubject.map((value,i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.subject_name}
                </TableCell>
                <TableCell align="right">{value.subject_codename}</TableCell>
                <TableCell align="right">{"Details"}</TableCell>
                <TableCell align="right">  <Box component={'div'} sx={{bottom:0, display:'flex',justifyContent:"end"}} >
                                  <Button variant='contained' sx={{background:"red",color:"#fff"}} onClick={()=>{handleDelete(value._id)}}>Delete</Button>
                                  <Button variant='contained' sx={{background:"gold", color:"#222222"}} onClick={()=>{handleEdit(value._id)}}>Edit</Button>
                              </Box></TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
          </Box>
        </Box>
      </>
    );
  }
  