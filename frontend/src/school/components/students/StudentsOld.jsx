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
} from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
import { studentSchema } from "../../../yupSchema/studentSchema";
import StudentCardAdmin from "../../utility components/student card/StudentCard";

export default function Students() {
  const [studentClass, setStudentClass] = useState([]);
  const [students, setStudents] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [date, setDate] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const addImage = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    console.log("Image", file, event.target.value);
    setFile(file);
  };

  const [params, setParams] = useState({});
  const handleClass = (e) => {
    let newParam;
    if (e.target.value !== "") {
      newParam = { ...params, student_class: e.target.value };
    } else {
      newParam = { ...params };
      delete newParam["student_class"];
    }

    setParams(newParam);
  };

  const handleSearch = (e) => {
    let newParam;
    if (e.target.value !== "") {
      newParam = { ...params, search: e.target.value };
    } else {
      newParam = { ...params };
      delete newParam["search"];
    }

    setParams(newParam);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .delete(`${baseUrl}/student/delete/${id}`)
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
      .get(`${baseUrl}/student/fetch-single/${id}`)
      .then((resp) => {
        Formik.setFieldValue("email", resp.data.data.email);
        Formik.setFieldValue("name", resp.data.data.name);
        Formik.setFieldValue("student_class", resp.data.data.student_class._id)
        Formik.setFieldValue("gender", resp.data.data.gender)
        Formik.setFieldValue("age", resp.data.data.age)
        Formik.setFieldValue("guardian", resp.data.data.guardian)
        Formik.setFieldValue("guardian_phone", resp.data.data.guardian_phone)
        Formik.setFieldValue("password", resp.data.data.password)
        setEditId(resp.data.data._id);
      })
      .catch((e) => {
        console.log("Error  in fetching edit data.");
      });
  };

  const cancelEdit = () => {
    setEdit(false);
    Formik.resetForm();
    if (!isEdit) {
      setFile(null);
      setImageUrl(null);
    }
  };
  

  //   MESSAGE
  const [message, setMessage] = useState("");
  const [type, setType] = useState("succeess");

  const resetMessage = () => {
    setMessage("");
  };

  const initialValues = {
    name: "",
    email: "",
    student_class: "",
    gender:"",
    age:"",
    guardian: "",
    guardian_phone: "",
    student_image: "",
    password: "",
  };
  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: studentSchema,
    onSubmit: (values) => {
      console.log("Form values", values);
      if (isEdit) {
        // Edit functionality
        axios.patch(`${baseUrl}/student/update/${editId}`, {
            ...values,
          })
          .then((resp) => {
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
        if (file) {
          const fd = new FormData();
          fd.append("image", file, file.name);
          fd.append("email", values.email);
          fd.append("name", values.name);
          fd.append("student_class", values.student_class);
          fd.append("age", values.age);
          fd.append("gender", values.gender);
          fd.append("guardian", values.guardian);
          fd.append("guardian_phone", values.guardian_phone);
          fd.append("password", values.password);
          axios
            .post(`${baseUrl}/student/register`, fd)
            .then((resp) => {
              setMessage(resp.data.message);
              setType("success");
              Formik.resetForm();
              if (!isEdit) {
                setFile(null);
                setImageUrl(null);
              }
            })
            .catch((e) => {
              setMessage(e.response.data.message);
              setType("error");
              console.log("Error, response admin casting calls", e);
            });
        } else {
          setMessage("Please provide an image.");
          setType("error");
        }
      }
    },
    
  });

  

  const fetchStudentClass = () => {
    axios
    .get(`${baseUrl}/class/fetch-all`)
    .then((resp) => {
      setStudentClass(resp.data.data)
    console.log("Class",resp.data)
    })
    .catch((e) => {
      console.log("Error in fetching student Class", e);
    });
  };

  const fetchStudents = () => {
    axios
      .get(`${baseUrl}/student/fetch-with-query`, { params: params })
      .then((resp) => {
        console.log("Fetching data in  Casting Calls  admin.", resp);
        setStudents(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching casting calls admin data", e);
      });
  };
  useEffect(() => {
    fetchStudents();
    fetchStudentClass();
  }, [message, params]);
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
          <Typography variant="h2" >Students</Typography>
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
                Edit Students
              </Typography>
            ) : (
              <Typography
                variant="h4"
                sx={{ fontWeight: "800", textAlign: "center" }}
              >
                Add New Student
              </Typography>
            )}{" "}
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={Formik.handleSubmit}
            >
              {!isEdit && (
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <Typography style={{ marginRight: "50px" }} variant="h4">
                    Student Pic
                  </Typography>
                  <TextField
                    sx={{ marginTop: "10px" }}
                    id="filled-basic"
                    variant="outlined"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      addImage(event);
                    }}
                  />

                  {file && (
                    <Box sx={{ position: "relative" }} component={"div"}>
                      <CardMedia
                        component={"img"}
                        image={imageUrl}
                        height={"240px"}
                      />
                    </Box>
                  )}
                </Box>
              )}

              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="filled-basic"
                label="email "
                variant="outlined"
                name="email"
                value={Formik.values.email}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.email && Formik.errors.email && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.email}
                </p>
              )}

              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="filled-basic"
                label="name "
                variant="outlined"
                name="name"
                value={Formik.values.name}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.name && Formik.errors.name && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.name}
                </p>
              )}

              <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Class"
                  name="student_class"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.student_class}
                >
                  {studentClass &&
                    studentClass.map((value, i) => {
                      return (
                        <MenuItem key={i} value={value._id}>
                          {value.class_text}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {Formik.touched.student_class && Formik.errors.student_class && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.student_class}
                </p>
              )}


<br/>
              <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  name="gender"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  value={Formik.values.gender}
                >
                  <MenuItem value={""}>Select Gender</MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
              {Formik.touched.gender && Formik.errors.gender && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.gender}
                </p>
              )}


<TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="filled-basic"
                label="Age "
                variant="outlined"
                name="age"
                value={Formik.values.age}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.age && Formik.errors.age && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.age}
                </p>
              )}


              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="filled-basic"
                label="Guardian "
                variant="outlined"
                name="guardian"
                value={Formik.values.guardian}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.guardian && Formik.errors.guardian && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.guardian}
                </p>
              )}

              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="filled-basic"
                label="Guardian Phone "
                variant="outlined"
                name="guardian_phone"
                value={Formik.values.guardian_phone}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.guardian_phone &&
                Formik.errors.guardian_phone && (
                  <p style={{ color: "red", textTransform: "capitalize" }}>
                    {Formik.errors.guardian_phone}
                  </p>
                )}

                {!isEdit && <>
                
              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="filled-basic"
                label="Password "
                variant="outlined"
                name="password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.password && Formik.errors.password && (
                <p style={{ color: "red", textTransform: "capitalize" }}>
                  {Formik.errors.password}
                </p>
              )}
                </>}


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

        <Box
          sx={{
            padding: "5px",
            minWidth: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >
          <FormControl
            sx={{
              minWidth: "200px",
              padding: "5px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Student Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Class"
              onChange={handleClass}
            >
              <MenuItem value={""}>Select Class</MenuItem>
              {studentClass &&
                studentClass.map((value, i) => {
                  return (
                    <MenuItem key={i} value={value._id}>
                      {value.class_text}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <TextField
            id="filled-basic"
            label="Search Name  .. "
            onChange={handleSearch}
          />
        </Box>

        <Box sx={{display:"flex",  flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between"}}>
          {students &&
            students.map((student, i) => {
              return (
                <StudentCardAdmin
                  key={i}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  student={student}
                />
              );
            })}
        </Box>
      </Box>
    </>
  );
}
