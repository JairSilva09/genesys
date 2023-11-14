import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap, filter, take, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { GenesysService } from './genesys.service';

@Injectable({
  providedIn: 'root'
})
export class GenesysInterceptorService implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private router: Router) {    
    
    }  

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq = req;
        const token = localStorage.getItem('token');
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }
        return next.handle(authReq).pipe(map((event: any) => {
            //this.toasterService.success("We are back!", "Token refreshed", { positionClass: 'toast-top-center'} );
            return event;
        }), catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.error.message == "Invalid credentials.") {
                        this.router.navigate(['./dashboard'])
                    
                    }
                }
                if (err.status === 401) {
                    if (err.error.message == 'Invalid JWT Token') {
                        return this.handle401Error(authReq, next);
                    } else if (err.error.message == 'Expired JWT Token') {

                        return this.handle401Error(authReq, next);
                    } else {
                        this.router.navigate(['dashboard']);
                    }
                }
                const error = err.error.message || err.statusText;
                return throwError(err);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            this.refreshTokenSubject.next(localStorage.getItem('refresh_token'));
            const tok = localStorage.getItem('refresh_token')

        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: any) {
        // const url = 'https://api.isg-dev.one/api'
        // if( !request.url.match(url) ) return request;
        /**********************************************************************/
        const customHeaders = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return request.clone({ headers: customHeaders });
        //return request.clone({ headers: request.headers.set(environment.token_header_key, 'Bearer ' + token) });
    }

}
