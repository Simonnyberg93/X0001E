import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { finalize, Observable } from 'rxjs';
import { AuthenticateService } from './services/authenticate.service';
import { LoadingService } from './services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthIntercept implements HttpInterceptor {
  private totalRequests: number = 0;
  constructor(
    private authInject: Injector,
    private loadingService: LoadingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    let authService = this.authInject.get(AuthenticateService);
    const newReq = req.clone({
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${authService.getToken()}`)
        .set('Access-Control-Allow-Origin', '*'),
    });

    return next.handle(newReq).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
