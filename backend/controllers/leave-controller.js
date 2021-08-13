const Leave = require('../models/leave');
const HttpError = require("../models/http-error");

//Add Leave
const addNewLeave = async (req, res, next) => {
    const createLeave = new Leave({
      empID: req.body.empID,
      time: req.body.time,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
      status: req.body.status
    })
    try {
        await createLeave.save(); //savea data to db.
        console.log("Data saved successfully in the DB....:)");
    } catch (err) {
        const error = new HttpError("Cannot add data to database :(....", 500);
        return next(error);
    }

    res.status(201).json({ leave: createLeave });
};


//Retrieve  Leave


//Retrieve  Leave by empID


//Update  leave status



//Delete Announcemets


//Exports

module.exports = {
    addNewLeave
  };
