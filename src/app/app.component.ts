import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToasterComponent} from './components/toasts-components/toaster/toaster.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToasterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
