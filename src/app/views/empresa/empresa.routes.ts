import {Routes} from '@angular/router';

export const empresaRoutes: Routes = [
  {
    path: 'abrir',
    title: 'Empresa - Abrir',
    loadComponent: () => import('./abrir-editar-empresa/abrir-editar-empresa.component').then(c => c.AbrirEditarEmpresaComponent)
  },
  {
    path: 'editar/:id',
    title: 'Empresa - Editar',
    loadComponent: () => import('./abrir-editar-empresa/abrir-editar-empresa.component').then(c => c.AbrirEditarEmpresaComponent)
  },
  {
    path: 'detalhes/:id',
    title: 'Empresa - Detalhes',
    loadComponent: () => import('./abrir-editar-empresa/abrir-editar-empresa.component').then(c => c.AbrirEditarEmpresaComponent)
  }
];
