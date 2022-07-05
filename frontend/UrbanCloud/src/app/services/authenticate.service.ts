import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../environment/environment';
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

  login(username: string, password: string) {
    return this.httpcli
      .post<any>(`${environment.backendUserApiUrl}login`, {
        username,
        password,
      })
      .pipe(
        map(({ token }) => {
          let user: UserProfile = {
            email: username,
            token: token,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(new UserProfile());
  }

  public get userValue(): UserProfile {
    return this.userSubject.value;
  }
}
