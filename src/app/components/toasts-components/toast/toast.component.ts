import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';
import {EventTypes} from '../../../enums/event-types.enum';
import { Toast } from 'bootstrap';
import {fromEvent, take} from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  @Input() type!: EventTypes;
  @Input() title!: string;
  @Input() message!: string;
  @Output() disposeEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;
  toast!: Toast;

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      this.type === EventTypes.error ? {autohide: false} : {delay: 3000}
    );
    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast').pipe(take(1)).subscribe((): void => this.hide());
    this.toast.show();
  }

  hide(): void {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
