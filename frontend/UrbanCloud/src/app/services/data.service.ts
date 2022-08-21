import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { ActorDTO } from '../models/ActorDTO';
import { Area } from '../models/Area';
import { AreaDTO } from '../models/AreaDTO';
import { DocumentDTO } from '../models/DocumentDTO';
import { PermissionDTO } from '../models/PermissionDTO';
import { Role } from '../models/Role';
import { Topic } from '../models/Topic';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private backendUrl: string = environment.backendInformationApiUrl;

  constructor(private httpcli: HttpClient) {}

  fetchAllActors(): Observable<Array<ActorDTO>> {
    return this.httpcli.get<Array<ActorDTO>>(
      `${this.backendUrl}/fetch/all/actors`
    );
  }

  fetchLicensingActor(permissionId: string): Observable<ActorDTO> {
    return this.httpcli.get<ActorDTO>(
      `${this.backendUrl}/fetch/actor/by/licensed_by/${permissionId}`
    );
  }

  fetchDocumentsByDerivesFrom(
    permissionId: string
  ): Observable<Array<DocumentDTO>> {
    return this.httpcli.get<Array<DocumentDTO>>(
      `${this.backendUrl}/fetch/documents/by/derives_from/${permissionId}`
    );
  }

  fetchAllAreas(): Observable<Array<AreaDTO>> {
    return this.httpcli.get<Array<AreaDTO>>(
      `${this.backendUrl}/fetch/all/areas`
    );
  }

  fetchAllDocuments(): Observable<Array<DocumentDTO>> {
    return this.httpcli.get<Array<DocumentDTO>>(
      `${this.backendUrl}/fetch/all/documents`
    );
  }

  fetchAllPermissions(): Observable<Array<PermissionDTO>> {
    return this.httpcli.get<Array<PermissionDTO>>(
      `${this.backendUrl}/fetch/all/permissions`
    );
  }

  fetchPermissionsByShortestPath(id: number): Observable<Array<PermissionDTO>> {
    return this.httpcli.get<Array<PermissionDTO>>(
      `${this.backendUrl}/fetch/permission/by/shortestpath/${id}`
    );
  }

  fetchAreasByShortestPath(id: string): Observable<Array<AreaDTO>> {
    return this.httpcli.get<Array<AreaDTO>>(
      `${this.backendUrl}/fetch/areas/by/shortestpath/${id}`
    );
  }

  fetchActorsByShortestPath(id: string): Observable<Array<ActorDTO>> {
    return this.httpcli.get<Array<ActorDTO>>(
      `${this.backendUrl}/fetch/actors/by/shortestpath/${id}`
    );
  }

  fetchActorsByActiveInRelation(areaId: number): Observable<Array<ActorDTO>> {
    return this.httpcli.get<Array<ActorDTO>>(
      `${this.backendUrl}/fetch/actors/by/active_in/${areaId}`
    );
  }

  fetchAreasByActiveInRelation(actorId: number): Observable<Array<AreaDTO>> {
    return this.httpcli.get<Array<AreaDTO>>(
      `${this.backendUrl}/fetch/areas/by/active_in/${actorId}`
    );
  }

  fetchActorsByRelatedToRelation(actorId: number): Observable<Array<ActorDTO>> {
    return this.httpcli.get<Array<ActorDTO>>(
      `${this.backendUrl}/fetch/actors/by/related_to/${actorId}`
    );
  }

  fetchPermissionsFromLicensedByRelation(
    actorId: number
  ): Observable<Array<PermissionDTO>> {
    return this.httpcli.get<Array<PermissionDTO>>(
      `${this.backendUrl}/fetch/permissions/by/licenced_by/${actorId}`
    );
  }

  fetchDocumentsByIncludeRelation(
    areaId: number
  ): Observable<Array<DocumentDTO>> {
    return this.httpcli.get<Array<DocumentDTO>>(
      `${this.backendUrl}/fetch/documents/by/include/${areaId}`
    );
  }

  fetchMostSearchedWords(): Observable<Array<string>> {
    return this.httpcli.get<Array<string>>(
      `${this.backendUrl}/search/fetch/mostsearchedwords`
    );
  }

  fetchActorsByTitles(arg0: string[]): Observable<Array<ActorDTO>> {
    return this.httpcli.post<Array<ActorDTO>>(
      `${this.backendUrl}/fetch/actor/bytitles`,
      arg0
    );
  }

  fetchDocumentsByTitles(arg0: string[]): Observable<Array<DocumentDTO>> {
    return this.httpcli.post<Array<DocumentDTO>>(
      `${this.backendUrl}/fetch/documents/bytitles`,
      arg0
    );
  }

  fetchAreasByTitles(arg0: string[]): Observable<Array<AreaDTO>> {
    return this.httpcli.post<Array<AreaDTO>>(
      `${this.backendUrl}/fetch/area/bytitles`,
      arg0
    );
  }

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
      .forEach((str: string) => (searchStr = searchStr.concat(' ' + str)));
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
    return this.httpcli.get<ActorDTO>(
      `${this.backendUrl}/fetch/actor/byid/${actorId}`
    );
  }

  fetchAreaById(areaId: string): Observable<AreaDTO> {
    return this.httpcli.get<AreaDTO>(
      `${this.backendUrl}/fetch/area/byid/${areaId}`
    );
  }

  fetchDocumentById(documentId: string): Observable<DocumentDTO> {
    return this.httpcli.get<DocumentDTO>(
      `${this.backendUrl}/fetch/document/byid/${documentId}`
    );
  }

  fetchPermissionById(permissionId: string): Observable<PermissionDTO> {
    return this.httpcli.get<PermissionDTO>(
      `${this.backendUrl}/fetch/permission/byid/${permissionId}`
    );
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
}
