const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  nic: { type: String, required: true },
  empID: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  cnumber: { type: String, required: true },
  email: { type: String, required: true },
  empDes: { type: String, required: true },
  doj: { type: String, required: true },
  comment: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
