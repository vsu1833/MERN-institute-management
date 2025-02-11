// Home.js
import React from 'react';
import { Container, Typography,Grid2, Card, CardContent, Box, Paper } from '@mui/material';
import Carousel from './carousel/Carousel';
import Gallery from './gallery/Gallery';


const Home = () => {
  return (
    <Box sx={{width:'100%'}}>
      {/* Carousel Section */}
      <Carousel />

    
   
      {/* Programs Section */}
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Our Programs
        </Typography>
        <Grid2 container spacing={3} justifyContent="center">
          {['Elementary School', 'Middle School', 'High School'].map((program) => (
            <Grid2 item xs={12} sm={6} md={4} key={program}>
              <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent>
                  <Typography variant="h6" textAlign="center">
                    {program}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Gallery Section */}
     
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
           Registerd Schools
        </Typography>
        <Gallery />
      </Box>

      {/* Testimonials Section */}
      {/* <Box sx={{ py: 5, textAlign: 'center', bgcolor: '#f9f9f9' }}>
        <Typography variant="h4" gutterBottom>
          What Parents Say
        </Typography>
        <Box maxWidth="600px" mx="auto" mt={2}>
          <Typography variant="body1" color="text.secondary">
            "This school has been a fantastic experience for my children. The faculty is supportive, and the programs are enriching!"
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            - Parent of Grade 3 Student
          </Typography>
        </Box>
      </Box> */}

   
    </Box>
  );
};

export default Home;
