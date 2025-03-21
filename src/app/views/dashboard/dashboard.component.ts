import {Component} from '@angular/core';
import {EmpresaService} from '../../services/empresa/empresa.service';
import {SolicitacaoInterface} from '../../interfaces/empresa/solicitacao.interfacec';
import {EmpresaCardComponent} from '../../components/empresa-card/empresa-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {EmpresaCardEventInterface} from '../../interfaces/empresa/empresa-card-event.interface';
import {Router} from '@angular/router';
import {SimpleSpinnerComponent} from '../../components/simple-spinner/simple-spinner.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    EmpresaCardComponent,
    NgForOf,
    SimpleSpinnerComponent,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  empresas: SolicitacaoInterface[] = [];
  showTrashSpinner: boolean = false;
  showPageSpinner: boolean = false;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
  ) {
    void this.getAllEmpresa();
  }

  async getAllEmpresa(): Promise<void> {
    this.showPageSpinner = true;
    this.empresas = await this.empresaService.getEmpresas();
    this.showPageSpinner = false;
  }

  async getEmpresaCardEvent(cardEvent: EmpresaCardEventInterface): Promise<any> {
    switch (cardEvent.clickedEvent) {
      case 'details':
        await this.router.navigate(['/empresa/detalhes', cardEvent.empresa.id]);
        break
      case 'edit':
        await this.router.navigate(['/empresa/editar', cardEvent.empresa.id]);
        break;
      case 'delete':
        this.showTrashSpinner = true;
        await this.empresaService.deleteEmpresa(cardEvent.empresa.id ?? '');
        this.empresas = [];
        this.showTrashSpinner = false;
        await this.getAllEmpresa();
        break;
    }
  }
}
