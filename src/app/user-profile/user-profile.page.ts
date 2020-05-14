import { Component, OnInit } from '@angular/core';
import { usuario } from '../shared/usuario.class';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user: usuario = new usuario();

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {

    // QUITAR LAS COMILLAS DEL STRINGIFY DE JSON
    this.user.uid = localStorage.getItem('uid');
    this.user.uid = this.user.uid.replace('"', '');
    this.user.uid = this.user.uid.replace('"', '');
    this.authSvc.getComodin(this.user.uid, 'usuarios').subscribe((data) => {
      if (data.payload.get('nombre') !== undefined) {
        this.user.nombre = data.payload.data()['nombre'];
        this.user.apellido = data.payload.data()['apellido'];
        this.user.sexo = data.payload.data()['sexo'];
      }
      this.user.correo = localStorage.getItem('correo');
      this.user.correo = this.user.correo.replace('"', '');
      this.user.correo = this.user.correo.replace('"', '');
    });
    console.log(this.user.nombre + ' ' + this.user.apellido + ' ' + this.user.sexo + ' ');
  }

  GuardarUsuario() {
    let usuario = {};
    usuario['nombre'] = this.user.nombre;
    usuario['apellido'] = this.user.apellido;
    usuario['sexo'] = this.user.sexo;

    try {
      this.authSvc.actualizarUsuario(this.user.uid, usuario, 'usuarios');
      this.router.navigateByUrl('tabs-page/frm-main');
    } catch (e) {
      console.log(e);
    }
  }
  sexoChanged(event) {
    this.user.sexo = event.detail.value;
    console.log(this.user.nombre + ' ' + this.user.apellido + ' ' + this.user.sexo + ' ');
  }
}
