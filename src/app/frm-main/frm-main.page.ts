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
  u: usuario = new usuario();

  coleccionUno = [];
  listaDeEmpleados = [];

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private fireSvc: AuthService
  ) {}

  ngOnInit() {
    // CARGAR TODOS LOS EMPLEADOS EN UNA LISTA Y LLENARLOS EN EL ION-SELECT
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

  onSalir() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/home');
  }
}
