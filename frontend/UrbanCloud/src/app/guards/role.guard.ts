import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private route: Router
  ) {}

  canActivate() {
    if (this.authService.haveAdminAccess()) {
      return true;
    }
    this.route.navigate(['']);
    alert('Authorization denied, requires admin privileges');
    return false;
  }
}
