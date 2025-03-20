import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils/utils.service';
import {NgIf} from '@angular/common';
import {SimpleButtonComponent} from '../../../components/simple-button/simple-button.component';
import {SimpleSpinnerComponent} from '../../../components/simple-spinner/simple-spinner.component';
import {ToastService} from '../../../services/toast/toast.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    SimpleButtonComponent,
    SimpleSpinnerComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss', '../../../shared/scss/hover-effects.scss', '../../../shared/scss/inputs.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  showSubmitSpinner: boolean = false;

  constructor(
    protected router: Router,
    private fb: FormBuilder,
    protected utilsService: UtilsService,
    private toast: ToastService,
    private authService: AuthService,
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  async submitForm(event: Event): Promise<void> {
    event.preventDefault();

    if (this.loginForm.invalid) {
      return this.toast.showToast('Erro', 'Formulário inválido', 'error');
    }

    this.showSubmitSpinner = true;
    const formValue = this.loginForm.value;
    await this.authService.login(formValue);
    this.showSubmitSpinner = false;
  }

}
