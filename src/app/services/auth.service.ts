import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore/';
import { usuario } from '../shared/usuario.class';
import { AngularFireUploadTask, AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  public alertW: AlertController;
  constructor(public afAuth: AngularFireAuth, public afStore: AngularFirestore, public fireStorage: AngularFireStorage) {
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
    // SACATE A LA BERGA REGISTRO COCHINO
  }

  subirFotoEnFirebase(path, information, name): AngularFireUploadTask{
    console.log('funcion del servicio: ' + path + '---' + information + '---' + name);
    return this.fireStorage.ref('/' + path +  '/img/' + name).put(information);
  }

  subirAudioEnFirebase(path, information, name): AngularFireUploadTask{
    return this.fireStorage.ref('/' + path +  '/sound/' + name).put(information);
  }
  storeMetaInfoIm(metainfo,urlim,urlsound, tipo){
    let toSave= {
      fotoLink: urlim,
      audioLink: urlsound,
      nombre: metainfo.name
    }
    return this.afStore.collection(tipo).add(toSave);
  }


}
