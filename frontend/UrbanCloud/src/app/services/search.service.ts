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
export class SearchService {
  backendUrl: string = environment.backendInformationApiUrl;

  constructor(private httpcli: HttpClient) {}

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
}
