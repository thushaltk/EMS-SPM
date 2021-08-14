const Attendance = require("../models/attendance");
const HttpError = require("../models/http-error");


//Add attendance
const addNewAttendance = async (req, res, next) => {
    const at = new Date(req.body.date); //creating a date object for arrive time
    const lt = new Date(req.body.date); //creating a date object for leave time
  
    let arrive = req.body.arriveTime;
    let ar1 = arrive.split(":"); // spliting time into hours and minutes
  
    at.setHours(parseInt(ar1[0]) + 5, parseInt(ar1[1]) + 30, 0); // add time in to date object
  
    let leave = req.body.leaveTime;
    let ar2 = leave.split(":"); // spliting time into hours and minutes
  
    lt.setHours(parseInt(ar2[0]) + 5, parseInt(ar2[1]) + 30, 0); // add time in to date object
  
    const  createattendance = new Attendance({
      fullName: req.body.fullName,
      nic: req.body.nic,
      empID: req.body.empID,
      date: req.body.date,
      designation: req.body.designation,
      arriveTime: at,
      leaveTime: lt,
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



//Get Attendance by ID




//Update Attendance



//Delete Attendance


//Exports

module.exports = {
    addNewAttendance
  };
