import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./views/dashboard/dashboard.component').then(c => c.DashboardComponent),
  },
  {
    path: 'empresa',
    loadChildren: () => import('./views/empresa/empresa.routes').then(m => m.empresaRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }
];
