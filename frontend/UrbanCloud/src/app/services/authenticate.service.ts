import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserProfile } from '../models/UserProfile';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private httpcli: HttpClient, private router: RouteService) {}

  private updateMenu = new Subject<void>();

  get updatemenu() {
    return this.updateMenu;
  }

  generateTokenFromServer(Userobj: UserProfile): Observable<any> {
    console.log('i gen token from serv: ' + Userobj);
    return this.httpcli.post<UserProfile>(
      'http://localhost:8992/user/login',
      Userobj
    );
  }

  createUser(Userobj: UserProfile): Observable<any> {
    return this.httpcli.post<UserProfile>(
      'http://localhost:8992/user/register',
      Userobj
    );
  }

  // getByEmail(email: String): Observable<any> {
  //return this.httpcli.get(`http://localhost:8992/user/getUserByEmail/${email}`)
  // }

  setBearerToken(token: any) {
    sessionStorage.setItem('token', token);
    console.log('loggin out');
  }

  //might not be needed
  getBearerToken() {
    return sessionStorage.getItem('token');
  }

  isAuthenticated() {
    return this.httpcli.post(
      'http://localhost:8992/user/login',
      {},
      {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.getBearerToken()}`
        ), //true
      }
    );
  }

  /*logout() {
    sessionStorage.clear();
    
    window.location.reload();
  this.router.openHome();
  }*/
}