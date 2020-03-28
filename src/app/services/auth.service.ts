import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { usuario } from '../shared/usuario.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(usuario => (this.isLogged = usuario));
  }

  async onRegistrar(usuario: usuario) {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(usuario.correo, usuario.password);
    } catch (e) {
      console.log('Ocurrió un error al registrarse', e);
    }
  }

  async onIniciar(usuario: usuario) {
    try {
    return await this.afAuth.auth.signInWithEmailAndPassword(usuario.correo, usuario.password);
    } catch (e) {
    console.log("No se logró iniciar sesión", e);
    }
  }

}
