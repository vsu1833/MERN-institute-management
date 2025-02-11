import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../environment";

const NoticeStudent = () => {
 

 


  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/notices/fetch/${'student'}`);
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices", error);
      }
    };
    fetchNotices();
  }, []);

  return (<>
   
    <Box>
      <Typography sx={{margin:'auto', textAlign:"center"}} variant="h3">Notice Board</Typography>
    
      <Box sx={{ mt: 2 }}>
        {notices.map((notice) => (
          <Paper key={notice._id} sx={{ p: 2, m: 2, display:'inline-block',  }}>
            <Typography variant="h5">{notice.title}</Typography>
            <Typography variant="p">{notice.message}</Typography>
            <Typography variant="body2" sx={{ mt: 1, display: "block" }}>
              Audiance:  {notice.audience} on {new Date(notice.date).toLocaleDateString()}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
    </>
  );
};

export default NoticeStudent;
