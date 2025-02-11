/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/Inbox';

const NoData = ({text}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      color="text.secondary"
    >
      <InboxIcon style={{ fontSize: 80, marginBottom: 16 }} />
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
};

export default NoData;
