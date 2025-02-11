import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'

import axios from 'axios';
import { baseUrl } from '../../../environment';

const AttendanceStudent = () => {
  Chart.register(ArcElement);

  const [attendanceData, setAttendanceData] = useState([]);
  const [chartData,  setChartData] = useState([0,0]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [classDetails, setClassDetails] = useState(null);

 
 const dateConvert = (date)=>{
    const dateData  = new Date(date);
    return dateData.getDate()+"-"+ (+dateData.getMonth()+1) + "-" + dateData.getFullYear();
 }


  const chartDataFunc=(data)=>{
     
    data.forEach(data=>{
       
        if(data.status==='Present'){
          setChartData(x=>[x[0]+1,x[1]])
        }else if(data.status==='Absent'){
            setChartData(x=>[x[0],x[1]+1])
        }
    
    })
  }

  
  // Fetch attendance data for the specific student
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/attendance/${studentId}`);
        console.log(response,"attendance data")
        setAttendanceData(response.data);
        chartDataFunc(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };
  
    if(studentId){
      fetchAttendanceData();
    }
   
  }, [studentId]);

  // Calculate attendance summary for the chart
//   const attendanceSummary = attendanceData.reduce(
//     (summary, record) => {
//       if (record.status === 'Present') summary.present++;
//       if (record.status === 'Absent') summary.absent++;
//       return summary;
//     },
//     { present: 0, absent: 0 }
//   );

  // Data for the chart
  const data = {
    datasets: [
      {
        data:chartData, // 1 for Present, 0 for Absent
        backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
        hoverOffset:20
      },
    ],
    labels: ['Present', 'Absent'],
  };


  const getStudentDetails = ()=>{
    axios.get(`${baseUrl}/student/fetch-own`).then(resp=>{
        // fetchExaminations(resp.data.data.student_class._id);
        setStudentId(resp.data.data._id)
        setClassDetails({id:resp.data.data.student_class._id, class:resp.data.data.student_class.class_text})
console.log("student",  resp)
    }).catch(e=>{
        console.log("Error in student", e)
    })
}

useEffect(()=>{
getStudentDetails();
 
},[])


  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Attendance</Typography>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Attendance Chart */}
        <Box >
          <Typography variant="h6">Attendance Summary</Typography>
          <Pie style={{padding:"20px"}}  data={data} />
        </Box>

        {/* Attendance List */}
        <Box flex={1}>
          <Typography variant="h6">Attendance Records</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{dateConvert(record.date)}</TableCell>
                  <TableCell>{record.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Container>
  );
};

export default AttendanceStudent;
