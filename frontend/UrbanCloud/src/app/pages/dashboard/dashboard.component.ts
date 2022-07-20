import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { RouteService } from 'src/app/services/route.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isExpanded: boolean = false;
  currentRoute: string = '';

  constructor(
    private routeService: RouteService,
    private authService: AuthenticateService,
    private router: Router,
    private location: Location
  ) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentRoute = location.path().replace('/dashboard/', '');
      } else {
        this.currentRoute = '';
      }
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  routeToSearch() {
    this.routeService.openSearch();
  }

  routeToProfile() {
    this.routeService.openProfile();
  }

  routeToStart() {
    this.routeService.openStart();
  }

  routeToMapTool() {
    this.routeService.openMapTool();
  }

  routeToMyproject() {
    this.routeService.openMyProject();
  }

  routeToAddproject() {
    this.routeService.openAddProject();
  }

  routeToAbout() {
    this.routeService.openAbout();
  }
}
