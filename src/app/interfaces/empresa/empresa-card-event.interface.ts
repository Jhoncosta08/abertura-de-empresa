import {SolicitacaoInterface} from './solicitacao.interfacec';

export interface EmpresaCardEventInterface {
  clickedEvent: 'edit' | 'delete' | 'details';
  empresa: SolicitacaoInterface
}
