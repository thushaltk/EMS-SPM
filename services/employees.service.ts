import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employees } from '../models/employees.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class EmployeeService{
  employeesChanged = new Subject<Employees[]>();
  private employeesArr: Employees[] = [];

  constructor(private http: HttpClient){}


  //Get All Employees
  getEmployee(){
    this.http.get<{message: string, employees: any}>('http://localhost:5000/api/employees')
      .pipe(map((employeeData) => {
          return employeeData.employees.map((employee: { fullName: any; dob: any; nic: any; empID: any; gender: any; address: any; cnumber: any; email: any; designation: any; doj: any; reason: any; _id: any; }) => {
            return{
              fullName: employee.fullName,
              dob: employee.dob,
              nic: employee.nic,
              empID: employee.empID,
              gender: employee.gender,
              address: employee.address,
              cnumber: employee.cnumber,
              email: employee.email,
              designation: employee.designation,
              doj: employee.doj,
              reason: employee.reason,
              id: employee._id
            };
          });
      }))
      .subscribe((transformedEmployees) => {
        this.employeesArr = transformedEmployees;
        this.employeesChanged.next(this.employeesArr.slice());
      });
    return this.employeesArr.slice();
  }

  //Get Employee By Designation
  getEmployeeByDesignation(employeeDesignation: string){
    this.http.get<{message: string, employees: any}>('http://localhost:5000/api/employees/' + employeeDesignation)
      .pipe(map((employeeData) => {
          return employeeData.employees.map((employee: { fullName: any; dob: any; nic: any; empID: any; gender: any; address: any; cnumber: any; email: any; designation: any; doj: any; reason: any; _id: any; }) => {
            return{
              fullName: employee.fullName,
              dob: employee.dob,
              nic: employee.nic,
              empID: employee.empID,
              gender: employee.gender,
              address: employee.address,
              cnumber: employee.cnumber,
              email: employee.email,
              designation: employee.designation,
              doj: employee.doj,
              reason: employee.reason,
              id: employee._id
            };
          });
      }))
      .subscribe((transformedEmployees) => {
        this.employeesArr = transformedEmployees;
        this.employeesChanged.next(this.employeesArr.slice());
      });
    return this.employeesArr.slice();
  }


  //Add Employee details to the database
  addEmployee(employee: Employees){
    const employeeArray: Employees = {
      id: employee.id,
      fullName: employee.fullName,
      dob: employee.dob,
      nic: employee.nic,
      empID: employee.empID,
      gender: employee.gender,
      address: employee.address,
      cnumber: employee.cnumber,
      email: employee.email,
      designation: employee.designation,
      doj: employee.doj,
      reason: employee.reason
    };
    this.http.post<{message: string}>('http://localhost:5000/api/employees/add-employee', employeeArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.employeesArr.push(employeeArray);
        this.employeesChanged.next(this.employeesArr.slice());
      });

  }

  //Update Employee Details
  updateEmployees(employee: Employees) {
    console.log('employee=', employee);
    const employeeArray: Employees = {
      id: employee.id,
      fullName: employee.fullName,
      dob: employee.dob,
      nic: employee.nic,
      empID: employee.empID,
      gender: employee.gender,
      address: employee.address,
      cnumber: employee.cnumber,
      email: employee.email,
      designation: employee.designation,
      doj: employee.doj,
      reason: employee.reason
    };
    this.http.put("http://localhost:5000/api/employees/" + employee.id, employeeArray)
      .subscribe(response => {
        const updatedEmployees = [...this.employeesArr];
        const oldEmpIndex = updatedEmployees.findIndex(emp => emp.id === employeeArray.id);
        updatedEmployees[oldEmpIndex] = employeeArray;
        this.employeesArr = updatedEmployees;
        this.employeesChanged.next([...this.employeesArr]);
      });
  }

  deleteEmployee(employeeID: string){
    this.http.delete("http://localhost:5000/api/employees/" + employeeID)
      .subscribe(() => {
        const updatedEmployee = this.employeesArr.filter(employees => employees.id !== employeeID);
        this.employeesArr = updatedEmployee;
        this.employeesChanged.next(this.employeesArr.slice());
      })
  }
}
