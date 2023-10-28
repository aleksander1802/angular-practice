import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FbAuthResponse, User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable()
export class AuthService {
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
            .pipe(tap((response) => this.setToken(response)));
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated() {}

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
