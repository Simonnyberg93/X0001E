import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Area } from '../models/Area';
import { Role } from '../models/Role';
import { Topic } from '../models/Topic';
import ConstantValues from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // This data we will retrive from graph database
  dummyTopresults = ConstantValues.dummy;
  dummyActersResult = ConstantValues.dummyActers;
  dummyAreaResults = ConstantValues.dummyAreas;
  dummyPermissionResults = ConstantValues.dummyPermissions;

  dummyWords = ConstantValues.searchWords;
  dummyRoles = ConstantValues.workRoles;
  dummyAreas = ConstantValues.importantAreas;
  dummyTopics = ConstantValues.importantInfo;

  constructor() {}

  fetchDataFromSearchString(str: string): Observable<any> {
    let result: any = {
      topresults: this.dummyTopresults,
      actersresults: this.dummyActersResult,
      arearesults: this.dummyAreaResults,
      permissionsresults: this.dummyPermissionResults,
    };
    return of(result); // for now just fake this
  }

  fetchDataFromWorkRoles(roles: Role[]): Observable<any> {
    return of(this.dummyTopresults);
  }

  fetchDataFromUserAreaOfInterest(areas: Area[]): Observable<any> {
    return of(this.dummyAreaResults);
  }

  fetchDataFromUserTopicsOfInterest(topics: Topic[]): Observable<any> {
    return of(this.dummyTopresults);
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
