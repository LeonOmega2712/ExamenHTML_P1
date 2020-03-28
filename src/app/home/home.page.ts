import { Component } from '@angular/core';
import  { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { usuario } from '../shared/usuario.class';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: usuario = new usuario();

  constructor(private authSvc: AuthService, private router: Router) {}

  async onIniciar(){
    const user = await this.authSvc.onIniciar(this.user)
    
    if (user) {
      console.log("Sesion iniciada con exito");
      this.router.navigateByUrl('/frm-main');
    }
  }
}
