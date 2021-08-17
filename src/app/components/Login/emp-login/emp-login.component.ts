import { OtherService } from '../../../../../services/other.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.css']
})
export class EmpLoginComponent implements OnInit {
  clicked: boolean = false;

  constructor(private otherService: OtherService) { }

  ngOnInit(): void {
    setTimeout(()=> {
      this.clicked = this.otherService.clicked;
      console.log(this.clicked);

    }, 3000)
  }


}