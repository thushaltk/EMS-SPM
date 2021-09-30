import { Router } from '@angular/router';
import { Component, OnInit, DoCheck, ChangeDetectionStrategy} from '@angular/core';
import { OtherService } from 'services/other.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  clicked: boolean = false;
  toggled: boolean = false;
  loggedIn: boolean = false;
  constructor(private otherService: OtherService, private router: Router) {
  }
  ngOnInit(): void {
    if(localStorage.getItem('islogged')){

      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  }

  clickHere(){
    this.otherService.setClicked(true);
    this.router.navigate(['login/empLogin']);
  }

  OnToggle(){
    this.toggled = !this.toggled;
  }


  onLogout(){
    localStorage.removeItem('empDetails');
    localStorage.removeItem('islogged');
    this.router.navigate(['login/empLogin'])
  }

  get log(){
    return this.loggedIn;
  }
}
