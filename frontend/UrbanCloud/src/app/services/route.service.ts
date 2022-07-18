import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private router: Router, private location: Location) {}

  openHome() {
    this.router.navigate(['frontpage']);
  }

  openLogin() {
    this.router.navigate(['login']);
  }

  openRegister() {
    this.router.navigate(['register']);
  }

  openDashboard() {
    this.router.navigate(['dashboard']);
  }

  openTopics() {
    this.router.navigate(['topics']);
  }

  openSearch() {
    this.router.navigate(['dashboard/search']);
  }

  openStart() {
    this.router.navigate(['dashboard/start']);
  }

  openProfile() {
    this.router.navigate(['dashboard/profile']);
  }

  openMapTool() {
    this.router.navigate(['dashboard/maptool']);
  }

  openMyProject() {
    this.router.navigate(['dashboard/myprojekt']);
  }

  openAddProject() {
    this.router.navigate(['dashboard/addprojekt']);
  }

  openAbout() {
    this.router.navigate(['dashboard/about']);
  }

  openAdminStart() {
    this.router.navigate(['adminstart']);
  }
}
