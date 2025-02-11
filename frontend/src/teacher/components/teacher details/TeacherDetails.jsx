import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../environment";
// import "./teacherDetails.css"
export default function TeacherDetails(){
    const [teacher, setTeacher] = useState(null)

    const getTeacherDetails = ()=>{
        axios.get(`${baseUrl}/teacher/fetch-own`).then(resp=>{
            setTeacher(resp.data.data)
    console.log("Single Teacher Details from Teacher Details page",  resp)
        }).catch(e=>{
            console.log("Error in teacher", e);
        })
    }

    useEffect(()=>{
        getTeacherDetails()
    },[])
    return(
        <>
                <Typography variant="h3" sx={{textAlign:'center', marginBottom:"15px", fontWeight:"600" }}>Teacher Details</Typography>
                {teacher && <>

                    <Box component={"div"} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",padding:"5px"}}>
                            <img src={`/images/uploaded/teacher/${teacher.teacher_image}`} alt='image' height={'370px'} width={'370px'} style={{borderRadius:"50%",border:'1px solid lightgreen',padding:"4px"}} />
                        </Box>
                    <TableContainer sx={{margin:"auto", width:"90%",border:'1px solid transparent',  borderRadius:"17px", boxShadow:"0 10px 8px -5px lightgray" }} component={'div'}>
                  <Table sx={{ minWidth: 250 }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell className="table-cell" align="left"   >
                          Name
                        </TableCell>
                        <TableCell className="table-cell" align="left" >
                            {teacher.name}
                         </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="table-cell" align="left"   >
                        Email
                        </TableCell>
                        <TableCell className="table-cell" align="left">
                         {teacher.email}
                         </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="table-cell" align="left"   >
                        Age
                        </TableCell>
                        <TableCell className="table-cell" align="left">
                         {teacher.age}
                         </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="table-cell" align="left"   >
                        Gender
                        </TableCell>
                        <TableCell className="table-cell" align="left">
                         {teacher.gender}
                         </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="table-cell" align="left"   >
                        Qualification
                        </TableCell>
                        <TableCell className="table-cell" align="left">
                         {teacher.qualification}
                         </TableCell>
                      </TableRow>


                    </TableBody>
                  </Table>
                </TableContainer>
                </>}
              
        
        </>
    )
}