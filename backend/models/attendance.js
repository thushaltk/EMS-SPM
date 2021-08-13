const mongoose = require("mongoose");
const attendanceSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  nic: { type: String, required: true },
  empID: { type: String, required: true },
  date: { type: String, required: true },
  designation: { type: String, required: true },
  arriveTime: { type: Date, required: true },
  leaveTime: { type: Date, required: true },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
