import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { JsonService } from '../services/json.service';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-frm-main',
  templateUrl: './frm-main.page.html',
  styleUrls: ['./frm-main.page.scss'],
})
export class FrmMainPage implements OnInit {
  // VARIABLES GLOBALES
  datos;
  globalazo = [];
  paises = [];
  quedateQuieto = [];
  actualizado;

  //#region chart.js

  chartData: ChartDataSets[] = [{data:[], label:'COVID-19'}];

  chartLabels: Label[];

  chartType: 'line';

  chartColors: Color[] = [
    {
      borderColor: '#050505',
      backgroundColor: '#0f0f0f'
    }
  ];

  chartOptions={
    responsive : true,
    title:{
      display: true,
      text: 'Ejemplo grafica'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };

  //#endregion

  constructor(private router: Router, private afAuth: AngularFireAuth, private jsonProvider: JsonService) {}

  ngOnInit() {
    // OBTENER TODOS LOS PAISES DEL JSON Y GUARDARLOS EN UNA VARIABLE LOCAL
    this.cargarDatos();
  }

  // EJECUTAR LA FUNCIÓN DEL SERVICIO PARA TRAER LA LISTA DE DATOS Y SEPARARLOS POR PAÍS
  async cargarDatos() {
    this.jsonProvider.obtenerDatos().subscribe(
      (data) => {
        // TRAER TODOS LOS DATOS DE LA API/SUMMARY
        this.datos = data;
        this.actualizado = data['Date'];
        this.paises.push(data['Global']);
        this.paises[0]['Country']= 'Global';
        // SEPARAR LOS DATOS DE CADA PAIS EN LA LISTA PAISES
        this.datos['Countries'].forEach((element) => {
          this.paises.push(element);
        });

        // SEPARAR LOS DATOS GLOBALES DEL RESTO
        // this.quedateQuieto = this.datos['Global'];
        this.globalazo =this.paises[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // CARGAR LAS ESTADÍSTICAS DE UN PAÍS SELECCIONADO DE LA LISTA
  verEstadisticas(evento) {
    if (evento.target.value.trim() === 'Global') { // CUANDO SELECCIONA GLOBAL DE VUELTA
      console.log(this.paises[0]);
      this.globalazo = this.paises[0];
    } else {
      // CUANDO SELECCIONA UN PAIS
      this.paises.forEach((element) => {
        if (element.Country === evento.target.value.trim()) {
          this.globalazo = element;
        }
      });
    }
  }

  // CERRAR SESIÓN EN FIREBASE
  onSalir() {
    this.afAuth.auth.signOut();
    console.log('Se ha cerrado sesión');
    this.router.navigateByUrl('/home');
  }
}
