import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UtilsService} from '../../../services/utils/utils.service';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './cadastro.component.html',
  styleUrls: ['../auth.scss', '../../../shared/scss/hover-effects.scss', '../../../shared/scss/inputs.scss']
})
export class CadastroComponent {
  cadastroForm!: FormGroup;

  constructor(
    protected router: Router,
    private fb: FormBuilder,
    protected utilsService: UtilsService,
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idade: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
    });
  }

}
