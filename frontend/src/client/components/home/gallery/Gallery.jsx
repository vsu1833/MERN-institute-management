import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ImageListItemBar, Typography } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../../environment';

// const images = [
//   { id: 1, src: 'https://cdn.pixabay.com/photo/2023/08/09/15/06/child-8179655_1280.jpg', title: 'Beautiful Landscape' },
//   { id: 2, src: 'https://cdn.pixabay.com/photo/2022/05/24/04/38/study-7217599_1280.jpg', title: 'Mountain View' },
//   { id: 3, src: 'https://cdn.pixabay.com/photo/2020/11/19/08/03/college-5757815_1280.jpg', title: 'Ocean Sunset' },
//   { id: 4, src: 'https://cdn.pixabay.com/photo/2020/02/06/20/01/university-library-4825366_1280.jpg', title: 'City Lights' },
//   { id: 5, src: 'https://cdn.pixabay.com/photo/2024/08/23/11/55/building-8991569_1280.jpg', title: 'Forest Path' },
//   { id: 6, src: 'https://cdn.pixabay.com/photo/2021/08/20/14/53/monastery-6560623_1280.jpg', title: 'Desert Dunes' },
// ];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schools,setSchools] = useState([])

  const handleOpen = (school) => {
    setSelectedSchool(school);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSchool(null);
  };


  useEffect(()=>{

    axios.get(`${baseUrl}/school/all`).then(resp=>{
        console.log(resp.data.data)
        setSchools(resp.data.data)
    }).catch(e=>{
        console.log("ERROR", e)
    })
  },[])
  return (
    <>
      <ImageList variant="masonry" cols={3} gap={8} sx={{ padding: 2 }}>
        {schools.map((school,i) => (
          <ImageListItem key={i} sx={{ cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>
            <img
              src={`./images/uploaded/school/${school.school_image}?w=248&fit=crop&auto=format`}
              srcSet={`./images/uploaded/school/${school.school_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={school.title}
              loading="lazy"
              onClick={() => handleOpen(school)}
            />
             <Typography variant='h6'>{school.school_name}</Typography>
         
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox Modal */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            outline: 'none',
            p: 2,
          }}
        >
          <Box position="relative">
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 8, right: 8, color: 'grey.500' }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h4'>{selectedSchool && selectedSchool.school_name}</Typography>
            <img
              src={`./images/uploaded/school/${selectedSchool && selectedSchool.school_image}`}
              alt={selectedSchool && selectedSchool.school_name}
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 8 }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Gallery;
