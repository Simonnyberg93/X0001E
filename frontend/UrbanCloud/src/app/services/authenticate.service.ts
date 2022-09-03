import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { UserDTO } from '../models/UserDTO';
import { UserProfile } from '../models/UserProfile';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  backendUrl: string = environment.backendUserApiUrl;

  constructor(
    private httpcli: HttpClient,
    private routeService: RouteService
  ) {}

  registerUser(user: UserDTO): Observable<any> {
    return this.httpcli.post<UserDTO>(`${this.backendUrl}/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.httpcli
      .post<UserProfile>(`${this.backendUrl}/login`, {
        email: username,
        password: password,
      })
      .pipe(
        map(({ token }) => {
          let user: UserProfile = {
            email: username,
            token: token,
          };
          localStorage.setItem('token', user.token);
          localStorage.setItem('email', user.email);
          return user;
        })
      );
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.routeService.openLogin();
  }

  haveAdminAccess() {
    var token = localStorage.getItem('token') || '';
    if (token === undefined || token === '') {
      return false;
    }
    var _extractedtoken = token.split('.')[1];
    var _atobdata = atob(_extractedtoken);
    var _finaldata = JSON.parse(_atobdata);
    if (_finaldata.role === 'ADMIN') {
      return true;
    }
    return false;
  }

  getUserInfo(): UserProfile {
    let result: UserProfile = new UserProfile();
    result.email = localStorage.getItem('email') || '';
    result.token = localStorage.getItem('token') || '';
    return result;
  }

  // unused for now
  public getUserFromDatabase(email: string): Observable<UserDTO> {
    return this.httpcli.get<UserDTO>(`${this.backendUrl}/getuser/${email}`);
  }
}
