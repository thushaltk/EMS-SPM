const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const attendanceController = require("../controllers/attendance-controller");

router.post("/addNewAttendance", attendanceController.addNewAttendance);

