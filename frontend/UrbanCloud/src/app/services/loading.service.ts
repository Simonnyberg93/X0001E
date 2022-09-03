import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: boolean;

  constructor() {
    this.loading = false;
  }

  setLoading(loading: boolean) {
    // To remove NG0100 error.
    setTimeout(() => {
      this.loading = loading;
    }, 0);
  }

  getLoading(): boolean {
    return this.loading;
  }
}
