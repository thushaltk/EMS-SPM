const express = require('express');
const router = express.Router();

//Importing controller file - employee
const employeeController = require('../controllers/employee-controller');

router.post('/add-employee', employeeController.addEmployee);

router.get('/', employeeController.getEmployees);

router.get('/:id', employeeController.getEmployeeByID);

router.delete('/:id', employeeController.deleteEmployee);

router.put('/:id', employeeController.updateEmployee);

module.exports = router;
