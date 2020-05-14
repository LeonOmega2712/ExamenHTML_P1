import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { usuario } from '../shared/usuario.class';

@Component({
  selector: 'app-frm-main',
  templateUrl: './frm-main.page.html',
  styleUrls: ['./frm-main.page.scss'],
})
export class FrmMainPage implements OnInit {
  uid;
  u: usuario = new usuario();

  coleccionUno = [];

  constructor(private router: Router, private afAuth: AngularFireAuth, private fireSvc: AuthService) {}

  ngOnInit() {
    // CONSEGUIR EL UID DEL USUARIO Y QUITARLE LAS COMILLAS DE JSON.STRINGIFY
    this.uid = localStorage.getItem('uid');
    this.uid = this.uid.replace('"', '');
    this.uid = this.uid.replace('"', '');

    // COMRPOBAR EN FIREBASE SI EL USUARIO ACTUAL TIENE NOMBRE RESGITRADO
    this.fireSvc.getComodin(this.uid, 'usuarios').subscribe((result) => {
      if (result.payload.get('nombre') !== undefined) {
        this.u.nombre = result.payload.data()['nombre'];
      } else {
        this.u.nombre = '----------';
      }
      this.cargarColeccion();
    });
  }

  // TRAER TODOS LOS REGISTROS DE UNA COLECCIÓN, GUARDARLOS EN UN ARREGLO Y CARGARLO CON ngFor
  cargarColeccion() {
    this.fireSvc.getTodoCollection('coleccionUno').subscribe((data) => {
      this.coleccionUno = data.map((e) => {
        return {
          uid: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          foto: e.payload.doc.data()['fotoLink'],
          audio: e.payload.doc.data()['audioLink'],
        };
      });
    });
  }

  mouseArriba(obj) {
    this.coleccionUno.map(function(dato){
      if(dato === obj){
        dato.oculto = true;
      }
    });
  }

  mouseAfuera(obj) {
    this.coleccionUno.map(function(dato){
      if(dato === obj){
        dato.oculto = false;
      }
    });
  }

  onSalir() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/home');
    localStorage.removeItem('uid');
    localStorage.removeItem('correo');
  }

  reproducirSonido(s) {
    let sonido = new Audio();
    sonido.src = s.audio;
    sonido.play();
  }

  abrirPerfil() {
    this.router.navigateByUrl('/user-profile');
  }

  // BORRAR UN ELEMENTO DE FIREBASE
  borrarRegistro(obj) {
    this.fireSvc.borrarDeFirebase(obj, 'coleccionUno');
  }

}
