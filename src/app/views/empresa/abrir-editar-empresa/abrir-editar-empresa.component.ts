import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SolicitacaoInterface} from '../../../interfaces/solicitacao.interfacec';
import {NgIf} from '@angular/common';
import {SimpleButtonComponent} from '../../../components/simple-button/simple-button.component';
import {SimpleSpinnerComponent} from '../../../components/simple-spinner/simple-spinner.component';
import {UtilsService} from '../../../services/utils/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EmpresaService} from '../../../services/empresa/empresa.service';
import {ToastService} from '../../../services/toast/toast.service';

@Component({
  selector: 'app-abrir-editar-empresa',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    SimpleButtonComponent,
    SimpleSpinnerComponent
  ],
  templateUrl: './abrir-editar-empresa.component.html',
  styleUrls: ['./abrir-editar-empresa.component.scss', '../../../shared/scss/inputs.scss']
})
export class AbrirEditarEmpresaComponent {
  empresaForm!: FormGroup;
  showSubmitSpinner: boolean = false;
  pageParamId: string | null = null;
  showPageSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    protected utilsService: UtilsService,
    protected router: Router,
    private empresaService: EmpresaService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute
  ) {
    this.pageParamId = this.activatedRoute.snapshot.params['id'];
    void this.getEmpresaData();
  }

  async getEmpresaData(): Promise<void> {
    if (!this.pageParamId) {
      this.buildForm(undefined);
      return undefined;
    }
    this.showPageSpinner = true;
    const empresa: SolicitacaoInterface | undefined = await this.empresaService.getEmpresaById(this.pageParamId);
    this.buildForm(empresa);
  }

  buildForm(empresa: SolicitacaoInterface | undefined): void {
    this.empresaForm = this.fb.group({
      id: empresa?.id ?? '',
      solicitante: new FormGroup({
        ds_responsavel: new FormControl(empresa?.solicitante.ds_responsavel ?? '', Validators.required),
        nu_cpf: new FormControl(empresa?.solicitante.nu_cpf ?? '', Validators.required),
        date_nascimento: new FormControl(empresa?.solicitante.date_nascimento ?? '', Validators.required),
      }),
      empresa: new FormGroup({
        ds_nome_fantasia: new FormControl(empresa?.empresa.ds_nome_fantasia ?? '', Validators.required),
        endereco: new FormGroup({
          co_cep: new FormControl(empresa?.empresa.endereco.co_cep ?? null, Validators.required),
          ds_logradouro: new FormControl(empresa?.empresa.endereco.ds_logradouro ?? null, Validators.required),
          co_numero: new FormControl(empresa?.empresa.endereco.co_numero ?? null, Validators.required),
          ds_complemento: new FormControl(empresa?.empresa.endereco.ds_complemento ?? null),
          ds_bairro: new FormControl(empresa?.empresa.endereco.ds_bairro ?? null, Validators.required),
          ds_municipio: new FormControl(empresa?.empresa.endereco.ds_municipio ?? null, Validators.required),
          ds_uf: new FormControl(empresa?.empresa.endereco.ds_uf ?? null, Validators.required),
        }),
      }),
    });
    this.showPageSpinner = false;
  }

  async submitForm(event: Event): Promise<void> {
    event.preventDefault();
    if (this.empresaForm.invalid) {
      return this.toast.showToast('Erro', 'Formulário inválido', 'error');
    }
    this.showSubmitSpinner = true;
    const empresaForm: any = this.empresaForm.value;
    const empresa: SolicitacaoInterface = empresaForm;
    if (!this.pageParamId) {
      await this.empresaService.addEmpresa(empresa);
      this.empresaForm.reset();
    } else {
      await this.empresaService.updateEmpresa(this.pageParamId, empresa)
    }
    this.showSubmitSpinner = false;
  }

}
