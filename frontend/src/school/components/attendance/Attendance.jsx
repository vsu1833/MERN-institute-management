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
    TableCell,
    TableRow,
    TableBody,
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
import { Link } from "react-router-dom";
  
  export default function Attendance() {
    const [studentClass, setStudentClass] = useState([]);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] =useState([])
  
    
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

 
 
    //   MESSAGE
    const [message, setMessage] = useState("");
    const [type, setType] = useState("succeess");
  
    const resetMessage = () => {
      setMessage("");
    };
  
    
    const fetchAttendanceData = async (studentId) => {
 
        Promise.resolve(await axios.get(`${baseUrl}/attendance/${studentId}`)).then(res=>{
            console.log(res)
            return "Hello"
        })

        // try {
        //   const response = 
        //   console.log(response,"attendance data")
        //   setAttendanceData(response.data);
        //   chartDataFunc(response.data)
        //   setLoading(false);
        // return 2
        // } catch (error) {
        //   console.error("Error fetching attendance data:", error);
        // //   setLoading(false);
        // }
    }

    useEffect(() => {
        const fetchDetailedData = async () => {
          try {
            const detailedDataPromises = students.map(student => 
              axios.get(`${baseUrl}/attendance/${student._id}`) // Fetch details for each item by id
            );
    
            const detailedDataResponses = await Promise.all(detailedDataPromises);
           
            const detailedData = detailedDataResponses.map(response => response.data); // Extract the data from responses
            console.log(detailedData, "Detailed Data")
            setAttendance(detailedData); // Set the detailed data
          } catch (error) {
            console.error('Error fetching detailed data:', error);
          }
        };
    
        if (students.length > 0) {
          fetchDetailedData(); // Trigger the second API call only when the initial list is ready
        }
      }, [students]);

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
          console.log("Fetching data in  Students.", resp);
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
          sx={{ background: "rgb(2, 12, 20)", padding: "40px 10px 20px 10px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            component={"div"}
          >
            <Typography className="text-beautify hero-text">Attendance</Typography>
          </Box>
  
     
          <Box
            sx={{
              padding: "5px",
              minWidth: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              background: "#fff",
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
  
          <Box>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Guardian Phone</TableCell>
            <TableCell align="right">Class</TableCell>
            <TableCell align="right">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {students &&
              students.map((student, i) => {
                return (
                             <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell align="right">{student.gender}</TableCell>
              <TableCell align="right">{student.guardian_phone}</TableCell>
              <TableCell align="right">{student.student_class.class_text}</TableCell>
              {/* <TableCell >{fetchAttendanceData(student._id)}</TableCell> */}
              <TableCell align="right"><Link to={`/school/attendance-student/${student._id}`}>Attendance</Link></TableCell>
            </TableRow>) }
          )}
        </TableBody>
      </Table>
    </TableContainer>
          
          </Box>
        </Box>
      </>
    );
  }
  