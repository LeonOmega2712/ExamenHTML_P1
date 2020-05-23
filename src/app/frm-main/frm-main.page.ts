import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { JsonService } from '../services/json.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-frm-main',
  templateUrl: './frm-main.page.html',
  styleUrls: ['./frm-main.page.scss'],
})
export class FrmMainPage implements OnInit {
  @ViewChild('barCanvas', null) barCanvas: ElementRef;
  // VARIABLES GLOBALES
  datos;
  globalazo = [];
  paises = [];
  quedateQuieto = [];
  actualizado;

  //#region chart.js
  barChart: Chart;
  chartType = 'bar';
  chartStructure = {
    type: this.chartType,
    data: {
      labels: ['Nuevos casos', 'Total casos', 'Nuevos decesos', 'Total decesos', 'Nuevos recuperados', 'Total recuperados'],
      datasets: [
        {
          label: '# Casos',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 3
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }


  //#endregion

  constructor(private router: Router, private afAuth: AngularFireAuth, private jsonProvider: JsonService) {}

  ngOnInit() {
    // OBTENER TODOS LOS PAISES DEL JSON Y GUARDARLOS EN UNA VARIABLE LOCAL
    this.cargarDatos();
    this.cargarGrafica();
  }

  cargarGrafica() {
    this.barChart = new Chart(this.barCanvas.nativeElement, this.chartStructure);
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
        this.globalazo = this.paises[0];
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

  tipoChart(tipo) {
    this.barChart.destroy();
    this.chartType = tipo;
    this.chartStructure.type = tipo;
    this.cargarGrafica();
  }
}
