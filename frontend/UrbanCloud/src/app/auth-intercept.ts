import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthenticateService } from './services/authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthIntercept implements HttpInterceptor {
  constructor(private authInject: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.authInject.get(AuthenticateService);
    const newReq = req.clone({
      headers: new HttpHeaders()

        .set('Authorization', `Bearer ${authService.getToken()}`)

        .set('Access-Control-Allow-Origin', '*'),
    });

    return next.handle(newReq);
  }
}
