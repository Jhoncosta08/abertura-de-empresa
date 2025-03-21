import { Injectable } from '@angular/core';
import {SolicitacaoInterface} from '../../interfaces/empresa/solicitacao.interfacec';
import {AuthService} from '../auth/auth.service';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  CollectionReference,
  QuerySnapshot,
  DocumentReference,
  DocumentSnapshot
} from '@angular/fire/firestore';
import {ToastService} from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private readonly empresasCollection : CollectionReference;
  readonly currentUserId: string | undefined = undefined;

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private toast: ToastService,
  ) {
    this.empresasCollection =  collection(this.firestore, 'empresas');
    this.currentUserId = this.authService.user.getValue()?.uid;
  }

  async addEmpresa(empresa: SolicitacaoInterface): Promise<void> {
    try {
      const id: string = doc(this.empresasCollection).id;
      const empresaDocRef = doc(this.firestore, `empresas/${id}`);
      await setDoc(empresaDocRef, { ...empresa, id, userId: this.currentUserId });
      this.toast.showToast('Adicionada', `Empresa ${empresa.empresa.ds_nome_fantasia ?? ''} foi adicionada com sucesso.`, 'success');
    } catch (error) {
      this.toast.showToast('Erro', 'Erro ao adicionar empresa', 'error');
    }
  }

  async getEmpresas(): Promise<SolicitacaoInterface[]> {
    try {
      const snapshot: QuerySnapshot = await getDocs(this.empresasCollection);
      return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as SolicitacaoInterface[];
    } catch (error) {
      console.error('Erro ao listar empresas', error);
      this.toast.showToast('Erro', 'Erro ao listar empresas', 'error');
      return [];
    }
  }

  async getEmpresaById(id: string): Promise<SolicitacaoInterface | undefined> {
    try {
      const empresaDocRef: DocumentReference = doc(this.firestore, `empresas/${id}`);
      const snapshot: DocumentSnapshot = await getDoc(empresaDocRef);
      if (snapshot.exists()) {
        return {id: snapshot.id, ...snapshot.data()} as SolicitacaoInterface;
      } else {
        this.toast.showToast('Erro', 'Nenhuma empresa encontrada', 'error');
        return undefined;
      }
    } catch (error) {
      this.toast.showToast('Erro', 'Erro ao consultar empresa', 'error');
      console.error('Erro ao consultar empresa', error);
      return undefined;
    }
  }

  async updateEmpresa(id: string, empresa: SolicitacaoInterface): Promise<void> {
    try {
      const empresaDocRef = doc(this.firestore, `empresas/${id}`);
      await setDoc(empresaDocRef, { ...empresa, userId: this.currentUserId }, { merge: true });
      this.toast.showToast('Atualizada', `A empresa ${empresa.empresa.ds_nome_fantasia ?? ''} foi atualizada com sucesso.`, 'success');
    } catch (error) {
      this.toast.showToast('Erro', 'Erro ao atualizar a empresa', 'error');
      console.error('Erro ao atualizar a empresa', error);
    }
  }

  async deleteEmpresa(id: string): Promise<void> {
    if (!id || id === '') {
      this.toast.showToast('Erro', `Identificador da empresa não encontrado.`, 'error');
      return;
    }
    try {
      const empresaDocRef = doc(this.firestore, `empresas/${id}`);
      await deleteDoc(empresaDocRef);
      this.toast.showToast('Excluida', `A empresa foi excluida com sucesso.`, 'success');
    } catch (error) {
      this.toast.showToast('Erro', 'Erro ao deletar a empresa', 'error');
      console.error('Erro ao deletar a empresa', error);
    }
  }


}
