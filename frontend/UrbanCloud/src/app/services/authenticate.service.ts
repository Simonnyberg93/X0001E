import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { UserDTO } from '../models/UserDTO';
import { UserProfile } from '../models/UserProfile';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  private userSubject: BehaviorSubject<UserProfile>;
  public user: Observable<UserProfile>;

  constructor(private httpcli: HttpClient, private routeService: RouteService) {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      this.userSubject = new BehaviorSubject<UserProfile>(
        JSON.parse(currentUser)
      );
      this.user = this.userSubject.asObservable();
    } else {
      this.userSubject = new BehaviorSubject<UserProfile>(new UserProfile());
      this.user = this.userSubject.asObservable();
    }
  }

  registerUser(user: UserDTO): Observable<any> {
    return this.httpcli.post<UserDTO>(
      `${environment.backendUserApiUrl}/register`,
      user
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.httpcli
      .post<UserProfile>(`${environment.backendUserApiUrl}/login`, {
        email: username,
        password: password,
      })
      .pipe(
        map(({ token }) => {
          let user: UserProfile = {
            email: username,
            token: token,
          };
          // console.log('hello world' + user.email + ' ' + user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          sessionStorage.setItem('loggedin', 'true');
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.setItem('loggedin', 'false');
    sessionStorage.removeItem('token');
    this.userSubject.next(new UserProfile());
    this.routeService.openLogin();
  }

  // unused for now
  public getUserFromDatabase(email: string): Observable<Object> {
    return this.httpcli.get(
      `${environment.backendUserApiUrl}/getuser/${email}`
    );
  }

  public get userValue(): UserProfile {
    return this.userSubject.value;
  }
}
