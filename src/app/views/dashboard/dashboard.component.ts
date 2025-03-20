import { Component } from '@angular/core';
import {SolicitacaoInterface} from '../../interfaces/solicitacao.interfacec';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  solicitacao: SolicitacaoInterface = {
    empresas: [
      {
        id: '1',
        solicitante: {
          ds_responsavel: 'Catarina Ester da Cruz',
          nu_cpf: '73422953027',
          date_nascimento: '1984-04-20'
        },
        empresa: {
          ds_nome_fantasia: 'Diogo e Marcelo Filmagens Ltda',
          endereco: {
            co_cep: 14022094,
            ds_logradouro: 'Rua Alcino Jacinto Ramos',
            co_numero: '233',
            ds_complemento: null,
            ds_bairro: 'Quinta da Primavera',
            ds_municipio: 'Ribeirão Preto',
            ds_uf: 'SP'
          }
        }
      }
    ]
  }

  constructor() {
    console.log('empresas: ', this.solicitacao);
  }
}
