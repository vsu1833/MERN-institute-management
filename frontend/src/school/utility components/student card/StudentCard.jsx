/* eslint-disable react/prop-types */

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#fff",
  boxShadow: "none",
  textTransform: "uppercase",
}));
export default function StudentCardAdmin({
  handleEdit,
  student,
  handleDelete,
}) {
  const convertDate = (dateData) => {
    const date = new Date(dateData);
    const dateNu = date.getDate();
    const month = +date.getMonth() + 1;
    const year = date.getFullYear();

    return dateNu + "/" + month + "/" + year;
  };

  useEffect(() => {
    console.log("Student", student);
  }, []);
  return (
    <>
      <Card sx={{ maxWidth: 545 , margin:'5px'}}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="360"
          image={`/images/uploaded/student/${student.student_image}`}
        />
        <CardContent>
          <Typography
            component={"div"}
            sx={{ typography: "text.secondary" }}
            variant="h5"
          >
            <b>Name :</b>
            <span>{student.name}</span>
          </Typography>
          <Typography component={"div"} variant="h5">
            <b>Student Class :</b>
            {student.student_class && student.student_class.class_text}
          </Typography>
          <Typography component={"div"} variant="h5">
            <b>Age :</b>
            {student.age}
          </Typography>
          <Typography component={"div"} variant="h5">
            <b>Gender :</b>
            {student.gender}
          </Typography>
          <Typography component={"div"} variant="h5">
            <b>Guardian :</b>
            {student.guardian}
          </Typography>
          <Typography component={"div"} variant="h5">
            <b>Guardian Phone :</b>
            {student.guardian_phone}
          </Typography>
          <Typography component={"div"} variant="p">
                  <b>Date of Admission:</b>
                  <span>{convertDate(student.createdAt)}</span>{" "}
                </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
          {/* <Box component={'div'} sx={{position:"absolute",width:"100%", bottom:0, display:'flex',justifyContent:"end"}} > */}
          <Button
          size="small"
            variant="contained"
            sx={{ background: "red", color: "#fff" }}
            onClick={() => {
              handleDelete(student._id);
            }}
          >
            Delete
          </Button>
          <Button
          size="small"
            variant="contained"
            sx={{ background: "gold", color: "#222222" }}
            onClick={() => {
              handleEdit(student._id);
            }}
          >
            Edit
          </Button>
          {/* </Box> */}
        </CardActions>
      </Card>
      
    </>
  );
}
