import { Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'empresa',
    loadChildren: () => import('./views/empresa/empresa.routes').then(m => m.empresaRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    redirectTo: 'auth',
    pathMatch: 'full',
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
