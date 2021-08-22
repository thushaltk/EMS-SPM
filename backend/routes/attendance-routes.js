const express = require('express');
//const { check } = require('express-validator');

const router = express.Router();

const attendanceController = require("../controllers/attendance-controller");

router.post("/addNewAttendance", attendanceController.addNewAttendance);
router.get("/getAttendances", attendanceController.getAttendances);
router.get("/getAttendanceByID/:id", attendanceController.getAttendanceByID);
router.put("/updateAttendance/:id", attendanceController.updateAttendance);
router.delete("/deleteAttendance/:id", attendanceController.deleteAttendance);

module.exports = router;
