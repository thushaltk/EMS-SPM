const express = require('express');
const router = express.Router();

const leaveController = require("../controllers/leave-controller");

router.post("/AddNewLeave", leaveController.addNewLeave);

