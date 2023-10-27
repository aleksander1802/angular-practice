import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    get token() {
        return '';
    }

    login(user: User) {
        return this.http
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${environment.apiKey}`,
                user,
            )
            .pipe(tap(this.setToken));
    }

    logout() {}

    isAuthenticated() {}

    private setToken(response: unknown) {
        console.log(response);
    }
}
