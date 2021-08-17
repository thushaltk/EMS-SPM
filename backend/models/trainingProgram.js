const mongoose = require("mongoose");
const TrainingProgramSchema = mongoose.Schema({
  trainID: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  availability: { type: Array, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("TrainingProgram", TrainingProgramSchema);
