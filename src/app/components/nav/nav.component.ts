import { Component } from '@angular/core';
import {HamburgerComponent} from './hamburger/hamburger.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  imports: [HamburgerComponent, RouterLinkActive, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', '../../shared/scss/hover-effects.scss']
})
export class NavComponent {
  constructor(private authService: AuthService) {}

  async logout(): Promise<void> {
    await this.authService.logout();
  }

}
