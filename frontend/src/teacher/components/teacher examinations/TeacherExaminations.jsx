/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../environment";
import { convertDate } from "../../../utilityFunctions";
import NoData from "../../../basic utility components/NoData";

export default function TeacherExaminations() {
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [examinations, setExaminations] = useState([]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const fetchExaminations = () => {
    axios
      .get(`${baseUrl}/examination/fetch-class/${selectedClass}`)
      .then((resp) => {
        console.log("ALL Examination", resp);
        setExaminations(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in fetching Examinations.");
      });
  };

  useEffect(() => {
    if (selectedClass) {
      fetchExaminations();
    }
  }, [selectedClass]);

  const fetchStudentClass = () => {
    axios
      .get(`${baseUrl}/class/fetch-all`)
      .then((resp) => {
        setAllClasses(resp.data.data);
        console.log("Class", resp.data);
        setSelectedClass(resp.data.data[0]._id);
      })
      .catch((e) => {
        console.log("Error in fetching student Class", e);
      });
  };

  useEffect(() => {
    fetchStudentClass();
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{textAlign:'center', marginBottom:"15px", fontWeight:"600" }}>Examinations</Typography>
            
      <Paper sx={{ margin: "10px", padding: "10px" }}>
        <FormControl sx={{ minWidth: "220px", marginTop: "10px" }}>
          <Typography>Change Class</Typography>
          <Select
            value={selectedClass}
            onChange={handleClassChange}
            onBlur={handleClassChange}
          >
            {allClasses &&
              allClasses.map((value) => (
                <MenuItem key={value._id} value={value._id}>
                  {value.class_text}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Paper>

      <Paper sx={{ padding: "20px", margin: "10px" }}>
      

        {examinations.length<1?<NoData text={"There is no Examination."} />:
        <>
          <Typography
          sx={{ textAlign: "center"  }}
          variant="h5"
        >
          Examinations List
        </Typography>
       
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "700" }} align="left">
                  Exam Date
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }} align="left">
                  Subject
                </TableCell>
                <TableCell sx={{ fontWeight: "700" }} align="center">
                  Exam Type
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {examinations &&
                examinations.map((examination, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {convertDate(examination.examDate)}
                      </TableCell>
                      <TableCell align="left">
                        {examination.subject.subject_name}
                      </TableCell>
                      <TableCell align="center">
                        {examination.examType}
                      </TableCell>
                    
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        </>
       }
      </Paper>
    </>
  );
}
