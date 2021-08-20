const express = require('express');
const router = express.Router();

//Importing controller file - employee
const employeeController = require('../controllers/employee-controller');

router.post('/add-employee', employeeController.addEmployee);

router.get('/', employeeController.getEmployees);

router.delete('/:id', employeeController.deleteEmployee);

router.put('/:id', employeeController.updateEmployee);

router.get('/:designation', employeeController.getEmployeeByDesignation);

module.exports = router;
