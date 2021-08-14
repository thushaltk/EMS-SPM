const Employee = require("../models/employee");
const HttpError = require("../models/http-error");


//Add Employees
const addEmployee = async (req, res, next) => {
  const createEmployee = new Employee({
    fullName: req.body.fullName,
    dob: req.body.dob,
    nic: req.body.nic,
    empID: req.body.empID,
    gender: req.body.gender,
    address: req.body.address,
    cnumber: req.body.cnumber,
    email: req.body.email,
    empDes: req.body.empDes,
    doj: req.body.doj,
    comment: req.body.comment,
  });

  try {
    await createEmployee.save();
    console.log("Employee added successfully in the DB....:)");
  } catch (err) {
    const error = new HttpError("Cannot add data to database :(....", 500);
    return next(error);
  }
};


//Reteive Employees
const getEmployees = async (req, res, next) => {
  let employees;
  try {
    employees = await employees.find();
  } catch (err) {
    throw new HttpError("Fetching employees failed, try again later", 500);
  }
  res.send(employees);
};

//Reteive Employees by ID
const getEmployeeByID = async (req, res, next) => {
  const empID = req.params.id;
  let employees;
  try {
    employees = await Employee.find({ _id: annID });
  } catch (err) {
    const error = new HttpError("Cannot finr the requested data..", 500);
    return error;
  }
  res.send({ message: "Data retreived successfully", data: employee });
};


//Update Employees
const updateEmployee = async (req, res, next) => {
  const empID = req.params.id;
  const {fullName, dob, nic, empID, gender, address, cnumber, email, empDes, doj, comment} = req.body;
  const existingEmployee;
  try{
      existingEmployee = await Employee.findOne({_id: annID});
  }catch(err){
      const error = new HttpError("Error occured", 500);
      return error;
  }
  if(!Employee){
      const error =  new HttpError("Data not found", 401);
      return error;
  }else{
      existingEmployee.fullName = fullName;
      existingEmployee.dob = dob;
      existingEmployee.nic = nic;
      existingEmployee.empID = empID;
      existingEmployee.gender = gender;
      existingEmployee.address = address;
      existingEmployee.cnumber = cnumber;
      existingEmployee.email = email;
      existingEmployee.empDes = empDes;
      existingEmployee.doj = doj;
      existingEmployee.comment = comment;

      try{
          await existingEmployee.save();
      }catch(err){
          const error = new HttpError('Failed to update data', 500);
          return error;
      }
      res.send({message: 'Updated successfully', data: existingEmployee});
  }
}


//Reteive Employees by designation
const getEmployeeByDesignation = async (req, res, next) => {
  const {empDesignation} = req.body;
  try{
    await Employee.find({designation: empDesignation});
  }catch(err){
    const error = new HttpError("Cannot find requested data...", 500);
    return error;
  }
};


//Delete Employees
const deleteEmployee = async (req, res, next) => {
  const empID = req.params.id;
  try {
    await Employee.findOneAndRemove({ _id: empID });
  } catch (err) {
    const error = new HttpError("Cannot find requested data...", 500);
    return error;
  }
  res.send({ message: "Employee Deleted!" });
};

//Update password
const updatePassword = async (req, res, next) => {
  const {email, password} = req.body;
  let employee;
  try{
    employee = await Employee.findOne({email: email});
  }catch(err){
    return err;
  }
  if(!employee){
    return new HttpError('User does not exist', 401);
  }else{
    employee.password = password;
    try{
      await employee.save();
    }
    catch(err){
      return err;
    }
  }
  res.send({message: 'Password update successfully', data: employee});
}

module.exports = {
  getEmployeeByDesignation,
  addEmployee,
  getEmployees,
  getEmployeeByID,
  deleteEmployee,
  updateEmployee,
  updatePassword
};
