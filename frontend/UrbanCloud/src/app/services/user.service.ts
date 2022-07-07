import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpcli: HttpClient) {}

  fetchUsersTopicsOfInterestFromDb(email: string): Observable<any> {
    // check if email matches current logged in user
    return this.httpcli.get(`${environment.backendUserApiUrl}/topics/${email}`);
  }
}
