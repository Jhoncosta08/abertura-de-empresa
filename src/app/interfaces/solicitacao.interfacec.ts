import {EmpresaInterface} from './empresa.interface';
import {SolicitanteInterface} from './solicitante.interface';

export interface SolicitacaoInterface {
  empresas: [
    {
      id: string;
      solicitante: SolicitanteInterface,
      empresa: EmpresaInterface
    }
  ];
}
