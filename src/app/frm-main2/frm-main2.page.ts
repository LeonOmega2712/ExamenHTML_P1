import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { usuario, empleado } from '../shared/usuario.class';
import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-frm-main2',
  templateUrl: './frm-main2.page.html',
  styleUrls: ['./frm-main2.page.scss'],
})
export class FrmMain2Page implements OnInit {
  uid;
  u: usuario = new usuario();
  imagenDelEmpleado =
    'https://upload.wikimedia.org/wikipedia/commons/f/f8/Google_Camera_Icon.svg';
  imagenData;
  empleado: empleado = new empleado();

  options: CameraOptions = {
    quality: 50,
    sourceType: PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };

  gallery: CameraOptions = {
    quality: 50,
    sourceType: PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private fireSvc: AuthService,
    private camera: Camera,
    private alertCon: AlertController
  ) {}

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

  async registrarEmpleado() {
    let nombreDeFoto = `${this.empleado.correo}_${this.empleado.nombre}_${this.empleado.apellido}`;

    const alert = await this.alertCon.create({
      header: 'Debuggeando',
      message: `${nombreDeFoto}`,
      buttons: ['OK'],
    });
    await alert.present();

    let subirIm = this.fireSvc.subirFotoEnFirebase(
      'empleados',
      this.imagenData,
      nombreDeFoto
    );
    await subirIm.then((res) => {
      res.ref.getDownloadURL().then((url) => {
        this.empleado.fotoUrl = url;
        this.empleado.objetivoDeVenta = '0';
        this.fireSvc.guardarEmpleadoCompletoEnfireabse(this.empleado);
      });
    });
  }

  abrirGaleria() {
    this.camera.getPicture(this.gallery).then((imagenData) => {
      this.imagenDelEmpleado = `data:image/jpeg;base64,${imagenData}`;
      this.imagenData = imagenData;
    });
  }

  abrirCamara() {
    this.camera.getPicture(this.options).then((imagenData) => {
      this.imagenDelEmpleado = `data:image/jpeg;base64,${imagenData}`;
      this.imagenData = imagenData;
    });
  }

  onSalir() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/home');
    localStorage.removeItem('uid');
    localStorage.removeItem('correo');
  }
}
