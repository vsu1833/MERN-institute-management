// theme.js
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E90FF', // Custom primary color
    },
    secondary: {
      main: '#ff4081', // Custom secondary color
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Default color for all typography
        },
        h1: {
          fontSize: '2rem',
          fontWeight: 700,
          color: '#FFFFFF', // Override color for h1
        },
        body1: {
          fontSize: '1rem',
          color: '#FFFFFF', // Override color for body1
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#666666',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFFFFF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1E90FF',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#CCCCCC',
          '&.Mui-focused': {
            color: '#FFFFFF',
          },
        },
      },
    },
  },
});

export default darkTheme;
