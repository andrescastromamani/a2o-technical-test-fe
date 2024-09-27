import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'problem-2',
        loadComponent: () => import("@features/pages/string-value/string-value.component"),
    },
    {
        path: '**',
        redirectTo: 'problem-2'
    }
];
