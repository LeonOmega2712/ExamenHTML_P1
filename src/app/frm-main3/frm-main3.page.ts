import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { usuario } from '../shared/usuario.class';

@Component({
  selector: 'app-frm-main3',
  templateUrl: './frm-main3.page.html',
  styleUrls: ['./frm-main3.page.scss'],
})
export class FrmMain3Page implements OnInit {
  uid;
  u: usuario = new usuario();

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
    });
  }

  onSalir() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/home');
    localStorage.removeItem('uid');
    localStorage.removeItem('correo');
  }
}
