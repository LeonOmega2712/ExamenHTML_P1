import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore/';
import { usuario } from '../shared/usuario.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  public alertW: AlertController;
  constructor(public afAuth: AngularFireAuth, public afStore: AngularFirestore) {
    afAuth.authState.subscribe(usuario => (this.isLogged = usuario));
  }

  // TRAER UN REGISTRO DE UNA COLECCIÓN USANDO UN UID
  getComodin(id, coleccion) {
    return this.afStore.collection(coleccion).doc(id).snapshotChanges();
  }

  getTodoCollection(coleccion) {
    return this.afStore.collection(coleccion).snapshotChanges();
  }

  async onRegistrar(usuario: usuario) {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(
        usuario.correo,
        usuario.password
      );
    } catch (e) {
      const alert = await this.alertW.create({
        header: 'Error',
        message: 'Verifique que el correo sea correcto, y que la contraseña cuente con al menos 6 caracteres',
        buttons: ['OK']
      });

      await alert.present();

      // console.log('Ocurrió un error al registrarse', e);
    }
  }

  async onIniciar(usuario: usuario) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(
        usuario.correo,
        usuario.password
      );
    } catch (e) {

      const alert = await this.alertW.create({
        header: 'Error',
        message: 'Verifique su correo y contraseña',
        buttons: ['OK']
      });

      await alert.present();

      // console.log('No se logró iniciar sesión', e);
    }
  }

  borrarDeFirebase(obj, coleccion) {

  }
}
