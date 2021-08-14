const express = require('express');
const router = express.Router();

const leaveController = require("../controllers/leave-controller");

router.post("/AddNewLeave", leaveController.addNewLeave);
router.post("/getLeaves", leaveController.getLeaves);
router.post("/getLeaveByID/:id", leaveController.getLeaveByID);
router.post("/updateLeave/:id", leaveController.updateLeave);
router.post("/deleteLeave/:id", leaveController.deleteLeave);

