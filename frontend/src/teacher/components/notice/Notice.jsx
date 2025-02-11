import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../environment";
import NoData from "../../../basic utility components/NoData";

const NoticeTeacher = () => {
 

 


  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/notices/fetch/teacher`);
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices", error);
      }
    };
    fetchNotices();
  }, []);

  return (<>
   
    <Box>
      <Typography sx={{textAlign:"center"}} variant="h4">Notice Board</Typography>
    
    {notices.length<1 ? <NoData text={'There is no Notice.'} />: 
    
      <Box sx={{ mt: 2 }}>
        {notices.map((notice) => (
          <Paper key={notice._id} sx={{ p: 2, m: 2, display:"inline-block", background:"lightgreen" }}>
            <Typography variant="h5">{notice.title}</Typography>
            <Typography variant="p">{notice.message}</Typography>
            <Typography variant="body2" sx={{ mt: 1, display: "block" }}>
              {/* Audiance:  {notice.audience} <br/> */}
              Posted On:  {new Date(notice.date).toLocaleDateString()}
            </Typography>
          </Paper>
        ))}
      </Box>
    }
    </Box>

    </>
  );
};

export default NoticeTeacher;
