import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: BehaviorSubject<UsuarioInterface | null> = new BehaviorSubject<UsuarioInterface | null>(null);

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private toast: ToastService,
    private route: Router
  ) {
    onAuthStateChanged(this.auth, (user): void => {
      void this.getFirebaseUserRef(user?.uid ?? null);
    });
  }

  async register(user: UsuarioInterface, senha: string): Promise<any> {
    if (!senha || senha.trim().length === 0) {
      return this.toast.showToast('Erro no cadastro', 'Senha não informada.', 'error');
    }
    try {
      this.user.next(null);
      const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, senha);
      const userId: string | undefined = userCredential.user?.uid;
      if (userId) {
        const userRef = doc(this.firestore, 'users', userId);
        await setDoc(userRef, { uid: userId, ...user });
        this.toast.showToast('Sucesso', `O usuário ${user.nome ?? ''} foi criado.`, 'success');
        void this.route.navigate(['/dashboard']);
      }
    } catch (error) {
      this.toast.showToast('Erro no cadastro', 'Ocorreu um erro no cadastro.', 'error');
      console.error('Erro no cadastro', error);
    }
  }

  async login(user: { email: string; senha: string }): Promise<any> {
    if (!user) {
      return this.toast.showToast('Erro no login', 'Credenciais não encontradas', 'error');
    }
    try {
      await signInWithEmailAndPassword(this.auth, user.email, user.senha);
      this.toast.showToast('Sucesso', `Login efetuado.`, 'success');
      void this.route.navigate(['/dashboard']);
    } catch (error) {
      this.toast.showToast('Erro no login', 'Ocorreu um erro ao tentar efetuar o login.', 'error');
      console.error('Erro no login', error);
    }
  }

  async getFirebaseUserRef(userId: string | null): Promise<void> {
    if (!userId) {
      return this.user.next(null);
    }
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const user: UsuarioInterface = docSnapshot.data() as UsuarioInterface;
        this.user.next(user);
      } else {
        this.user.next(null);
      }
    } catch (error) {
      this.user.next(null);
      console.error('Erro ao tentar buscar o usuário', error);
    }
  }
}
