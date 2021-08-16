import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEmpNavigate() {
    this.router.navigate(['login/empLogin']);
  }

  onAdminNavigate() {
    this.router.navigate(['login/adminLogin']);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
