import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { ActorDTO } from '../models/ActorDTO';
import { AreaDTO } from '../models/AreaDTO';
import { DocumentDTO } from '../models/DocumentDTO';
import { PermissionDTO } from '../models/PermissionDTO';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private backendUrl: string = environment.backendInformationApiUrl;

  constructor(private httpcli: HttpClient) {}

  fetchActorByTitle(actorTitle: string): Observable<ActorDTO> {
    return this.httpcli.get<ActorDTO>(
      `${this.backendUrl}/fetch/actor/bytitle/${actorTitle}`
    );
  }

  fetchAllActors(): Observable<Array<ActorDTO>> {
    return this.httpcli.get<Array<ActorDTO>>(
      `${this.backendUrl}/fetch/all/actors`
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

  fetchDocumentsByIncludeRelation(
    areaId: number
  ): Observable<Array<DocumentDTO>> {
    return this.httpcli.get<Array<DocumentDTO>>(
      `${this.backendUrl}/fetch/documents/by/include/${areaId}`
    );
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
}
