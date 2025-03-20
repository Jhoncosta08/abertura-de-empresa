import {Routes} from '@angular/router';

export const empresaRoutes: Routes = [
  {
    path: 'abrir',
    title: 'Abrir Empresa',
    loadComponent: () => import('./abrir-editar-empresa/abrir-editar-empresa.component').then(c => c.AbrirEditarEmpresaComponent)
  },
  {
    path: 'editar/:id',
    title: 'Editar Empresa',
    loadComponent: () => import('./abrir-editar-empresa/abrir-editar-empresa.component').then(c => c.AbrirEditarEmpresaComponent)
  },
  {
    path: 'detalhes/:id',
    title: 'Detalhes Da Empresa',
    loadComponent: () => import('./abrir-editar-empresa/abrir-editar-empresa.component').then(c => c.AbrirEditarEmpresaComponent)
  }
];
