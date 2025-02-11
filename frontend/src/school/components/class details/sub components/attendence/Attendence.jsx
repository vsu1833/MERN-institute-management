/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    CardMedia,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    styled,
    TextField,
    Typography,
  } from "@mui/material";
  import Grid from "@mui/material/Grid2";
  
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { userEditSchema } from "../../../../../yupSchema/userEditSchema";
import axios from "axios";
import { baseUrl } from "../../../../../environment";


export default function Attendence({attendeeId, classId,allTeachers, handleMessage}){
    const [isEditPercent, setEditPercent] = useState(false);
    const [isEditExam, setEditExam] = useState(false);
  
    const cancelEditPercent = () => {
        setEditPercent(false);
      };
     
    const handleEditPercent = () => {
      setEditPercent(true);
      //     Formik.setFieldValue("country", user.country);
      //     Formik.setFieldValue("eye_color", user.eye_color);
      //     Formik.setFieldValue("hair_color", user.hair_color);
      //     Formik.setFieldValue("height", user.height);
      //     Formik.setFieldValue("weight", user.weight);
    };

    const initialValues = {
        attendee:""
      };
      const Formik = useFormik({
        initialValues: initialValues,
        // validationSchema: userEditSchema,
        onSubmit: (values) => {
          axios
            .patch(`${baseUrl}/class/update/${classId}`, { ...values })
            .then((resp) => {
              handleMessage("success",resp.data.message);
            })
            .catch((e) => {
              handleMessage("error",e.response.data.message);
              console.log("Error  in submit edit", e);
            });
        },
      });
    

      const [attendee, setAttendee] =useState(null)
      const fetchAttendeeTeacher =()=>{
        console.log("Attendee id", attendeeId)
        if(attendeeId){
          axios.get(`${baseUrl}/teacher/fetch-single/${attendeeId}`).then(resp=>{
            console.log("Response", resp)
            setAttendee(resp.data.data)
          }).catch(e=>{
            console.log("Error in fetching attendee teacher.")
          })
        }
      
      }

      useEffect(()=>{
       fetchAttendeeTeacher()
      },[attendeeId])
    return (
        <>
            {isEditPercent && (
                <Paper sx={{ padding: "20px", margin: "10px" }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      textTransform: "capitalize",
                      fontWeight: "700",
                    }}
                    variant="h6"
                  >
                    Select Attendee
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={Formik.handleSubmit}
                  >
                    <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Teacher
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Gender"
                        name="attendee"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.attendee}
                      >
                        <MenuItem value={""}>Teacher</MenuItem>
                        {allTeachers && allTeachers.map((teacher, i)=>{
                          return (<MenuItem key={i} value={teacher._id}>{teacher.name}</MenuItem>);
                        })}
                       
                      </Select>
                    </FormControl>

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
                        onClick={cancelEditPercent}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              )}

              <Paper sx={{ padding: "20px", margin: "10px" }}>
                <Typography variant="h5" className="text-beautify">
                  Attendence
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 230 }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "700",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "34px",
                          }}
                          component="th"
                          scope="row"
                        >
                          Percentage
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: "34px" }}>
                          87
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "700",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "18px",
                          }}
                          component="th"
                          scope="row"
                        >
                          Attendee Teacher
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: "18px" }}>
                          {attendee && attendee.name}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button variant="outlined" onClick={handleEditPercent}>
                    {attendeeId? "Change Attendee":"Add Attendee"}
                  </Button>
                </Box>
                </Paper>
        </>
    )
}