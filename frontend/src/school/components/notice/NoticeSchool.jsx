import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Paper, Select, TextField, Typography, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { baseUrl } from "../../../environment";

const NoticeSchool = () => {
  const [formData, setFormData] = useState({ title: "", message: "", audience: "" });
  const [notices, setNotices] = useState([]);
  const [audience, setAudience] = useState("all");
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [editNoticeId, setEditNoticeId] = useState(null); // Store the ID of the notice being edited

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch Notices based on Audience
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${baseUrl}/notices/fetch/${audience}`);
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [audience]);

  // Add or Edit Notice
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update notice
      try {
        await axios.put(`${baseUrl}/notices/${editNoticeId}`, formData);
        alert("Notice updated successfully!");
        setIsEditing(false); // Reset to add mode
        setEditNoticeId(null); // Clear edit ID
      } catch (error) {
        alert("Failed to update notice.");
      }
    } else {
      // Add new notice
      try {
        await axios.post(`${baseUrl}/notices/add`, formData);
        alert("Notice added successfully!");
      } catch (error) {
        alert("Failed to add notice.");
      }
    }

    setFormData({ title: "", message: "", audience: "" }); // Clear form
    fetchNotices(); // Refresh notices list
  };

  // Set form data for editing
  const handleEdit = (notice) => {
    setFormData({ title: notice.title, message: notice.message, audience: notice.audience });
    setIsEditing(true);
    setEditNoticeId(notice._id);
  };

  // Delete Notice
  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to delete?")){
        try {
            await axios.delete(`${baseUrl}/notices/${id}`);
            alert("Notice deleted successfully!");
            fetchNotices();
          } catch (error) {
            alert("Failed to delete notice.");
          }
    }
    
  };

  return (
    <>
    <Box>
        <Typography  variant="h2" sx={{textAlign:"center"}}>Notice</Typography></Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
        <Typography variant="h6" >{isEditing ? "Edit Notice" : "Create New Notice"}</Typography>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />
        <Select
          name="audience"
          value={formData.audience}
          onChange={handleChange}
          displayEmpty
          fullWidth
          required
          sx={{ my: 2 }}
        >
          <MenuItem value="" disabled>Select Audience</MenuItem>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </Select>

        <Button type="submit" variant="contained" color="primary">
          {isEditing ? "Save Changes" : "Add Notice"}
        </Button>
        {isEditing && (
          <Button
            onClick={() => {
              setIsEditing(false);
              setFormData({ title: "", message: "", audience: "" });
              setEditNoticeId(null);
            }}
            color="secondary"
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
        )}
      </Box>

      <Box>
        <Typography sx={{textAlign:"center"}} variant="h3">Notice For <span style={{textTransform:"capitalize",color:"darkgreen"}}>{audience}</span></Typography>
        <Button variant="outlined" onClick={() => setAudience("student")}>Student Notices</Button>
        <Button variant="outlined" onClick={() => setAudience("teacher")} sx={{ ml: 2 }}> Teacher Notices</Button>
        <Button variant="outlined" onClick={() => setAudience("all")} sx={{ ml: 2 }}> All Notices</Button>
     
        <Box sx={{ mt: 2 }}>
          {notices.map((notice) => (
            <Paper key={notice._id} sx={{ p: 2, m: 2, display: "inline-block"}}>
              <Box>
                <Typography variant="h5">{notice.title}</Typography>
                <Typography variant="p">{notice.message}</Typography>
                <Typography variant="body2" sx={{ mt: 1, display: "block" }}>
                  Audience: {notice.audience} <br/>
                  Posted On: {new Date(notice.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleEdit(notice)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(notice._id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default NoticeSchool;
