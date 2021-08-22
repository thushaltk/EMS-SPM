const express = require("express");
const router = express.Router();

const trainingProgramsController = require("../controllers/trainingProgram-controller");

router.post(
  "/AddNewTrainingProgram",
  trainingProgramsController.addTrainingProgram
);
router.get(
  "/getTrainingPrograms",
  trainingProgramsController.getTrainingPrograms
);
router.get(
  "/getTrainingProgramByID/:id",
  trainingProgramsController.getTrainingProgramByID
);
router.put(
  "/updateTrainingProgram/:id",
  trainingProgramsController.updateTrainingProgram
);
router.delete(
  "/deleteTrainingProgram/:id",
  trainingProgramsController.deleteTrainingProgram
);

module.exports = router;
