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

  import { useFormik } from "formik";
  import { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import { baseUrl } from "../../../environment";
  import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
  import { teacherSchema } from "../../../yupSchema/teacherSchemal";
import TeacherCardAdmin from "../../utility components/teacher card/TeacherCard";
 
  
  export default function Teachers() {
    const [teacherClass, setteacherClass] = useState([]);
    const [teachers, setteachers] = useState([]);
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
          .delete(`${baseUrl}/teacher/delete/${id}`)
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
        .get(`${baseUrl}/teacher/fetch-single/${id}`)
        .then((resp) => {
          Formik.setFieldValue("email", resp.data.data.email);
          Formik.setFieldValue("name", resp.data.data.name);
          Formik.setFieldValue("qualification", resp.data.data.qualification)
          Formik.setFieldValue("gender", resp.data.data.gender)
          Formik.setFieldValue("age", resp.data.data.age);
          Formik.setFieldValue("password", resp.data.data.password)
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

    //   CLEARING IMAGE FILE REFENCE FROM INPUT
  const fileInputRef = useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
    setFile(null); // Reset the file state
    setImageUrl(null); // Clear the image preview
  };

  
    //   MESSAGE
    const [message, setMessage] = useState("");
    const [type, setType] = useState("succeess");
  
    const resetMessage = () => {
      setMessage("");
    };
  
    const initialValues = {
        email: "",
        name:  "",
        qualification:  "",
        gender:  "",
        age: "",
        password: ""
    };

    const Formik = useFormik({
      initialValues: initialValues,
      validationSchema: teacherSchema,
      onSubmit: (values) => {
        console.log("teacher calls admin Formik values", values);
        if (isEdit) {

            const fd = new FormData();
            Object.keys(values).forEach((key) => fd.append(key, values[key]));
            if (file) {
              fd.append("image", file, file.name);
            }
    
            axios
              .patch(`${baseUrl}/teacher/update/${editId}`, fd)
              .then((resp) => {
                setMessage(resp.data.message);
                setType("success");
                handleClearFile();
                cancelEdit();
              })
              .catch((e) => {
                setMessage(e.response.data.message);
                setType("error");
              });
          } else {
          if (file) {
            // const fd = new FormData();
            // fd.append("image", file, file.name);
            // fd.append('email', values.email);
            // fd.append("name", values.name);
            // fd.append("qualification", values.qualification);
            // fd.append("age", values.age);
            // fd.append("gender", values.gender);
            // fd.append("password", values.password)
            const fd = new FormData();
            fd.append("image", file, file.name);
            Object.keys(values).forEach((key) => fd.append(key, values[key]));
  
            axios
              .post(`${baseUrl}/teacher/register`, fd)
              .then((resp) => {
                console.log("Response after submitting admin teacher", resp);
                setMessage(resp.data.message);
                setType("success");
                handleClearFile()
              })
              .catch((e) => {
                setMessage(e.response.data.message);
                setType("error");
                console.log("Error, response admin teacher calls", e);
              });
            Formik.resetForm();
            setFile(null);
          } else {
            setMessage("Please provide image.");
            setType("error");
          }
        }
      },
    });
  
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const fetchteacherClass = () => {
      // axios
      //   .get(`${baseUrl}/teacher/get-month-year`)
      //   .then((resp) => {
      //     console.log("Fetching month and year.", resp);
      //     setMonth(resp.data.month);
      //     setYear(resp.data.year);
      //   })
      //   .catch((e) => {
      //     console.log("Error in fetching month and year", e);
      //   });
    };
  
    const fetchteachers = () => {
      axios
        .get(`${baseUrl}/teacher/fetch-with-query`, { params: params })
        .then((resp) => {
          console.log("Fetching data in  teacher Calls  admin.", resp);
          setteachers(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching teacher calls admin data", e);
        });
    };
    useEffect(() => {
      fetchteachers();
      // fetchteacherClass();
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
            <Typography variant="h2">Teachers</Typography>
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
                  Edit teachers
                </Typography>
              ) : (
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "800", textAlign: "center" }}
                >
                  Add New teacher
                </Typography>
              )}{" "}
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={Formik.handleSubmit}
              >
              
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
                      teacher Pic
                    </Typography>
                    <TextField
                      sx={{ marginTop: "10px" }}
                      id=""
                      variant="outlined"
                      name="file"
                      type="file"
                      onChange={(event) => {
                        addImage(event);
                      }}
                      inputRef={fileInputRef}
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
  
                <TextField
                  fullWidth
                  sx={{ marginTop: "10px" }}
                  id=""
                  label="Email "
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
                  id=""
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
  
  <TextField
                  fullWidth
                  sx={{ marginTop: "10px" }}
                  id=""
                  label="Qualification "
                  variant="outlined"
                  name="qualification"
                  value={Formik.values.qualification}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
                {Formik.touched.qualification && Formik.errors.qualification && (
                  <p style={{ color: "red", textTransform: "capitalize" }}>
                    {Formik.errors.qualification}
                  </p>
                )}
  
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
                  id=""
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
  
  
           
             
  
                  {!isEdit && <>
                  
                <TextField
                  fullWidth
                  sx={{ marginTop: "10px" }}
                  id=""
                  label="Password "
                  variant="outlined"
                  name="password"
                  type="password"
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
              marginBottom: "20px",
            }}
          >
           
           
  
            <TextField
              id=""
              label="Search Name  .. "
              onChange={handleSearch}
            />
          </Box>
  
          <Box sx={{display:"flex",  flexDirection:"row", flexWrap:"wrap",}}>
            {teachers &&
              teachers.map((teacher, i) => {
                return (
                  <TeacherCardAdmin
                    key={i}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    teacher={teacher}
                  />
                );
              })}
          </Box>
        </Box>
      </>
    );
  }
  