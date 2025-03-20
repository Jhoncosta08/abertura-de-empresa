import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {BehaviorSubject} from 'rxjs';
import {UsuarioInterface} from '../../interfaces/usuario.interface';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {ToastService} from '../toast/toast.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: BehaviorSubject<UsuarioInterface | null> = new BehaviorSubject<UsuarioInterface | null>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private auth: Auth,
    private toast: ToastService,
    private route: Router
  ) {
    onAuthStateChanged(this.auth, (user: any): void => {
      console.log('Auth changed: ', user);
      void this.getFirebaseUserRef(user.providerData.uid ?? null);
    });
  }

  async register(user: UsuarioInterface): Promise<any> {
    if (!user.senha || user.senha.trim().length === 0) {
      return this.toast.showToast('Erro no cadastro', 'Senha de cadastro não encontrada.', 'error');
    }
    try {
      this.user.next(null);
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.senha);
      const userId: string | undefined = userCredential.user?.uid;
      await this.firestore.collection('users').doc(userId).set({uid: userId, ...user});
      this.toast.showToast('Sucesso', `O usuário ${user.nome ?? ''} foi criado.`, 'success');
      void this.route.navigate(['/dashboard']);
    } catch (error) {
      this.toast.showToast('Erro no cadastro', 'Ocorreu um erro no cadastro.', 'error');
      console.error('Erro no cadastro', error);
    }
  }

  async login(user: {email: string, senha: string}): Promise<any> {
    if (!user) {
      return this.toast.showToast('Erro no login', 'Credenciais não encontradas', 'error');
    }
    try {
      await this.afAuth.signInWithEmailAndPassword(user.email, user.senha);
      this.toast.showToast('Sucesso', `Login efetuado.`, 'success');
      void this.route.navigate(['/dashboard']);
    } catch (error) {
      this.toast.showToast('Erro no login', 'Ocorreu um erro ao tentar efetuar o login.', 'error');
      console.error('Erro no cadastro', error);
    }
  }

  async getFirebaseUserRef(userId: string | null): Promise<void> {
    if (!userId) {
      return this.user.next(null);
    }
    try {
      const userRef: AngularFirestoreDocument = this.firestore.collection('users').doc(userId);
      const user: UsuarioInterface = await userRef.get().toPromise().then((docSnapshot: any): UsuarioInterface => docSnapshot.data() as UsuarioInterface);
      this.user.next(user);
    } catch (error) {
      this.user.next(null);
      console.error('Erro ao tentar buscar o usuário', error);
    }
  }

}
