/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class PermissionsService {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this.authService.logout();
        this.router.navigate(['/admin', 'login'], {
            queryParams: {
                loginAgain: true,
            },
        });
        return false;
    }
}

export const AuthGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): boolean => inject(PermissionsService).canActivate(next, state);
