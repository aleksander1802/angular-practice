import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        let modifiedReq = req;

        if (this.authService.isAuthenticated()) {
            modifiedReq = req.clone({
                setParams: {
                    auth: this.authService.token || '',
                },
            });
        }
        return next.handle(modifiedReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout();
                    this.router.navigate(['/admin', 'login'], {
                        queryParams: {
                            authFailed: true,
                        },
                    });
                }

                return throwError(() => error);
            }),
        );
    }
}
