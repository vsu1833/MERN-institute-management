/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import {
  FormControl,
  MenuItem,
  Paper,
  Container,
  Typography,
  Select,
} from '@mui/material';
import { baseUrl } from '../../../environment';

const localizer = momentLocalizer(moment);

const eventStyleGetter = (event) => {
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

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

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
  }, []);

  // Fetch periods for the selected class
  useEffect(() => {
    const fetchClassPeriods = async () => {
      if (!selectedClass) return;
      try {
        const response = await axios.get(`${baseUrl}/period/class/${selectedClass}`);
        const periods = response.data.periods;
        const eventsData = periods.map((period) => ({
          id: period._id,
          title: `${period.subject.subject_name} By ${period.teacher.name}`,
          start: new Date(period.startTime),
          end: new Date(period.endTime),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };

    fetchClassPeriods();
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <Container>
      <h2>Weekly Schedule</h2>

      <Paper sx={{ margin: '10px', padding: '10px' }}>
        <FormControl sx={{ minWidth: '220px', marginTop: '10px' }}>
          <Typography>Change Class</Typography>
          <Select value={selectedClass} onChange={handleClassChange}>
            {allClasses &&
              allClasses.map((value) => (
                <MenuItem key={value._id} value={value._id}>
                  {value.class_text}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Paper>

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
        max={new Date(1970, 1, 1, 17, 0, 0)}
        defaultDate={new Date()}
        showMultiDayTimes
        style={{ height: '100%', width: '100%' }}
        formats={{ timeGutterFormat: 'hh:mm A' }}
        eventPropGetter={eventStyleGetter}
      />
    </Container>
  );
};

export default Schedule;
