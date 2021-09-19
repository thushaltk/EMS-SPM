const Employee = require("../models/employee");
const HttpError = require("../models/http-error");


//Add Employees
const addEmployee = async (req, res, next) => {
  const createEmployee = new Employee({
    imgUrl: req.body.imgUrl,
    fullName: req.body.fullName,
    dob: req.body.dob,
    nic: req.body.nic,
    empID: req.body.empID,
    gender: req.body.gender,
    address: req.body.address,
    cnumber: req.body.cnumber,
    email: req.body.email,
    empDes: req.body.designation,
    doj: req.body.doj,
    reason: req.body.reason,
    password: ''
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
  console.log('helooooo1')
  let employees;
  try {
    employees = await Employee.find();
  } catch (err) {
    throw new HttpError("Fetching employees failed, try again later", 500);
  }
  res.send({employees: employees});
};

//Reteive Employees by ID
const getEmployeeByID = async (req, res, next) => {
  const empID = req.params.id;
  let employee;
  try {
    employee = await Employee.find({ _id: empID });
  } catch (err) {
    const error = new HttpError("Cannot find the requested data..", 500);
    return error;
  }
  res.send({ data: employee });
};


//Update Employees
const updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const {fullName, dob, nic, gender, address, cnumber, email, designation, doj, empID, reason} = req.body;
  let existingEmployee;
  try{
      existingEmployee = await Employee.findOne({_id: id});
  }catch(err){
      const error = new HttpError("Error occured", 500);
      return error;
  }
  if(!existingEmployee){
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
      existingEmployee.empDes = designation;
      existingEmployee.doj = doj;
      existingEmployee.reason = reason;

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
  Employee.find({ empDes: req.params.designation }).then((documents) => {
    res.status(200).json({
      message: "Employees fetched successfully by designation",
      employees: documents,
    });
  });
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
  const {nic, pwd, confpwd} = req.body;
  let employee;
  try{
    employee = await Employee.findOne({nic: nic});
  }catch(err){
    return err;
  }

  if(!employee){
    console.log('No user');
    res.send({message: 'No user found'});
    return new HttpError('No user found', 401);
  }else{
    employee.password = pwd;
    try{
      await employee.save();
    }
    catch(err){
      return err;
    }
  }
  res.send({message: 'Password update successfully', data: employee});
}

const checkPassword = async (req, res, next) => {
  const {nic, pwd} = req.body;
  let employee;
  try{
    employee = await Employee.findOne({nic: nic, password: pwd});
  }catch(err){
    return new HttpError("Failed to validate login", 401);
  }
  if(!employee){
    res.send({message: 'No user found'});
  }else{
    res.send({message: 'user found', data: employee});
  }
}

module.exports = {
  getEmployeeByDesignation,
  addEmployee,
  getEmployees,
  getEmployeeByID,
  deleteEmployee,
  updateEmployee,
  updatePassword,
  checkPassword
};
