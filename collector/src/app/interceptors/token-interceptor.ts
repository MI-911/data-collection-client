import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { SessionService } from '../services/session.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public session: SessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.session.token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.session.token
        }
      });
    }

    return next.handle(request);
  }
}