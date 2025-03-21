import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {map, Observable} from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { take } from 'rxjs/operators';
import {UsuarioInterface} from '../interfaces/usuario/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(take(1), map((user: UsuarioInterface | null): boolean => {
        if (!user) {
          void this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}
