import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../environment";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { convertDate } from "../../../utilityFunctions";

export default function StudentExaminations(){
    
  
    // const [classId, setClassId] = useState(null)
    const [examinations, setExaminations] = useState([]);
    const [classDetails, setClassDetails] = useState(null)
    const fetchExaminations = (classId) => {
      axios
        .get(`${baseUrl}/examination/fetch-class/${classId}`)
        .then((resp) => {
          console.log("ALL Examination", resp);
          setExaminations(resp.data.data);
        })
        .catch((e) => {
          console.log("Error in fetching  Examinstions.");
        });
    };

    const getStudentDetails = ()=>{
      axios.get(`${baseUrl}/student/fetch-own`).then(resp=>{
          fetchExaminations(resp.data.data.student_class._id);
          setClassDetails({id:resp.data.data.student_class._id, class:resp.data.data.student_class.class_text})
  console.log("student",  resp)
      }).catch(e=>{
          console.log("Error in student", e)
      })
  }

useEffect(()=>{
  getStudentDetails();
   
},[])
    return(
        <>
        
        <Typography
                  sx={{ textAlign: "center" }}
                  variant="h3"
                >
                Your Examinations [ Class: {classDetails && classDetails.class} ]
                </Typography>
                <TableContainer component={"div"}>
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
    )
}