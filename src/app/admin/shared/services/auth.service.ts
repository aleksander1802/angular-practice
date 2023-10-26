import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    get token() {
        return '';
    }

    login(user: User) {
        return this.http.post('', user);
    }

    logout() {}

    isAuthenticated() {}

    private setToken() {}
}
