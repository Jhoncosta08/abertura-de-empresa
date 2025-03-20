import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastService} from '../../../services/toast/toast.service';
import {ToastEvent} from '../../../interfaces/toast-event.interface';
import {ToastComponent} from '../toast/toast.component';

@Component({
  selector: 'app-toaster',
  imports: [ToastComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscribeToToasts();
  }

  subscribeToToasts(): void {
    this.toastService.toastEvents.subscribe((toasts: ToastEvent): void => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      this.cdr.detectChanges();
    });
  }

  dispose(index: number): void {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }

}
