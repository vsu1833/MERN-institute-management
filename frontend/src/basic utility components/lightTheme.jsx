// lightTheme.js
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2', // Custom primary color
    },
    secondary: {
      main: '#FF4081', // Custom secondary color
    },
    background: {
      default: '#F5F5F5', // Light background color
      paper: '#FFFFFF', // Card and component backgrounds
    },
    text: {
      primary: '#333333', // Darker primary text color for contrast
      secondary: '#666666', // Slightly lighter for secondary text
    },
  },
  components: {
    MuiTypography:{
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
          fontSize: '2rem',
          fontWeight: 700,
        },
        body1: {
          fontSize: '1rem',
          color: '#333',
        },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#333333',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CCCCCC',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976D2',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976D2',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#666666',
          '&.Mui-focused': {
            color: '#1976D2',
          },
        },
      },
    },
  },
});

export default lightTheme;
