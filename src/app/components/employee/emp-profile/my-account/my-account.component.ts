import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  empDetails: any = null;

  constructor() { }

  ngOnInit(): void {
    this.empDetails = JSON.parse(localStorage.getItem('empDetails'));
  }

}
