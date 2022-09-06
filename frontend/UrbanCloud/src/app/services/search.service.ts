import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActorDTO } from '../models/ActorDTO';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  backendUrl: string = environment.backendInformationApiUrl;

  constructor(private httpcli: HttpClient) {}

  findNodesFromSearchString(str: string): Observable<Array<any>> {
    return this.httpcli.get<Array<any>>(
      `${this.backendUrl}/search/nodes/${str}`
    );
  }

  findNodesFromTitles(titles: Array<string>): Observable<Array<any>> {
    return this.httpcli.post<Array<any>>(
      `${this.backendUrl}/search/nodes/bytitles`,
      titles
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
}
