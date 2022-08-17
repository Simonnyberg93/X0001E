import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { environment } from '../environment/environment';
import { ActorDTO } from '../models/ActorDTO';
import { Area } from '../models/Area';
import { AreaDTO } from '../models/AreaDTO';
import { DocumentDTO } from '../models/DocumentDTO';
import { PermissionDTO } from '../models/PermissionDTO';
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

  private backendUrl: string = environment.backendInformationApiUrl;

  constructor(private httpcli: HttpClient) {}

  fetchDocumentsFromUserTopicsOfInterest(
    topicsOfInterest: Topic[]
  ): Observable<Array<DocumentDTO>> {
    let searchStr: string = '';
    topicsOfInterest
      .flatMap((value: Topic) => value.topicName)
      .forEach((str: string) => searchStr.concat(str));
    return this.fetchDocumentsFromSearchString(searchStr);
  }
  fetchAreasFromUserAreaOfInterest(
    areasOfInterest: Area[]
  ): Observable<Array<AreaDTO>> {
    let searchStr: string = '';
    areasOfInterest
      .flatMap((value: Area) => value.areaName)
      .forEach((str: string) => searchStr.concat(str));
    return this.fetchAreasFromSearchString(searchStr);
  }
  fetchActorsFromWorkRoles(roles: Role[]): Observable<Array<ActorDTO>> {
    let searchStr: string = '';
    roles
      .flatMap((value: Role) => value.roleName)
      .forEach((str: string) => searchStr.concat(str));
    return this.fetchActorsFromSearchString(searchStr);
  }

  fetchDocumentsByActorTitle(
    actorTitle: string
  ): Observable<Array<DocumentDTO>> {
    return this.httpcli.get<Array<DocumentDTO>>(
      `${this.backendUrl}/fetch/documents/bysource/${actorTitle}`
    );
  }

  findRelatedAreas(areaTitle: string): Observable<Array<AreaDTO>> {
    return this.httpcli.get<Array<AreaDTO>>(
      `${this.backendUrl}/fetch/areas/byneighborarea/${areaTitle}`
    );
  }

  fetchActorById(actorId: string): Observable<ActorDTO> {
    return this.httpcli.get<ActorDTO>(`${this.backendUrl}/fetch/actor/byid/24`);
  }

  fetchRelatedActors(areaId: string): Observable<any[]> {
    return of(this.dummyActersResult.slice(0, 3));
  }

  fetchAreaById(areaId: string): Observable<AreaDTO> {
    return this.httpcli.get<AreaDTO>(
      `${this.backendUrl}/fetch/area/byid/${areaId}`
    );
  }

  fetchTopicsByTitle(titles: string[]): Observable<any[]> {
    let result: any[] = [];
    let topics = ConstantValues.dummyTopics;
    for (let x of topics) {
      if (titles.includes(x.title)) {
        result.push(x);
      }
    }
    return of(result);
  }

  fetchRelatedAreas(areaId: string): Observable<any[]> {
    return of(this.dummyAreaResults.slice(1, 4));
  }

  fetchActorsFromSearchString(str: string): Observable<Array<ActorDTO>> {
    return this.httpcli.get<Array<ActorDTO>>(
      `${this.backendUrl}/search/actors/${str}`
    );
  }
  fetchAreasFromSearchString(str: string): Observable<Array<AreaDTO>> {
    return this.httpcli.get<Array<AreaDTO>>(
      `${this.backendUrl}/search/areas/${str}`
    );
  }
  fetchDocumentsFromSearchString(str: string): Observable<Array<DocumentDTO>> {
    return this.httpcli.get<Array<DocumentDTO>>(
      `${this.backendUrl}/search/documents/${str}`
    );
  }
  fetchPermissionsFromSearchString(
    str: string
  ): Observable<Array<PermissionDTO>> {
    return this.httpcli.get<Array<PermissionDTO>>(
      `${this.backendUrl}/search/permissions/${str}`
    );
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
