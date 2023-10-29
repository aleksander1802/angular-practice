import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import {
    Subject, catchError, tap, throwError,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {}

    get token() {
        const expDate = new Date(localStorage.getItem('fb-token-exp')!);
        if (new Date() > expDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    login(user: User) {
        const modifiedUser: User = { ...user, returnSecureToken: true };

        return this.http
            .post<FbAuthResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
            modifiedUser,
        )
            .pipe(
                tap((response) => this.setToken(response)),
                catchError(this.handleError.bind(this)),
            );
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated() {
        return !!this.token;
    }

    private handleError(error: HttpErrorResponse) {
        const { message } = error.error;

        if (!message) {
            this.error$.next(
                'Врубай ВПН, хрен тебе кто подскажет что это за ошибка',
            );
        }

        if (message) {
            switch (message) {
                case 'INVALID_EMAIL':
                    this.error$.next('Неверный email');
                    break;
                case 'INVALID_PASSWORD':
                    this.error$.next('Неверный password');
                    break;
                case 'EMAIL_NOT_FOUND':
                    this.error$.next('Введённый email не существует');
                    break;
                default:
                    this.error$.next('');
                    break;
            }
        }

        return throwError(() => error);
    }

    private setToken(response: FbAuthResponse | null) {
        if (response) {
            const expDate = new Date(
                new Date().getTime() + +response.expiresIn * 1000,
            );
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }
}
