const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const attendanceController = require("../controllers/attendance-controller");

router.post("/", [
    check('fullName').not().isEmpty(),
    check('nic').not().isEmpty(),
    check('empID').not().isEmpty(),
    check('date').not().isEmpty(),
    check('designation').not().isEmpty(),
    check('arriveTime').not().isEmpty(),
    check('leaveTime').not().isEmpty()
], attendanceController.addNewAttendance);

