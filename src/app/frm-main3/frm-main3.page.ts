import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { empleado } from '../shared/usuario.class';
import { Chart } from 'chart.js';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-frm-main3',
  templateUrl: './frm-main3.page.html',
  styleUrls: ['./frm-main3.page.scss'],
})
export class FrmMain3Page implements OnInit {
  @ViewChild('barCanvas', null) barCanvas: ElementRef;
  barChart: Chart;
  listaDeEmpleados = [];
  nombres = [];
  objetivos = [];

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private fireSvc: AuthService,
    private alertCon: AlertController
  ) {}

  async ngOnInit() {
    await this.cargarColeccion();

  }

  cargarGrafica(nombres, objetivos) {
    if (this.barChart !== undefined) {
      this.barChart.destroy();
    }
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: nombres,
        datasets: [
          {
            label: 'Objetivo de venta',
            data: objetivos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  cargarColeccion() {
    this.fireSvc.getTodoCollection('empleados').subscribe((data) => {
      this.listaDeEmpleados = data.map((e) => {
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          apellido: e.payload.doc.data()['apellido'],
          correo: e.payload.doc.data()['correo'],
          fotoUrl: e.payload.doc.data()['fotoUrl'],
          objetivoDeVenta: e.payload.doc.data()['objetivoDeVenta'],
        };
      });
      this.nombres = [];
      this.objetivos = [];
      this.listaDeEmpleados.forEach(empleado => {
        this.nombres.push(empleado['nombre']);
        this.objetivos.push(empleado['objetivoDeVenta']);
      });
      this.cargarGrafica(this.nombres, this.objetivos);
    });
  }

  onSalir() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/home');
    localStorage.removeItem('uid');
    localStorage.removeItem('correo');
  }
}
