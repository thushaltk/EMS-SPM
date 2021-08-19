import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css']
})
export class EmpProfileComponent implements OnInit {
  opened: boolean = true;
  panelOpenState: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
