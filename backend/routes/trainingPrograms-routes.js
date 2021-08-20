const express = require("express");
const router = express.Router();

const trainingProgramsController = require("../controllers/trainingProgram-controller");

router.post(
  "/AddNewTrainingProgram",
  trainingProgramsController.addTrainingProgram
);
router.post(
  "/getTrainingPrograms",
  trainingProgramsController.getTrainingPrograms
);
router.post(
  "/getTrainingProgramByID/:id",
  trainingProgramsController.getTrainingProgramByID
);
router.post(
  "/updateTrainingProgram/:id",
  trainingProgramsController.updateTrainingProgram
);
router.post(
  "/deleteTrainingProgram/:id",
  trainingProgramsController.deleteTrainingProgram
);

module.exports = router;
