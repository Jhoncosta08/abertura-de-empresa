import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  isFormControlValid(formControlName: string, formGroup: FormGroup): boolean | undefined {
    return formGroup.get(formControlName)?.invalid && formGroup.get(formControlName)?.touched;
  }

}
