import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-simple-spinner',
  imports: [NgIf],
  templateUrl: './simple-spinner.component.html',
  styleUrl: './simple-spinner.component.scss'
})
export class SimpleSpinnerComponent {
  @Input({required: true}) showSpinner: boolean = false;
}
