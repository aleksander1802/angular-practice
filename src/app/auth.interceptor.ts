import {
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        const cloned = req.clone({
            headers: req.headers.append('Authorization', 'Basic RANDOM Token'),
        });

        return next.handle(cloned).pipe(
            tap((event) => {
                if (event.type === HttpEventType.Response) {
                    console.log('Intercepting response', event);
                }
            }),
        );
    }
}
