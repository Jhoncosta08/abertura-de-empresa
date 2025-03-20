import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UtilsService} from '../../../services/utils/utils.service';
import {SimpleButtonComponent} from '../../../components/simple-button/simple-button.component';
import {UsuarioInterface} from '../../../interfaces/usuario.interface';
import {ToastService} from '../../../services/toast/toast.service';
import {AuthService} from '../../../services/auth/auth.service';
import {SimpleSpinnerComponent} from '../../../components/simple-spinner/simple-spinner.component';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, NgIf, SimpleButtonComponent, SimpleSpinnerComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['../auth.scss', '../../../shared/scss/hover-effects.scss', '../../../shared/scss/inputs.scss']
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
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
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idade: [null, [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async submitForm(event: Event): Promise<void> {
    event.preventDefault();
    if (this.cadastroForm.invalid) {
      return this.toast.showToast('Erro', 'Formulário inválido', 'error');
    }

    if (!this.checkPasswords()) {
      return this.toast.showToast('Erro', 'As senhas não coincidem', 'error');
    }
    this.showSubmitSpinner = true;
    const formValue = this.cadastroForm.value;
    const user: UsuarioInterface = {
      nome: formValue.nome,
      email: formValue.email,
      idade: formValue.idade,
      dataNascimento: formValue.dataNascimento,
      cpf: formValue.cpf,
      dataCriacao: new Date().toLocaleDateString('pt-br')
    };
    await this.authService.register(user, formValue.senha);
    this.showSubmitSpinner = false;
  }

  checkPasswords(): boolean {
    const senha: string = this.cadastroForm.get('senha')?.value;
    const confimarSenha: string = (this.cadastroForm.get('confirmarSenha')?.value);
    return !!((senha && confimarSenha) && senha === confimarSenha);
  }

}
