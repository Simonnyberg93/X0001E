import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private routerService: RouteService,
    private authService: AuthenticateService
  ) {
    if (sessionStorage.getItem('loggedin') === 'true') {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {}

  navigateTo(navigateTo: string): void {
    if (navigateTo === 'login') {
      this.routerService.openLogin();
    } else if (navigateTo === 'home') {
      if (this.isLoggedIn === false) {
        this.routerService.openHome();
      } else {
        this.routerService.openDashboard();
      }
    } else if (navigateTo === 'logout') {
      this.authService.logout();
      this.isLoggedIn = false;
    } else {
      this.routerService.openRegister();
    }
  }
}
