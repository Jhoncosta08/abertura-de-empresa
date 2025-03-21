import { Component } from '@angular/core';
import {EmpresaService} from '../../services/empresa/empresa.service';
import {SolicitacaoInterface} from '../../interfaces/solicitacao.interfacec';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  empresas: SolicitacaoInterface[] = [];

  constructor(private empresaService: EmpresaService) {
    void this.getAllEmpresa();
  }

  async getAllEmpresa(): Promise<void> {
    this.empresas = await this.empresaService.getEmpresas();
    console.log('Empresas: ', this.empresas);
  }
}
