const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const leaveController = require("../controllers/leave-controller");

router.post("/", [
    check('empID').not().isEmpty(),
    check('time').not().isEmpty(),
    check('startDate').not().isEmpty(),
    check('endDate').not().isEmpty(),
    check('reason').not().isEmpty(),
    check('status').not().isEmpty()
], leaveController.addNewLeave);

