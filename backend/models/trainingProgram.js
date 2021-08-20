const mongoose = require("mongoose");
const TrainingProgramSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  availability: { type: Array, required: true },
  venue: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("TrainingProgram", TrainingProgramSchema);
