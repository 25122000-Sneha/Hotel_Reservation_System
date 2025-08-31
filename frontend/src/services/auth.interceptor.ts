import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService : AuthService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    const authToken = this.authService.getToken();

    let headers = req.headers;

    if(!(req.body instanceof FormData))
    {
      headers = headers.set('Content-Type', 'application/json');
    }

    //let headers = req.headers.set('Content-Type', 'application/json');


    if(authToken){
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }

    const clonedRequest = req.clone({headers});
    //console.log("Request headers: ", clonedRequest.headers);
    
    return next.handle(clonedRequest);
  }
  
  
};
