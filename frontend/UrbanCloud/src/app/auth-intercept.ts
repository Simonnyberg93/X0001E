import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

export class AuthIntercept implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,

    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      headers: new HttpHeaders()

        .set('Authorization', `Bearer ${sessionStorage.getItem('token')}`)

        .set('Access-Control-Allow-Origin', '*'),
    });

    return next.handle(newReq);
  }
}
