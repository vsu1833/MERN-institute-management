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

// ICONS
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MapIcon from "@mui/icons-material/Map";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeightIcon from "@mui/icons-material/Height";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import Person4Icon from "@mui/icons-material/Person4";
import Filter2Icon from "@mui/icons-material/Filter2";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userEditSchema } from "../../../yupSchema/userEditSchema";
import axios from "axios";
import { baseUrl } from "../../../environment";
import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { examSchema } from "../../../yupSchema/examinationSchema";
import SubjectTeacher from "./sub components/subject teacher/SubjectTeacher";
import Examinations from "./sub components/examinations/Examinations";
import Attendence from "./sub components/attendence/Attendence";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#fff",
  boxShadow: "none",
  textTransform: "uppercase",
}));

export default function ClassDetails() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const resetMessage = () => {
    setMessage("");
  };
  
  const [allClasses, setAllClasses] = useState([]);
  const [classDetails, setClassDetails] = useState(null);


  

const handleMessage=(type, message)=>{
  console.log("Called")
setType(type);
setMessage(message)
}


 




  const handleClassChange = (e) => {
    const value = e.target.value;
    navigate(`/school/class-details?class-id=${value}`);
    setMessage("Class Changed.");
    setType("success");
  };

  const navigate = useNavigate();
  const getClassId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramIdValue = urlParams.get("class-id");
    return paramIdValue;
  };

  const fetchClassWithId = () => {
    const id = getClassId();
    if (id) {
      axios
        .get(`${baseUrl}/class/fetch-single/${id}`)
        .then((resp) => {
          console.log("Single class", resp);
          setClassDetails(resp.data.data);
        })
        .catch((e) => {
          navigate("/school/class");
          console.log("Error in fetching.");
        });
    } else {
      navigate("/school/class");
    }
  };

  const fetchAllClasses = () => {
    axios
      .get(`${baseUrl}/class/fetch-all`, { params: {} })
      .then((resp) => {
        console.log("ALL classes", resp);
        setAllClasses(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching  all  Classes");
      });
  };



  // SUBJECTS
  const [allSubjects, setAllSubjects] = useState([]);
  const fetchAllSubjects = () => {
    axios
      .get(`${baseUrl}/subject/fetch-all`, { params: {} })
      .then((resp) => {
        console.log("ALL subjects", resp);
        setAllSubjects(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching  all  Classes");
      });
  };

    // Teachers
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
  
    const [examinations, setExaminations] = useState([]);
    const fetchExaminations = () => {
      axios
        .get(`${baseUrl}/examination/fetch-class/${getClassId()}`)
        .then((resp) => {
          console.log("ALL Examination", resp);
          setExaminations(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching  Examinstions.");
        });
    };



    const [students,setStudents] = useState([])
    const fetchStudents = () => {
      axios
        .get(`${baseUrl}/student/fetch-with-query`, { params: {student_class: getClassId()} })
        .then((resp) => {
          console.log("Fetching students data.", resp);
          setStudents(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching casting calls admin data", e);
        });
    };

  useEffect(() => {
    fetchAllClasses();
    fetchClassWithId();
    fetchAllSubjects();
    fetchAllTeachers();
    fetchExaminations();
    fetchStudents()
  }, [message]);
  return (
    <>
      <>
        {message && (
          <CustomizedSnackbars
            reset={resetMessage}
            type={type}
            message={message}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
          }}
          component={"div"}
        >
          <Typography className="text-beautify hero-text">
            {classDetails && <>{classDetails.class_num}</>}th Class Details
          </Typography>
        </Box>
        <Grid container spacing={0} sx={{ background: "black" }}>
          <Grid size={{ sm: 6, md: 4, xs: 12 }}>
            <Item>
              <Paper sx={{ margin: "10px", padding: "10px" }}>
                <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Change Class
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={""}
                    onChange={handleClassChange}
                  >

                    {allClasses &&
                      allClasses.map((value, i) => {
                        return (
                          <MenuItem key={i} value={value._id}>
                            {value.class_text}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Paper>

              <Paper sx={{ padding: "20px", margin: "10px" }}>
                <Typography variant="h5" className="text-beautify">
                  Students {classDetails && <>{classDetails.class_num}</>}th{" "}
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
                          Total
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: "34px" }}>
                          {students.length}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

             </Item>
          </Grid>
          <Grid size={{ sm: 6, md: 8, xs: 12 }}>
            <Item>
              {/* SubjectTeacher */}
             {/* <SubjectTeacher classId={getClassId()} allSubjects={allSubjects} asignSubTeach={classDetails && classDetails.asignSubTeach} allTeachers={allTeachers} handleMessage={handleMessage}/> */}
             <Examinations allSubjects={allSubjects} handleMessage={handleMessage} examinations={examinations} />             
            </Item>
          </Grid>
        </Grid>
      </>
    </>
  );
}
