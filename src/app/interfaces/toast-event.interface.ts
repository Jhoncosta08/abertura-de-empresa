import {EventTypes} from '../enums/event-types.enum';

export interface ToastEvent {
  type: EventTypes;
  title: string;
  message: string;
}
