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
const getLeaves = async (req, res, next) => {
    let leaves;
    try {
        leaves = await Leave.find();
    } catch (err) {
      throw new HttpError("Fetching leave failed, try again later", 500);
    }
    res.send({ message: "Data retreived successfully", data: leaves });
};


//Retrieve  Leave by empID
const getLeaveByID = async (req, res, next) => {
    const empID = req.params.id;
    let leave;
    try {
      console.log(empID)
        leave = await Leave.find({ empID: empID });
      } catch (err) {
        const error = new HttpError("Cannot fine the requested data..", 500);
        return error;
      }
      res.send({ message: "Data retreived successfully", data: leave });
};


//Update  leave status

const updateLeave = async (req, res, next) => {
    const leavID = req.params.id;
    const {empID, time, startDate,endDate, reason, status} = req.body;
    let existingLeave;
    try{
        existingLeave = await Leave.findOne({_id: leavID});
    }catch(err){
        const error = new HttpError("Error occured", 500);
        return error;
    }
    if(!existingLeave){
        const error =  new HttpError("Data not found", 401);
        return error;
    }else{
        existingLeave.empID = empID;
        existingLeave.time = time;
        existingLeave.startDate = startDate;
        existingLeave.endDate = endDate;
        existingLeave.reason = reason;
        existingLeave.status = status;
        try{
            await existingLeave.save();
        }catch(err){
            const error = new HttpError('Failed to update data', 500);
            return error;
        }
        res.send({message: 'Updated successfully', data: existingLeave});
    }
};


//Delete Announcemets
const deleteLeave = async (req, res, next) => {
    const leavID = req.params.id;
    try {
      await Leave.findOneAndRemove({ _id: leavID });
    } catch (err) {
      const error = new HttpError("Cannot find requested data...", 500);
      return error;
    }
    res.send({ message: "Leave Deleted!" });
  };


//Exports
module.exports = {
    addNewLeave,
    getLeaves,
    getLeaveByID,
    updateLeave,
    deleteLeave
  };
