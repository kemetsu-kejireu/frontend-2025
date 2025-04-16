import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = async () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    try {
        const isAuthenticated: boolean = await authService.isAuthenticatedAsync();
        if(isAuthenticated) {
            return true;
        } else {
            router.navigate(['/login']);
            return false;
        }
    } catch (error) {
        router.navigate(['/login']);
        return false;
    }
};