import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ToasterComponent} from './components/toasts-components/toaster/toaster.component';
import {NavComponent} from './components/nav/nav.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToasterComponent, NavComponent, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(protected router: Router) {}
}
