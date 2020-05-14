import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { usuario } from '../shared/usuario.class';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: usuario = new usuario();

  constructor(private authSvc: AuthService, private router: Router, private alertCon: AlertController) {}

  async onIniciar() {
    try {
      const user = await this.authSvc.onIniciar(this.user);
      if (user) {
        localStorage.setItem('uid', JSON.stringify(user.user.uid));
        this.router.navigateByUrl('/tabs-page/frm-main');
      }
    } catch (e) {
      const alert = await this.alertCon.create({
        header: 'Error',
        message: 'Verifique su correo y contraseña',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
