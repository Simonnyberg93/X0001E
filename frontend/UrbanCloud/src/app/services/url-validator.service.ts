import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlValidatorService {
  backendUrl: string = environment.backendInformationApiUrl;

  constructor(private httpcli: HttpClient) {}

  /* Checks if url is reachable, if it is not send info to backend */
  async validateUrl(url: string, id: number): Promise<boolean> {
    let bool: boolean = await fetch(url, { mode: 'no-cors' })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });

    if (!bool) {
      // Add node to list of faulty nodes
      this.httpcli
        .get(`${this.backendUrl}/update/validurl/${id}/${true}`)
        .subscribe({
          next: () => {},
          error: () => {},
        });
    }
    return bool;
  }
}
