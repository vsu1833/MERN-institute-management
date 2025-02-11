/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { baseUrl } from '../../../environment';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Container,
  Typography,
} from '@mui/material';
import AssignPeriod2 from '../../../school/components/assign period/AssignPeriod2';

const localizer = momentLocalizer(moment);
const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: event.bgColor || '#3174ad',
    color: 'white',
    borderRadius: '4px',
    padding: '5px',
    border: 'none',
  };
  return {
    style,
  };
};


const periods = [
  { id: 1, label: 'Period 1 (10:00 AM - 11:00 AM)', startTime: '10:00', endTime: '11:00' },
  { id: 2, label: 'Period 2 (11:00 AM - 12:00 PM)', startTime: '11:00', endTime: '12:00' },
  { id: 3, label: 'Period 3 (12:00 PM - 1:00 PM)', startTime: '12:00', endTime: '13:00' },
  { id: 4, label: 'Lunch Break (1:00 PM - 2:00 PM)', startTime: '13:00', endTime: '14:00' }, // break
  { id: 5, label: 'Period 4 (2:00 PM - 3:00 PM)', startTime: '14:00', endTime: '15:00' },
  { id: 6, label: 'Period 5 (3:00 PM - 4:00 PM)', startTime: '15:00', endTime: '16:00' },
];

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Fetch all classes
  const fetchAllClasses = () => {
    axios
      .get(`${baseUrl}/class/fetch-all`)
      .then((resp) => {
        setAllClasses(resp.data.data);
        setSelectedClass(resp.data.data[0]._id);
      })
      .catch((e) => {
        console.error('Error in fetching all Classes');
      });
  };

  

  useEffect(() => {
    fetchAllClasses();
    // fetchAllTeachers();
  }, []);

  // Fetch periods for the selected class
  useEffect(() => {
    const fetchClassPeriods = async () => {
      if (!selectedClass) return;
      try {
        const response = await axios.get(`${baseUrl}/period/class/${selectedClass}`);
        const periods = response.data.periods;
        console.log(periods)
        const eventsData = periods.map((period) => ({
          id: period._id,
          title:`${period.subject?period.subject.subject_name:""}, By ${period.teacher?period.teacher.name:""}`,
          start: new Date(period.startTime),
          end: new Date(period.endTime)
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };

    fetchClassPeriods();
  }, [selectedClass,openDialog,openAddDialog]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleOpenAddDialog = () => {
    
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };


  return (
    <Container>
       <Typography className="hero-text" variant="h2" sx={{textAlign:"center"}}>Weekly Schedule</Typography>

      <Paper sx={{ margin: '10px', padding: '10px' }}>
        <FormControl sx={{ minWidth: '220px', marginTop: '10px' }}>
          <Typography >Change Class</Typography>
          <Select  value={selectedClass} onChange={handleClassChange} onBlur={handleClassChange}>
            {allClasses &&
              allClasses.map((value) => (
                <MenuItem key={value._id} value={value._id}>
                  {value.class_text}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Paper>

      <Button variant="contained" color="primary" onClick={handleOpenAddDialog} style={{ marginBottom: '10px' }}>
        Add New Period
      </Button>

      <Calendar
        localizer={localizer}
        events={events}
        defaultView="week"
        views={['week']}
        step={30}
        timeslots={1}
        min={new Date(1970, 1, 1, 10, 0, 0)}
 startAccessor="start"
      endAccessor="end"
      onSelectEvent={handleSelectEvent}
        max={new Date(1970, 1, 1, 17, 0, 0)}
        defaultDate={new Date()}
        showMultiDayTimes
      
        style={{ height: '100%', width: '100%'}}
        formats={{ timeGutterFormat: 'hh:mm A' }}
      />

      {/* Modal for Editing Events */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Period</DialogTitle>
        <DialogContent>
          <AssignPeriod2 classId={selectedClass} isEdit={true} periodId={selectedEvent} close={handleCloseDialog} />
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Adding New Period */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Period</DialogTitle>
       <AssignPeriod2 classId={selectedClass} close={handleCloseAddDialog} />
        <DialogActions>
          
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};


export default Schedule;
