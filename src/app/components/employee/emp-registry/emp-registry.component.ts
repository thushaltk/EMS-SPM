import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'services/employees.service';

@Component({
  selector: 'app-emp-registry',
  templateUrl: './emp-registry.component.html',
  styleUrls: ['./emp-registry.component.css']
})
export class EmpRegistryComponent implements OnInit {
  employees: Employees[] = [];
  private subscription!: Subscription;
  designation!: string;
  title!: string;
  term!: string;
  search!: string;
  isLoading = false;
  displayedColumns: string[] = ['EMPID', 'Full Name', 'NIC', 'DOB', 'Gender', 'Address', 'Contact No.', 'Email', 'DOJ' , 'Medical', 'Action'];

  constructor(private router: Router, private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.route.params.subscribe((params: Params) => {
      //We take designation from the URL and assign it to a variable
      this.designation = params['designation'];
      if(this.designation == 'Manager'){
        this.title="Managers";
      }else if(this.designation == 'Engineer'){
        this.title="Engineers";
      }else if(this.designation == 'IToperator'){
        this.title="IT Operators";
      }else if(this.designation == 'Accountant'){
        this.title="Accountants";
      }else if(this.designation == 'Supervisor'){
        this.title="Supervisors";
      }else if(this.designation == 'Labor'){
        this.title="Labors";
      }else if(this.designation == 'Driver'){
        this.title="Drivers";
      }else if(this.designation == 'Cleaningstaff'){
        this.title="Cleaning Staff";
      }else if(this.designation == 'Securitystaff'){
        this.title="Security Staff";
      }
      this.employees = this.employeeService.getEmployeeByDesignation(this.designation);
      this.subscription = this.employeeService.employeesChanged.subscribe(
        (employees: Employees[]) => {
          this.employees = employees;
          console.log(this.employees);
          this.isLoading = false;
        }
      );
    });
  }

  onDelete(id: string){
    this.employeeService.deleteEmployee(id);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
