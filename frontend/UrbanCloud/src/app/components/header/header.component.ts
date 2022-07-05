import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private routerService: RouteService) {}

  ngOnInit(): void {}

  navigateTo(navigateTo: string): void {
    if (navigateTo === 'login') {
      this.routerService.openLogin();
    } else if (navigateTo === 'home') {
      this.routerService.openDashboard();
    } else {
      this.routerService.openRegister();
    }
  }
}
