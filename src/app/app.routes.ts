import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { authRoutes } from './routes/auth.routes';
import { FullLayoutComponent } from './shared/components/full-layout/full-layout.component';
import { fullLayoutRoutes } from './routes/full-layout.routes';

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
        path: '',
        component: FullLayoutComponent,
        children:  fullLayoutRoutes
    },
    {
        path: '**',
        redirectTo: '/auth/login',
    },
];
