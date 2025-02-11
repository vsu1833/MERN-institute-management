/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Container, Button, Select, MenuItem, InputLabel, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../environment';

const periods = [
  { id: 1, label: 'Period 1 (10:00 AM - 11:00 AM)', startTime: '10:00', endTime: '11:00' },
  { id: 2, label: 'Period 2 (11:00 AM - 12:00 PM)', startTime: '11:00', endTime: '12:00' },
  { id: 3, label: 'Period 3 (12:00 PM - 1:00 PM)', startTime: '12:00', endTime: '13:00' },
  { id: 4, label: 'Lunch Break (1:00 PM - 2:00 PM)', startTime: '13:00', endTime: '14:00' }, // break
  { id: 5, label: 'Period 4 (2:00 PM - 3:00 PM)', startTime: '14:00', endTime: '15:00' },
  { id: 6, label: 'Period 5 (3:00 PM - 4:00 PM)', startTime: '15:00', endTime: '16:00' },
];

const AssignPeriod2 = ({classId,isEdit, periodId, close}) => {
  const [teachers, setTeachers] = useState([]);
//   const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teacher, setTeacher] = useState('');
  const [subject, setSubject] = useState('');
//   const [classId, setClassId] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [date, setDate] = useState(new Date());
  
  const [message, setMessage] = useState("");
  const [type,  setType] = useState("success")

  useEffect(() => {
    // Fetch teachers, classes, and subjects
    const fetchData = async () => {
      const teacherResponse = await axios.get(`${baseUrl}/teacher/fetch-with-query`, { params: {} });
      const classResponse = await axios.get(`${baseUrl}/class/fetch-all`);
      const subjectResponse = await axios.get(`${baseUrl}/subject/fetch-all`, { params: {} });
      setSubjects(subjectResponse.data.data);
      setTeachers(teacherResponse.data.data);
    //   setClasses(classResponse.data.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPeriod) {
      alert('Please select a period');
      return;
    }

    try {
      await axios.post(`${baseUrl}/period/create`, {
        teacher,
        subject,
        classId,
        startTime:date+" "+selectedPeriod.startTime,
        endTime:date+" "+ selectedPeriod.endTime,
      });
      alert('Period assigned successfully');
      setMessage("Perid assigned Successfully.");
      close()
    } catch (error) {
      console.error('Error assigning period:', error);
      setMessage("Error in Assigning.")
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await axios.put(`${baseUrl}/period/update/${periodId}`, {
        teacher,
        subject,
        classId,
        startTime:date+" "+selectedPeriod.startTime,
        endTime:date+" "+ selectedPeriod.endTime,
      });
      alert('Period updated successfully');
      setMessage('Period updated successfully');
      close()
    } catch (error) {
      console.error('Error updating period:', error);
      setMessage("Period update Error.")
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`${baseUrl}/period/delete/${periodId}`);
      alert('Period deleted successfully');
      setMessage("Period deleted successfully.")
      close()
    } catch (error) {
      console.error('Error deleting period:', error);
      setMessage("Error in period delete.")
    }
  };

  // Fetch the period details if editing
  const fetchPeriodsWithId = async (periodId) => {
    try {
      const response = await axios.get(`${baseUrl}/period/${periodId}`);
      const periodData = response.data.period;
      const startTime  = new Date(periodData.startTime).getHours();
    //   console.log(new Date(periodData.startTime),"periodic data")
      setTeacher(periodData.teacher._id);
      setSubject(periodData.subject._id);
      setSelectedPeriod(periods.find(p => p.startTime === `${startTime}:00`)); // match by startTime
      setDate(periodData.startTime.substring(0, 10)); // date part of startTime
    } catch (error) {
      console.error('Error fetching period details:', error);
    }
  };

  useEffect(() => {
    if (isEdit && periodId) {
      fetchPeriodsWithId(periodId);
    }

  }, [isEdit, periodId,message]);



  return (
    <Container>
      <h2>Assign Period to Teacher</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Teacher</InputLabel>
          <Select label={"Teacher"} value={teacher} onChange={(e) => setTeacher(e.target.value)} required>
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>{teacher.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Subject</InputLabel>
          <Select label={"Subject"} value={subject} onChange={(e) => setSubject(e.target.value)} required>
            {subjects.map((sbj) => (
              <MenuItem key={sbj._id} value={sbj._id}>{sbj.subject_name}</MenuItem>
            ))}
          </Select>
        </FormControl>


        {/* Select predefined periods */}
     
          <FormControl fullWidth margin="normal">
          <InputLabel>Select Period</InputLabel>
          <Select value={selectedPeriod?selectedPeriod.id:""}
          label="Select Period"
           onChange={(e) => setSelectedPeriod(periods.find(p => p.id === e.target.value))}
           disabled={isEdit?true:false}
            required>
            {periods.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {period.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
      

        <TextField
          label="Date"
          type="date"
          fullWidth
          // InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isEdit?true:false}
          required
        />

       
        {isEdit?<>
            <Button onClick={handleDeleteEvent} color="secondary">
            Delete
          </Button>
          <Button onClick={handleUpdateEvent} color="primary">
            Update
          </Button>
          </>:
           <Button type="submit" variant="contained" color="primary">
           Assign Period
         </Button>
         }
      </form>
    </Container>
  );
};

export default AssignPeriod2;
