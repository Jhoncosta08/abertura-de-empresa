import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ToastEvent} from '../../interfaces/toast/toast-event.interface';
import {EventTypes} from '../../enums/event-types.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents: Subject<ToastEvent> = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showToast(title: string, message: string, type: 'success' | 'info' | 'warning' | 'error'): void {
    this._toastEvents.next({
      message,
      title,
      type: EventTypes[type],
    });
  }

}
