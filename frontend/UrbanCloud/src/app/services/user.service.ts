import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpcli: HttpClient) {}

  fetchUsersTopicsOfInterestFromDb(email: string): Observable<any> {
    // check if email matches current logged in user
    return this.httpcli.get(
      `${environment.backendUserApiUrl}/topics/fetch/${email}`
    );
  }

  updateUserRoles(email: string, selectedRoles: string[]): Observable<string> {
    return this.httpcli.post(
      `${environment.backendUserApiUrl}/role/addrole/${email}`,
      selectedRoles,
      {
        responseType: 'text',
      }
    );
  }

  updateUserImportantInfo(
    email: string,
    selectedInfo: string[]
  ): Observable<string> {
    return this.httpcli.post(
      `${environment.backendUserApiUrl}/topic/addtopic/${email}`,
      selectedInfo,
      {
        responseType: 'text',
      }
    );
  }

  updateUserAreasOfImportance(
    email: string,
    selectedAreas: string[]
  ): Observable<string> {
    return this.httpcli.post(
      `${environment.backendUserApiUrl}/area/addarea/${email}`,
      selectedAreas,
      {
        responseType: 'text',
      }
    );
  }
}
