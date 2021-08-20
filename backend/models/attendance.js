const mongoose = require("mongoose");
const attendanceSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  nic: { type: String, required: true },
  empID: { type: String, required: true },
  date: { type: String, required: true },
  designation: { type: String, required: true },
  arriveTime: { type: String, required: true },
  leaveTime: { type: String, required: true },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
