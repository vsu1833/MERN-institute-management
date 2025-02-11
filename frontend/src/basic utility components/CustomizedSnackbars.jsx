/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({type, message,reset}) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    setOpen(false)
    reset()
  };
  React.useEffect(()=>{
      setOpen(true)
  },[ message])

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
         {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
{/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
<Alert
  onClose={handleClose}
  severity={type}
  variant="filled"
  sx={{ width: '100%' }}
>
 {message}
</Alert>
</Snackbar> */}