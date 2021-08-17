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
  constructor(private otherService: OtherService, private router: Router) {
  }
  ngOnInit(): void {}

  clickHere(){
    this.otherService.setClicked(true);
    this.router.navigate(['login/empLogin']);
  }

  OnToggle(){
    this.toggled = !this.toggled;
  }
}
