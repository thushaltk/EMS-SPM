const Attendance = require("../models/attendance");
const HttpError = require("../models/http-error");


//Add attendance
const addNewAttendance = async (req, res, next) => {
    const  createattendance = new Attendance({
      fullName: req.body.fullName,
      nic: req.body.nic,
      empID: req.body.empID,
      date: req.body.date,
      designation: req.body.designation,
      arriveTime: req.body.arriveTime,
      leaveTime: req.body.leaveTime,
    })
    try {
        await createattendance.save(); //savea data to db.
        console.log("Data saved successfully in the DB....:)");
    } catch (err) {
        const error = new HttpError("Cannot add data to database :(....", 500);
        return next(error);
    }
    res.status(201).json({ attendance:  createattendance });
};



//Reteive Attendance
const getAttendances = async (req, res, next) => {
    let attendances;
    try {
        attendances = await Attendance.find();
    } catch (err) {
      const error =  HttpError("Fetching attendances failed, try again later", 500);
      return next(error);
    }
    res.send({ attendances:  attendances });
  };



//Get Attendance by ID
const getAttendanceByID = async (req, res, next) => {
    const attID = req.params.id;
    let attendance;
    try {
        attendance = await Attendance.find({ _id: attID });
      } catch (err) {
        const error = new HttpError("Cannot fine the requested data..", 500);
        return error;
      }
      res.send({ message: "Data retreived successfully", data: attendance });
  };


//Update Attendance
const updateAttendance = async (req, res, next) => {
    const attID = req.params.id;

    let existingAttendance;
    try{
        existingAttendance = await Attendance.findOne({_id: attID});
    }catch(err){
        const error = new HttpError("Error occured", 500);
        return error;
    }
    if(!existingAttendance){
        const error =  new HttpError("Data not found", 401);
        return error;
    }else{
        existingAttendance.fullName = req.body.fullName;
        existingAttendance.nic = req.body.nic;
        existingAttendance.empID = req.body.empID;
        existingAttendance.date = req.body.date;
        existingAttendance.designation = req.body.designation;
        existingAttendance.arriveTime = req.body.arriveTime;
        existingAttendance.leaveTime = req.body.leaveTime;
        try{
            await existingAttendance.save();
        }catch(err){
            const error = new HttpError('Failed to update data', 500);
            return error;
        }
        res.send({message: 'Updated successfully', data: existingAttendance});
    }
};


//Delete Attendance
const deleteAttendance = async (req, res, next) => {
    const attID = req.params.id;
    try {
      await Attendance.findOneAndRemove({ _id: attID });
    } catch (err) {
      const error = new HttpError("Cannot find requested data...", 500);
      return error;
    }
    res.send({ message: "Attendance Deleted!" });
  };


//Exports
module.exports = {
    addNewAttendance,
    getAttendances,
    getAttendanceByID,
    updateAttendance,
    deleteAttendance
  };
