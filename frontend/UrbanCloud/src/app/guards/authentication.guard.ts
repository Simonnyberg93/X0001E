import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';
import { RouteService } from '../services/route.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private routeService: RouteService,
    private authservice: AuthenticateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const loginstatus = sessionStorage.getItem('loggedin');
    if (loginstatus === 'true') {
      return true;
    } else {
      console.log('you need to login');
      this.routeService.openLogin();
      return false;
    }
  }

  //   if (flag != "true") {
  //     this.organicroute.openLogin();
  //     return false;
  //   }
  //   return true;
  // }
}
