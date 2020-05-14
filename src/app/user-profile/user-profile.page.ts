import { Component, OnInit } from '@angular/core';
import { usuario } from '../shared/usuario.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user: usuario = new usuario();

  constructor(private authSvc: AuthService) { }

  ngOnInit() {

    // QUITAR LAS COMILLAS DEL STRINGIFY DE JSON
    this.user.uid = localStorage.getItem('uid');
    this.user.uid = this.user.uid.replace('"', '');
    this.user.uid = this.user.uid.replace('"', '');

    this.authSvc.getComodin('usuarios', this.user.uid).subscribe((data) => {
      if (data.payload.get('nombre') !== undefined) {
        this.user.nombre = data.payload.data()['nombre'];
        this.user.apellido = data.payload.data()['apellido'];
        this.user.sexo = data.payload.data()['sexo'];
      }
      this.user.correo = localStorage.getItem('correo');
      this.user.correo = this.user.correo.replace('"', '');
      this.user.correo = this.user.correo.replace('"', '');
    });


  }

  GuardarUsuario() {

  }
}
