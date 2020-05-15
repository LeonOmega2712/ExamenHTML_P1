import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore/';
import { usuario } from '../shared/usuario.class';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged: any = false;
  public alertW: AlertController;
  constructor(public afAuth: AngularFireAuth, public afStore: AngularFirestore, public fireStorage: AngularFireStorage) {
    afAuth.authState.subscribe((usuario) => (this.isLogged = usuario));
  }

  // TRAER UN REGISTRO DE UNA COLECCIÓN USANDO UN UID
  getComodin(id, coleccion) {
    return this.afStore.collection(coleccion).doc(id).snapshotChanges();
  }

  // HACER  UN UPDATE DE UN USUARIO, PUEDE USARSE PARA OTRA COLECCIÓN
  actualizarUsuario(uid, data, coleccion) {
    return this.afStore.collection(coleccion).doc(uid).set(data);
  }

  // TRAER TODOS LOS REGISTROS DE UNA COLECCIÓN DE FIREBASE, PUEDE USARSE PARA DISTINTAS COLECCIONES
  getTodoCollection(coleccion) {
    return this.afStore.collection(coleccion).snapshotChanges();
  }

  async onRegistrar(usuario: usuario) {
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(usuario.correo, usuario.password);
    } catch (e) {
      const alert = await this.alertW.create({
        header: 'Error',
        message: 'Verifique que el correo sea correcto, y que la contraseña cuente con al menos 6 caracteres',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  async onIniciar(usuario: usuario) {
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(usuario.correo, usuario.password);
    } catch (e) {
      const alert = await this.alertW.create({
        header: 'Error',
        message: 'Verifique su correo y contraseña',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  // BORRAR REGISTRO Y ARCHIVOS (AUDIO Y FOTO) DE FIREBASE
  borrarDeFirebase(obj, coleccion) {
    this.afStore.collection(coleccion).doc(obj.uid).delete();
    this.fireStorage.ref(coleccion + '/img/' + obj.nombre).delete();
    this.fireStorage.ref(coleccion + '/sound/' + obj.nombre).delete();
  }

  // SUBIR ARCHIVO DE FOTO A FIREBASE
  subirFotoEnFirebase(path, information, name): AngularFireUploadTask {
    return this.fireStorage.ref('/' + path + '/img/' + name).put(information);
  }

  // SUBIR ARCHIVO DE AUDIO A FIREBASE
  subirAudioEnFirebase(path, information, name): AngularFireUploadTask {
    return this.fireStorage.ref('/' + path + '/sound/' + name).put(information);
  }
  
  // ENLAZAR UN AUDIO Y FOTO EN UN REGISTRO DE FIREBASE
  storeMetaInfoIm(metainfo, urlim, urlsound, tipo) {
    let toSave = {
      fotoLink: urlim,
      audioLink: urlsound,
      nombre: metainfo.name,
    };
    return this.afStore.collection(tipo).add(toSave);
  }
}
