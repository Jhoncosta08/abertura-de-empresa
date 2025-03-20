import {Routes} from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'cadastro',
    title: 'Cadastro',
    loadComponent: () => import('./cadastro/cadastro.component').then(c => c.CadastroComponent)
  },
  {
    path: 'esqueceu-senha',
    title: 'Esqueceu Senha',
    loadComponent: () => import('./esqueceu-senha/esqueceu-senha.component').then(c => c.EsqueceuSenhaComponent)
  },
]
