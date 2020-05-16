import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-frm-main',
  templateUrl: './frm-main.page.html',
  styleUrls: ['./frm-main.page.scss'],
})
export class FrmMainPage implements OnInit {
  // VARIABLES GLOBALES
  datos;
  global = [];
  paises = [];


  constructor(private router: Router, private afAuth: AngularFireAuth, private jsonProvider: JsonService) {}

  ngOnInit() {
    // OBTENER TODOS LOS PAISES DEL JSON Y GUARDARLOS EN UNA VARIABLE LOCAL
    this.cargarDatos();
  }

  // EJECUTAR LA FUNCIÓN DEL SERVICIO PARA TRAER LA LISTA DE DATOS Y SEPARARLOS POR PAÍS
  async cargarDatos() {
    this.jsonProvider.obtenerDatos().subscribe(
      (data) => {
        // TRAER TODOS LOS DATOS DE SUMMARY
        this.datos = data;
        console.log(this.datos);

        // SEPARAR LOS DATOS DE CADA PAIS EN LA LISTA PAISES
        this.datos['Countries'].forEach(element => {
          this.paises.push(element['Country']);
        });

        // SEPARAR LOS DATOS GLOBALES DEL RESTO
        this.global = this.datos['Global'];
        console.log(this.global['NewConfirmed']);


      },
      (error) => {
        console.log(error);
      }
    );
  }

  verEstadisticas(pais) {
    const contenido = `
      <ion-label>abr</ion-label>
    `;
  }

  // CERRAR SESIÓN EN FIREBASE
  onSalir() {
    this.afAuth.auth.signOut();
    console.log('Se ha cerrado sesión');
    this.router.navigateByUrl('/home');
  }
}
