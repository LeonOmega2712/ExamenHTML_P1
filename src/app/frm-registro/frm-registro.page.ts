import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { usuario } from '../shared/usuario.class';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-frm-registro',
  templateUrl: './frm-registro.page.html',
  styleUrls: ['./frm-registro.page.scss']
})
export class FrmRegistroPage implements OnInit {
  user: usuario = new usuario();

  constructor(private authSvc: AuthService, private router: Router, private alertCon: AlertController) {}

  ngOnInit() {}

  async onRegistrar() {
    try {
      const user = await this.authSvc.onRegistrar(this.user);

      if (user) {
        const alert = await this.alertCon.create({
          header: 'Alert',
          message: 'Usuario registrado correctamente',
          buttons:['OK']
        });

        await alert.present();

        this.router.navigateByUrl('/');
      }
    } catch (e) {
      console.log('Error al dar de alta usuario', e);
    }
  }
}
