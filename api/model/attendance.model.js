const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  school:{type:mongoose.Schema.ObjectId, ref:'School'},
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  class:{type:mongoose.Schema.Types.ObjectId, ref:"Class"},
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], default: 'Absent' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
