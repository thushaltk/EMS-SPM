const mongoose = require('mongoose');
const longLeaveSchema = mongoose.Schema({
  empID: {type: String, required: true},
  time: {type: String, required: true},
  startDate: {type: String, required: true},
  endDate: {type: String, required: true},
  reason: {type: String, required: true},
  status: {type: String, required: true}
});

module.exports = mongoose.model('LongLeave', longLeaveSchema);
