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
import axios from "axios";
import { baseUrl } from "../../../../environment";


export default function Attendee({ classId, handleMessage,params}){
    const [iseditAttendee, seteditAttendee] = useState(false)
    const [attendee, setAttendee] = useState(null)
  

    const [allTeachers, setAllTeachers] = useState([]);
    const fetchAllTeachers = () => {
      axios
        .get(`${baseUrl}/teacher/fetch-with-query`, { params: {} })
        .then((resp) => {
          console.log("ALL subjects", resp);
          setAllTeachers(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching  all  Classes");
        });
    };


    const canceleditAttendee = () => {
        seteditAttendee(false);
      };
     
    const handleeditAttendee = () => {
      seteditAttendee(true);
    };

    const initialValues = {
        attendee:""
      };
      const Formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
          axios
            .patch(`${baseUrl}/class/update/${classId}`, { ...values })
            .then((resp) => {
              handleMessage("success",resp.data.message);
              canceleditAttendee()
            })
            .catch((e) => {
              handleMessage("error",e.response.data.message);
              canceleditAttendee()
              console.log("Error  in submit edit", e);
            });
        },
      });

      const [classDetails, setClassDetails] = useState(null)
      const fetchClassWithId = () => {
      
        if (classId) {
         
          axios
            .get(`${baseUrl}/class/fetch-single/${classId}`)
            .then((resp) => {
              console.log("Single class", resp.data.data);
              setClassDetails(resp.data.data);
              if(resp.data.data.attendee){
                setAttendee(resp.data.data.attendee.name)
              }else{
                setAttendee("")
              }
              
            })
            .catch((e) => {
            //   navigate("/school/class");
              console.log("Error in fetching.");
            });
        } 
      };

      


      useEffect(()=>{
        fetchAllTeachers();
       fetchClassWithId();
      },[iseditAttendee,classId,params])
    return (
        <>
          
             {iseditAttendee && (
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
                        onClick={canceleditAttendee}
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
                            fontSize: "18px",
                          }}
                          component="th"
                          scope="row"
                        >
                          Attendee Teacher
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: "18px" }}>
                          {attendee?attendee:'No One'}
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
                  <Button variant="outlined" onClick={handleeditAttendee}>
                    {attendee? "Change Attendee":"Add Attendee"}
                  </Button>
                </Box>
                </Paper>
              
        </>
    )
}