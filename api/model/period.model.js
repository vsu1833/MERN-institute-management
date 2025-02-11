// models/Period.js
const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  school:{type:mongoose.Schema.ObjectId, ref:'School'},
  teacher: {   type: mongoose.Schema.Types.ObjectId,  ref: 'Teacher',   required: true, },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject',  },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true,},
  startTime: { type: Date, required: true,},
  endTime: { type: Date,  required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Period', periodSchema);
