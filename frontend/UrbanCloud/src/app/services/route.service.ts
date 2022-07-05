import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private router: Router, private location: Location) {}

  openLogin() {
    this.router.navigate(['login']);
  }

  openRegister() {
    this.router.navigate(['register']);
  }

  openDashboard() {
    // check if user is logged in
    //if logged in navigate to dashboard otherwise frontpage
    this.router.navigate(['frontpage']);
  }
}
