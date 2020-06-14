import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { empleado } from '../shared/usuario.class';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-frm-main',
  templateUrl: './frm-main.page.html',
  styleUrls: ['./frm-main.page.scss'],
})
export class FrmMainPage implements OnInit {
  listaDeEmpleados = [];
  imagenDelEmpleado = 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Google_Camera_Icon.svg';
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private fireSvc: AuthService,
    private alertCon: AlertController
  ) {}

  ngOnInit() {
    // CARGAR TODOS LOS EMPLEADOS EN UNA LISTA Y LLENARLOS EN EL ION-SELECT
    this.cargarColeccion();
  }

  // TRAER TODOS LOS REGISTROS DE UNA COLECCIÓN, GUARDARLOS EN UN ARREGLO Y CARGARLO CON ngFor
  cargarColeccion() {
    this.fireSvc.getTodoCollection('empleados').subscribe((data) => {
      this.listaDeEmpleados = data.map((e) => {
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          apellido: e.payload.doc.data()['apellido'],
          correo: e.payload.doc.data()['correo'],
          fotoUrl: e.payload.doc.data()['fotoUrl'],
          objetivoDeVentas: e.payload.doc.data()['objetivoDeVentas'],
        };
      });
    });
  }

  onSalir() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/home');
  }

  cargarImagen(evento) {
    this.listaDeEmpleados.forEach((empleado) => {
      if (
        empleado['nombre'] + ' ' + empleado['apellido'] ===
        evento.target.value.trim()
      ) {
        this.imagenDelEmpleado = `${empleado['fotoUrl']}`;
      }
    });
  }
}
