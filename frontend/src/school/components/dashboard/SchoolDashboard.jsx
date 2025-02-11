import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Paper, CardMedia, IconButton, TextField, Button } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // Importing Grid2
import axios from "axios";
import { Bar } from "react-chartjs-2";
import PreviewIcon from '@mui/icons-material/Preview';

// ChartJS setup
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { baseUrl } from "../../../environment";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';

import CustomizedSnackbars from "../../../basic utility components/CustomizedSnackbars";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  minWidth: "400px",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const SchoolDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [schoolDetails, setSchoolDetails] = useState(null);
  const [schoolName, setSchoolName] = useState('');
  const [schooImage, setSchoolImage] = useState('');
  const [schoolEdit, setSchoolEdit] = useState(false);
  const [preview, setPreview] = useState(false);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const resetMessage = () => setMessage("");

  // Dummy Data
  const dummyData = {
    totalStudents: 120,
    totalTeachers: 15,
    classes: [
      { _id: "1", class_text: "Class 1" },
      { _id: "2", class_text: "Class 2" },
      { _id: "3", class_text: "Class 3" },
      { _id: "4", class_text: "Class 4" },
    ],
    subjects: [
      { _id: "1", subject_name: "Mathematics" },
      { _id: "2", subject_name: "Science" },
      { _id: "3", subject_name: "History" },
      { _id: "4", subject_name: "Geography" },
    ],
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await axios.get(
          `${baseUrl}/student/fetch-with-query`,{params:{}}
        );
        const teacherRes = await axios.get(
          `${baseUrl}/teacher/fetch-with-query`,{params:{}}
        );
        const classesRes = await axios.get(`${baseUrl}/class/fetch-all`);
        const subjectsRes = await axios.get(`${baseUrl}/subject/fetch-all`);
        const schoolData = await axios.get(`${baseUrl}/school/fetch-single`);

        console.log(studentRes, teacherRes)
        setSchoolDetails(schoolData.data.data);
        setSchoolName(schoolData.data.data.school_name);
        setSchoolImage(schoolData.data.data.school_image)
        setTotalStudents(
          studentRes.data.data.length
        );
        setTotalTeachers(
          teacherRes.data.data.length
        );
        setClasses(classesRes.data.data || dummyData.classes);
        setSubjects(subjectsRes.data.data || dummyData.subjects);
      } catch (error) {
        setTotalStudents(dummyData.totalStudents);
        setTotalTeachers(dummyData.totalTeachers);
        setClasses(dummyData.classes);
        setSubjects(dummyData.subjects);
      }
    };

    fetchData();
  }, [message]);

  // Data for Classes and Subjects Chart
  const classesData = {
    labels: classes.map((classObj) => classObj.class_text),
    datasets: [
      {
        label: "Classes",
        data: classes.map(() => 1),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const subjectsData = {
    labels: subjects.map((subject) => subject.subject_name),
    datasets: [
      {
        label: "Subjects",
        data: subjects.map(() => 1),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleSchoolEdit = ()=>{
    setSchoolEdit(true)
    setImageUrl(null)
  }


  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Independent state for image preview

  // Handle image file selection
  const addImage = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };


  const fileInputRef = useRef(null);
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
    setFile(null); // Reset the file state
    // setImageUrl(null); // Clear the image preview
  };

const handleSubmit = (e)=>{
    e.preventDefault();
    const fd = new FormData();
    fd.append("school_name", schoolName)
    if (file) {
      fd.append("image", file, file.name);
    }

    axios
      .patch(`${baseUrl}/school/update`, fd)
      .then((resp) => {
        setMessage(resp.data.message);
        setType("success");
        handleClearFile();
        setSchoolEdit(false)
        console.log("Response", resp)
      })
      .catch((e) => {
        setMessage(e.response.data.message);
        setType("error");
      });
  
}
  return (
    <Box sx={{ p: 3 }}>
       {message && (
        <CustomizedSnackbars
          reset={resetMessage}
          type={type}
          message={message}
        />
      )}
      {schoolEdit && 
      <Paper sx={{maxWidth:'780px', margin:"auto",padding:"10px", marginTop:"120px"}} >
       <Box
       component="form"
       noValidate
       autoComplete="off" >
       <Box
         sx={{
          display:'flex',
          flexDirection:'column'
         }}
       >
         <Typography sx={{ marginRight: "50px" }} variant="h4"> School Pic </Typography>

         <TextField
           name="file"
           type="file"
           onChange={addImage}
           inputRef={fileInputRef}
         />
         {imageUrl &&  
             <CardMedia
               component="img"
               sx={{marginTop:'10px'}}
               image={imageUrl}
               height="440px"
             /> 
         }
       </Box>
        <TextField
         fullWidth
         sx={{ marginTop: "10px" }}
         value={schoolName}
         id="filled-basic"
         label="School Name "
         variant="outlined"
         onChange={e=>{setSchoolName(e.target.value)}}
       />
       <Box>
       <Button
           onClick={handleSubmit} 
           variant="outlined" 
           sx={{ marginTop: "10px",marginRight:'5px' }} >
          Submit
         </Button>

         <Button
           onClick={()=>{setSchoolEdit(false)}}
           variant="outlined"
           sx={{ marginTop: "10px" }}
         >
          Cancel
         </Button>
       </Box>
       

       </Box>

      </Paper>

      }
    
             <Typography variant="h4" gutterBottom>
               Dashboard {schoolDetails && `[ ${schoolDetails.school_name} ]`}
             </Typography>

           {preview &&  
            <Box sx={{position:"fixed", top:'0',left:'0', zIndex:'9999',height:'100vh',
              width:"100%",background:'black',padding:'10px'}}>
                <Box sx={{height:"100%", width:"100%"}}>
              <CardMedia
               component="img"
               image={`/images/uploaded/school/${schooImage}`}
               height="100%"
             /> 
             <Button onClick={()=>{setPreview(false)}} sx={{color:'#fff',background:'tomato',position:'absolute', right:'10px', top:"47%"}}> X</Button>
             </Box>
             </Box>
           }

      {schoolDetails && (
        <Box
          sx={{
            position:'relative',
            height: "500px",
            width: "auto",
            background: `url(/images/uploaded/school/${schoolDetails.school_image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">{schoolDetails.school_name}</Typography>
          <Box sx={{position:'absolute', bottom:'10px',right:'10px'}} >
            <Button onClick={()=>{setPreview(true)}}>
              <PreviewIcon sx={{color:"#fff", fontSize:'40px'}}/>
            </Button>
          
          <IconButton sx={{background:'white'}} onClick={handleSchoolEdit} color="primary">
            <EditIcon />
          </IconButton>
          </Box>
        </Box>
      )}



      <Grid2 container spacing={3}>
        {/* Total Students */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Item>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4">{totalStudents}</Typography>
            </Paper>
          </Item>
        </Grid2>

        {/* Total Teachers */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Item>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Teachers</Typography>
              <Typography variant="h4">{totalTeachers}</Typography>
            </Paper>
          </Item>
        </Grid2>

        {/* Classes Chart */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Item>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Classes Overview</Typography>
              <Bar data={classesData} options={{ responsive: true }} />
            </Paper>
          </Item>
        </Grid2>

        {/* Subjects Chart */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Item>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Subjects Overview</Typography>
              <Bar data={subjectsData} options={{ responsive: true }} />
            </Paper>
          </Item>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SchoolDashboard;
