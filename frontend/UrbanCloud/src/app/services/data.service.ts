import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import ConstantValues from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dummyData = ConstantValues.dummy;
  dummyWords = ConstantValues.searchWords;
  dummyRoles = ConstantValues.workRoles;
  dummyAreas = ConstantValues.importantAreas;
  dummyTopics = ConstantValues.importantInfo;

  constructor() {}

  fetchDataFromSearchString(str: string): Observable<any> {
    return of(this.dummyData); // for now just fake this
  }

  fetchMostSearchedWords(): Observable<any> {
    return of(this.dummyWords);
  }

  fetchWorkRoles(): Observable<any> {
    return of(this.dummyRoles);
  }

  fetchAreasOfInterest(): Observable<any> {
    return of(this.dummyAreas);
  }

  fetchTopicsOfInterest(): Observable<any> {
    return of(this.dummyTopics);
  }
}
