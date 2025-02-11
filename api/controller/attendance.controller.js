
const Attendance = require('../model/attendance.model');
const moment = require('moment')
module.exports = {
    markAttendance: async (req, res) => {
        const { studentId, date, status, classId } = req.body;
        const schoolId = req.user.schoolId;
        try {
          const attendance = new Attendance({ student: studentId, date, status,class:classId, school:schoolId});
          await attendance.save();
          res.status(201).json(attendance);
        } catch (err) {
          res.status(500).json({ message: 'Error marking attendance', err });
        }
      },
      getAttendance: async (req, res) => {
        const { studentId } = req.params;
        
        try {
          const attendance = await Attendance.find({ student: studentId }).populate('student');
          res.status(200).json(attendance);
        } catch (err) {
            console.log(err)
          res.status(500).json({ message: 'Error fetching attendance', err });
        }
      }
    ,
    // Check if attendance is already taken for today
   checkAttendance:  async (req, res) => {
    try {
      const today = moment().startOf('day'); // Get the start of today (00:00:00)
      
      // Query the database for any attendance record for today
      const attendanceForToday = await Attendance.findOne({
        class:req.params.classId,
        date: {
          $gte: today.toDate(), // Check if attendance date is greater than or equal to today's date
          $lt: moment(today).endOf('day').toDate(), // Less than the end of today
        },
      });
  
      if (attendanceForToday) {
        return res.status(200).json({attendanceTaken:true, message: 'Attendance already taken for today' });
      } else {
        return res.status(200).json({ message: 'No attendance taken yet for today' });
      }
    } catch (error) {
      console.error('Error checking attendance:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
}
      
}
