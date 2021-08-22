const HttpError = require("../models/http-error");
const TrainingProgram = require("../models/trainingProgram");

//add training programs
const addTrainingProgram = async (req, res, next) => {
  const createTrainingProgram = new TrainingProgram({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    availability: req.body.availability,
    venue: req.body.venue,
    email: req.body.email,
  });
  try {
    await createTrainingProgram.save(); //savea data to db.
    console.log("Data saved successfully in the DB....:)");
  } catch (err) {
    const error = new HttpError("Cannot add data to database :(....", 500);
    return next(error);
  }
  res.status(201).json({ trainingProgram: createTrainingProgram });
};

//get Training Programs
const getTrainingPrograms = async (req, res, next) => {
  let training;
  try {
    training = await TrainingProgram.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching Training programs failed, try again later",
      500
    );
    return next(error);
  }
  res.send({ trainingPrograms: training });
};

//Retrieve Training Program by ID
const getTrainingProgramByID = async (req, res, next) => {
  const trainingID = req.params.id;
  let training;
  try {
    training = await TrainingProgram.find({ _id: trainingID });
  } catch (err) {
    const error = new HttpError("Cannot fine the requested data..", 500);
    return next(error);
  }
  res.send({ message: "Data retreived successfully", data: training });
};

//Update training programs by ID
const updateTrainingProgram = async (req, res, next) => {
  const trainingID = req.params.id;
  const { trainID, title, date, description, availability, email } = req.body;
  let existingProgram;
  try {
    existingProgram = await TrainingProgram.findOne({ _id: trainingID });
  } catch (err) {
    const error = new HttpError("Error occured", 500);
    return next(error);
  }
  if (!existingProgram) {
    const error = new HttpError("Data not found", 401);
    return next(error);
  } else {
    existingProgram.trainID = trainID;
    existingProgram.title = title;
    existingProgram.date = date;
    existingProgram.description = description;
    existingProgram.availability = availability;
    existingProgram.email = email;
    try {
      await existingProgram.save();
    } catch (err) {
      const error = new HttpError("Failed to update data", 500);
      return next(error);
    }
    res.send({ message: "Updated successfully", data: existingProgram });
  }
};

//Delete training programs by ID
const deleteTrainingProgram = async (req, res, next) => {
  const trainID = req.params.id;
  try {
    await TrainingProgram.findOneAndRemove({ _id: trainID });
  } catch (err) {
    const error = new HttpError("Cannot find requested data...", 500);
    return next(error);
  }
  res.send({ message: "Training Program Deleted!" });
};

module.exports = {
  addTrainingProgram,
  getTrainingPrograms,
  getTrainingProgramByID,
  updateTrainingProgram,
  deleteTrainingProgram,
};
