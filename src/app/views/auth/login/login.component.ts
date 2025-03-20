import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils/utils.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss', '../../../shared/scss/hover-effects.scss', '../../../shared/scss/inputs.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    protected router: Router,
    private fb: FormBuilder,
    protected utilsService: UtilsService,
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }
}
