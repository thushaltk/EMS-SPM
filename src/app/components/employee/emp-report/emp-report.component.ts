import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'services/employees.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-emp-report',
  templateUrl: './emp-report.component.html',
  styleUrls: ['./emp-report.component.css']
})
export class EmpReportComponent implements OnInit, OnDestroy {
  designation: string;
  title: string;
  newdob: string;
  newdoj: string;
  employees: Employees[] = [];
  subscription: Subscription;

  constructor(private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("designation")) {
        this.designation = paramMap.get("designation");
        if (this.designation == 'Manager') {
          this.title = "Managers";
        } else if (this.designation == 'Engineer') {
          this.title = "Engineers";
        } else if (this.designation == 'IToperator') {
          this.title = "IT Operators";
        } else if (this.designation == 'Accountant') {
          this.title = "Accountants";
        } else if (this.designation == 'Supervisor') {
          this.title = "Supervisors";
        } else if (this.designation == 'Labor') {
          this.title = "Labors";
        } else if (this.designation == 'Driver') {
          this.title = "Drivers";
        } else if (this.designation == 'Cleaningstaff') {
          this.title = "Cleaning Staff";
        } else if (this.designation == 'Securitystaff') {
          this.title = "Security Staff";
        }
        this.employees = this.employeeService.getEmployeeByDesignation(this.designation);
        this.subscription = this.employeeService.employeesChanged.subscribe(
          (employees: Employees[]) => {
            this.employees = employees; //1997-05-10 //[1997,05,10]   //1997/05/10
            for(let emp of employees){
              this.newdob = emp.dob.split("-")[0] + "/" + emp.dob.split("-")[1] + "/" + emp.dob.split("-")[2];
              emp.dob = this.newdob;
              this.newdoj = emp.doj.split("-")[0] + "/" + emp.doj.split("-")[1] + "/" + emp.doj.split("-")[2];
              emp.doj = this.newdoj;

            }
          }
        );
      }else{
        this.title = "All Employees";
        this.employees = this.employeeService.getEmployee();
        this.subscription = this.employeeService.employeesChanged.subscribe(
          (employees: Employees[]) => {
            this.employees = employees;
            for(let emp of employees){
              this.newdob = emp.dob.split("-")[0] + "/" + emp.dob.split("-")[1] + "/" + emp.dob.split("-")[2];
              emp.dob = this.newdob;
              this.newdoj = emp.doj.split("-")[0] + "/" + emp.doj.split("-")[1] + "/" + emp.doj.split("-")[2];
              emp.doj = this.newdoj;

            }
          }
        );
      }
    });

  }

  //Generate PDF
  generateReport() {
    if(this.title != "All Employees"){
      var desig = this.title;
    }else{
      var desig = this.title;
    }
    setTimeout(() => {
      html2canvas(document.getElementById("tbl")).then(function (canvas) {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF.jsPDF();
        let image = new Image();
        image.src = 'assets/images/logo.jpg';
        var imgHeight = canvas.height * 210 / canvas.width;
        var text = desig + " Report";
        doc.text(text, 55, 15);
        doc.addImage(image, 10, 5, 40, 20);
        doc.addImage(img, 0, 30, 210, imgHeight);
        doc.save(`${desig}Report.pdf`);
      });
    }, 1500)
  }

}
