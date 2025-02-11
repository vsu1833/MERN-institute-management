// Carousel.js
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Typography, Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const carouselItems = [
  {
    image:
      "https://cmmonline.com/wp-content/uploads/09-07-2023-news-College-students-arriving-for-night-school-1456749194-feat.jpg",

    title: "Explore Our Classrooms",
    description: "Engaging and inspiring environments for every student.",
  },
  {
    image:
      "https://mamikon.com/wp-content/uploads/2019/06/shutterstock_130517294.jpg",
    title: "Empowering Students",
    description: "We believe in fostering the potential of each child.",
  },
  {
    image:
      "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/EN4YCKGLJYI6TFQVR4NDFFROAQ.jpg&w=1200",
    title: "Learning Tools",
    description: "Providing the right tools for effective learning.",
  },
];
const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const handleBack = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <SwipeableViews
        index={activeIndex}
        onChangeIndex={(index) => setActiveIndex(index)}
      >
        {carouselItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              textAlign: "center",
              color: "white",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "70vh",
                minHeight: "400px",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "rgba(0, 0, 0, 0.6)",
                padding: "10px 20px",
                borderRadius: 1,
              }}
            >
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          </Box>
        ))}
      </SwipeableViews>

      {/* Navigation Buttons */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <Button variant="contained" onClick={handleBack}>
          <ArrowBackIosIcon />
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <Button variant="contained" onClick={handleNext}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Carousel;
