const express = require('express');
const router = express.Router();

const leaveController = require("../controllers/leave-controller");

router.post("/add-leave", leaveController.addNewLeave);
router.get("/getLeaves", leaveController.getLeaves);
router.get("/getLeaveByID/:id", leaveController.getLeaveByID);
router.put("/updateLeave/:id", leaveController.updateLeave);
router.delete("/deleteLeave/:id", leaveController.deleteLeave);

module.exports = router;
