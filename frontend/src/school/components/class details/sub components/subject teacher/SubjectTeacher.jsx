/* eslint-disable react/prop-types */
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { baseUrl } from "../../../../../environment";
import { assignSubTeachSchema } from "../../../../../yupSchema/assignSubTeacherSchema";

export default function SubjectTeacher({classId, allSubjects, allTeachers, asignSubTeach, handleMessage}){

    const [openForm,  setOpenForm] = useState(false);

    const [isEditSubjTeach, setEditSubjTeach] = useState(false);
    const [subTeachId, setSubTeachId]  = useState(null)

  

    const handleEditSubjTeach = (id) => {
      setOpenForm(true)
        setEditSubjTeach(true);
        setSubTeachId(id)
       const  filteredSubTeach= asignSubTeach.filter(x=>x._id ==id)[0];
       console.log(filteredSubTeach,"filtered sub teach");
     Formik.setFieldValue("subject", filteredSubTeach.subject._id);
          Formik.setFieldValue("teacher", filteredSubTeach.teacher._id);
     
      };

      const cancelEditSubjTeach = () => {
        setEditSubjTeach(false);
        setOpenForm(false)
      };


      const handleDelete = (subTeachId)=>{
        if(confirm("Are you sure you want to delete?")){
          axios
          .delete(`${baseUrl}/class/sub-teach/delete/${classId}/${subTeachId}`)
          .then((resp) => {
              handleMessage("success",resp.data.message);
          })
          .catch((e) => {
              handleMessage("error",e.response.data.message);
          });
  
        }
      
      }
      const Formik = useFormik({
        initialValues: {subject:"",  teacher:""},
        validationSchema: assignSubTeachSchema,
        onSubmit: (values) => {
            if(isEditSubjTeach){
                axios
                .post(`${baseUrl}/class/sub-teach/update/${classId}/${subTeachId}`, { ...values })
                .then((resp) => {
                  handleMessage("success",resp.data.message);
                })
                .catch((e) => {
                  handleMessage("error",e.response.data.message);
                  console.log("Error  in submit edit", e);
                });
            }else{
                console.log("Class id",classId)
                axios
                .post(`${baseUrl}/class/sub-teach/new/${classId}`, { ...values })
                .then((resp) => {
                  console.log("Response submit edit", resp);
                  handleMessage("success",resp.data.message);
                })
                .catch((e) => {
                  handleMessage("error",e.response.data.message);
                  console.log("Error  in submit edit", e);
                });
            }
        
        },
      });
    return(
        <>
           

         {openForm && (
                <Paper sx={{ padding: "20px", margin: "10px" }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      textTransform: "capitalize",
                      fontWeight: "700",
                    }}
                    variant="h5"
                  >
                    Assgin Subject & Teacher
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={Formik.handleSubmit}
                  >
                    <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Subject
                      </InputLabel>
                      <Select
                        label="Subject"
                        name="subject"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.subject}
                      >
                        <MenuItem value={""}>Subject</MenuItem>
                        {allSubjects &&
                          allSubjects.map((subject, i) => {
                            return (
                              <MenuItem key={i} value={subject._id}>
                                {subject.subject_name}
                              </MenuItem>
                            );
                          })}
                          </Select>
                    </FormControl>
                    {Formik.touched.subject &&
                      Formik.errors.subject && (
                        <p
                          style={{ color: "red", textTransform: "capitalize" }}
                        >
                          {Formik.errors.subject}
                        </p>
                      )}


                    <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Teacher
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Teacher"
                        name="teacher"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.teacher}
                      >
                        <MenuItem value={""}>Teacher</MenuItem>
                        {allTeachers && allTeachers.map((teacher, i)=>{
                          return (<MenuItem key={i} value={teacher._id}>{teacher.name}</MenuItem>);
                        })}
                       
                      </Select>
                    </FormControl>
                    {Formik.touched.teacher &&
                      Formik.errors.teacher && (
                        <p
                          style={{ color: "red", textTransform: "capitalize" }}
                        >
                          {Formik.errors.teacher}
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
                      <Button
                        sx={{ background: "tomato", color: "#fff" }}
                        variant="contained"
                        onClick={cancelEditSubjTeach}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              )}

              <Paper sx={{ padding: "20px", margin: "10px" }}>
                <Typography variant="h5">Subject & Teacher</Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableHead>
                     
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "25px", fontWeight: "bolder" }}
                        >
                          Subject
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "25px", fontWeight: "bolder" }}
                        >
                          Teacher
                        </TableCell>
                        <TableCell align="right"
                          sx={{ fontSize: "25px", fontWeight: "bolder" }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {asignSubTeach && asignSubTeach.map((value, i)=>{
                        return <TableRow key={i}>
                        <TableCell   >
                          {value.subject.subject_name}
                        </TableCell>
                        <TableCell align="left">{value.teacher.name}</TableCell>
                        <TableCell align="right">
                        <Box
                                  component={"div"}
                                  sx={{
                                    bottom: 0,
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                  
                                >
                                  <Button
                                    variant="contained"
                                    sx={{ background: "red", color: "#fff" }}
                                    onClick={() => {
                                    handleDelete(value._id)
                                    }}
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      background: "gold",
                                      color: "#222222",
                                    }}
                                    onClick={() => {
                                      handleEditSubjTeach(value._id);
                                    }}
                                  >
                                 Edit
                                  </Button>
                                </Box>
                        </TableCell>

                      </TableRow>
                      })}
                     

                    
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Button variant="contained" onClick={()=>{setOpenForm(true); Formik.resetForm() }}>
                    Assign New
                  </Button>
                </Box>
              </Paper>
        </>
    )
}