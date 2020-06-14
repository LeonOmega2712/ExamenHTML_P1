import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { usuario, empleado } from '../shared/usuario.class';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-frm-main2',
  templateUrl: './frm-main2.page.html',
  styleUrls: ['./frm-main2.page.scss'],
})
export class FrmMain2Page implements OnInit {
  uid;
  u: usuario = new usuario();
  imagenDelEmpleado;
  imagenData;

  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private router: Router, private afAuth: AngularFireAuth, private fireSvc: AuthService, private camera: Camera) {}

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

  registrarEmpleado() {

  }

  abrirGaleria() {

  }

  abrirCamara() {
    this.imagenData = this.camera.getPicture(this.options).then((imagenData) => {
      this.imagenDelEmpleado = `data:image/jpeg;base64,${imagenData}`;
    });
  }

  onSalir() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/home');
    localStorage.removeItem('uid');
    localStorage.removeItem('correo');
  }
}
