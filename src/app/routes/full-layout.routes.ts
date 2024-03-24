import { Routes } from '@angular/router';

export const fullLayoutRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('../core/core.module').then(m => m.CoreModule),
    },
];