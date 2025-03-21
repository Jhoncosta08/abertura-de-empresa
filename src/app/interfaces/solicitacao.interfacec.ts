import {EmpresaInterface} from './empresa.interface';
import {SolicitanteInterface} from './solicitante.interface';

export interface SolicitacaoInterface {
  solicitante: SolicitanteInterface;
  empresa: EmpresaInterface;
  userId?: string;
  id?: string;
}
