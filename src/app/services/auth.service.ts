import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { usuario } from '../shared/usuario.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  public alertW: AlertController;
  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(usuario => (this.isLogged = usuario));
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
}
