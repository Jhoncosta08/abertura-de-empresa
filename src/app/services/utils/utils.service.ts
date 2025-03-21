import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  isFormControlValid(formControlName: string, formGroup: FormGroup): boolean | undefined {
    const formValue = formGroup.get(formControlName);
    return formValue?.invalid && formValue?.touched;
  }

}
