import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-frm-main',
  templateUrl: './frm-main.page.html',
  styleUrls: ['./frm-main.page.scss'],
})
export class FrmMainPage implements OnInit {

  sonidos = [
    {
      nombre: 'Gong',
      audio: 'assets/sounds/Gong.wav',
      imagen: 'https://img.icons8.com/ios/100/000000/gong.png'
    },
    {
      nombre: 'Redoble',
      audio: 'assets/sounds/Redoble.wav',
      imagen: 'https://img.icons8.com/ios/100/000000/snare-drum.png'
    },
    {
      nombre: 'TrompetaEntrada',
      audio: 'assets/sounds/TrompetaEntrada.wav',
      imagen: 'https://img.icons8.com/ios/100/000000/trumpet.png'
    },
    {
      nombre: 'TrompetaSalida',
      audio: 'assets/sounds/TrompetaSalida.wav',
      imagen: 'https://img.icons8.com/ios/100/000000/herald-trumpet.png'
    }
  ];

  constructor(private router: Router, private afAuth: AngularFireAuth) { }
  ngOnInit() {
  }
  onSalir() {
    this.afAuth.auth.signOut();
    console.log('Se ha cerrado sesión');
    this.router.navigateByUrl('/home');
  }

  reproducirSonido(s) {
    let sonido = new Audio();
    sonido.src = s.audio;
    sonido.play();
  }

  abrirPerfil() {
    this.router.navigateByUrl('/user-profile');
  }

  editarCarta() {
    this.router.navigateByUrl('/card-editor');
  }
}
