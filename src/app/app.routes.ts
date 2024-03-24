import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/shared/components/auth-layout/auth-layout.component';
import { authRoutes } from './routes/auth.routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children:  authRoutes
    },
    {
        path: '**',
        redirectTo: '/auth/login',
    },
];
