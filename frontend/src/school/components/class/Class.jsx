/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CardMedia,
  Paper,
  TextField,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableContainer,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
import { studentSchema } from "../../../yupSchema/studentSchema";
import StudentCardAdmin from "../../utility components/student card/StudentCard";
import { classSchema } from "../../../yupSchema/classSchema";
import { Link } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Class() {
  const [studentClass, setStudentClass] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);


 

  

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .delete(`${baseUrl}/class/delete/${id}`)
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
    axios
      .get(`${baseUrl}/class/fetch-single/${id}`)
      .then((resp) => {
        Formik.setFieldValue("class_num", resp.data.data.class_num);
        Formik.setFieldValue("class_text", resp.data.data.class_text);
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
    class_num: "",
    class_text:""
  };
  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: classSchema,
    onSubmit: (values) => {
      if (isEdit) {
        console.log("edit id", editId);
        axios
          .patch(`${baseUrl}/class/update/${editId}`, {
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
            .post(`${baseUrl}/class/create`,{...values})
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
  const fetchStudentClass = () => {
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

  const fetchstudentsClass = () => {
    axios
      .get(`${baseUrl}/class/fetch-all`)
      .then((resp) => {
        console.log("Fetching data in  Casting Calls  admin.", resp);
        setStudentClass(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching casting calls admin data", e);
      });
  };
  useEffect(() => {
    fetchstudentsClass();
    fetchStudentClass();
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
        sx={{ padding: "40px 10px 20px 10px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          component={"div"}
        >
          <Typography className="text-beautify2 hero-text" variant="h2">Class</Typography>
        </Box>

        <Box component={"div"} sx={{ padding: "40px" }}>
          <Paper
            sx={{ padding: "20px", margin: "10px" }}
          >
            {isEdit ? (
              <Typography
                variant="h4"
                sx={{ fontWeight: "800", textAlign: "center" }}
              >
                Edit Class
              </Typography>
            ) : (
              <Typography
                variant="h4"
                sx={{ fontWeight: "800", textAlign: "center" }}
              >
                Add New  Class
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
                label="Class Text "
                variant="outlined"
                name="class_text"
                value={Formik.values.class_text}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.class_text && Formik.errors.class_text && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.class_text}
                </p>
              )}


              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="filled-basic"
                label="Class Number "
                variant="outlined"
                name="class_num"
                value={Formik.values.class_num}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.class_num && Formik.errors.class_num && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.class_num}
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
     
          {studentClass.map((value,i) => (

<Paper key={value._id} sx={{ p: 2, m: 2, display: "inline-block",}}>
<Box>
  <Typography variant="h4">Class :{value.class_text} [{value.class_num}]</Typography>
  <Typography variant="h4">{value.message}</Typography>

</Box>
<Box component={'div'} sx={{width:'80%', margin:"auto"}}>
  <IconButton onClick={() => handleEdit(value._id)} color="primary">
    <EditIcon />
  </IconButton>
  <IconButton onClick={() => handleDelete(value._id)} color="secondary">
    <DeleteIcon />
  </IconButton>
</Box>
</Paper>
          ))}
     

        </Box>
      </Box>
    </>
  );
}
