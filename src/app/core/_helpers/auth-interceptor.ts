import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public http: HttpClient, private _authService: AuthService, private router: Router) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('ACCESS_TOKEN');

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const rt = localStorage.getItem('REFRESH_TOKEN');
                    if (error.status === 403) {
                        if (!rt) {
                            console.log('No refresh token');
                            this.router.navigate(['main/login']);
                        }
                        this._authService.renewToken().subscribe((res: any) => {
                            // Simple solutions for refresh the whole page
                            window.location.reload();


                        }, error => {
                            this.router.navigate(['login']);
localStorage.clear();
                            alert('Please login again');

                        });
                    }
                    return throwError(error);
                })
            );
    }
}
