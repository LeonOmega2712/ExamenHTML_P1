import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { empleado } from '../shared/usuario.class';
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

  ngOnInit() {}

  async registrarEmpleado() {
    const nombreDeFoto = `${this.empleado.correo}_${this.empleado.nombre}_${this.empleado.apellido}`;

    let subirIm = this.fireSvc.subirFotoEnFirebase(
      'empleados',
      this.imagenData,
      nombreDeFoto
    );
    await subirIm.then((res) => {
      res.ref.getDownloadURL().then(async (url) => {
        this.empleado.fotoUrl = url;
        this.empleado.objetivoDeVenta = '0';
        this.fireSvc.guardarEmpleadoCompletoEnfireabse(this.empleado);
        const alert = await this.alertCon.create({
          header: 'Se ha registrado al empleado',
          subHeader:
            'Puede asignar el objetivo de venta en la pestaña de ventas',
          message: `<b>Nombre:</b><br>${this.empleado.nombre}<br><br>
          <b>Apellido:</b><br>${this.empleado.apellido}<br><br>
          <b>Correo:</b><br>${this.empleado.correo}<br><br>`,
          buttons: ['Entendido'],
        });
        await alert.present();
        this.empleado = new empleado();
        this.imagenDelEmpleado =
          'https://upload.wikimedia.org/wikipedia/commons/f/f8/Google_Camera_Icon.svg';
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
  }
}
