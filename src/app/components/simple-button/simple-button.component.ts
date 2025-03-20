import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-simple-button',
  imports: [NgClass],
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss', '../../shared/scss/hover-effects.scss']
})
export class SimpleButtonComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input({required: true}) buttonText: string = 'Button';
  @Input({required: true}) type: 'button' | 'submit' = 'button'
  @Input() isOutlined: boolean = false;
  @Input() isActive: boolean = false;
}
