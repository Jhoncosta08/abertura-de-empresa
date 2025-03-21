import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SolicitacaoInterface} from '../../interfaces/empresa/solicitacao.interfacec';
import {NgIf} from '@angular/common';
import {EmpresaCardEventInterface} from '../../interfaces/empresa/empresa-card-event.interface';

@Component({
  selector: 'app-empresa-card',
  imports: [NgIf],
  templateUrl: './empresa-card.component.html',
  styleUrls: ['./empresa-card.component.scss', '../../shared/scss/hover-effects.scss']
})
export class EmpresaCardComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input({required:true}) empresa!: SolicitacaoInterface;
  @Input({required: true}) showTrashIconSpinner: boolean = false;

  sendClickedEvent(clickedEvent: EmpresaCardEventInterface): void {
    this.onClick.emit(clickedEvent);
  }
}
