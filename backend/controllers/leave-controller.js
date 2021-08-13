const express = require("express");
const router = express.Router();
const { validationResult } = require('express-validator'); //For Validation
const HttpError = require("../models/http-error");

const Leave = require('../models/leave');
const HttpError = require("../models/http-error");

//Add Leave
const addNewLeave = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid data, check inputs again", 422);
    }

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
}


//Retrieve  Leave


//Retrieve  Leave by empID


//Update  leave status



//Delete Announcemets


//Exports

exports.addNewLeave = addNewLeave;