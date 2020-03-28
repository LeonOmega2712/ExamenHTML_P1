import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-frm-main2',
  templateUrl: './frm-main2.page.html',
  styleUrls: ['./frm-main2.page.scss'],
})
export class FrmMain2Page implements OnInit {
  sonidos = [
    {
      nombre: 'Coin',
      audio: 'assets/sounds/COIN.mp3',
      imagen: 'https://lh3.googleusercontent.com/proxy/L78UqfGleDpc5BAEHvnU9WDEsKVxHOEEM3ng5Nlepy0qQWex7aAazUlR9sIID7-brUj6jHHn5w7D5WaV56k'
    },
    {
      nombre: 'HMG',
      audio: 'assets/sounds/HMG.mp3',
      imagen: 'https://thumbs.gfycat.com/GrizzledHollowLadybird-size_restricted.gif'
    },
    {
      nombre: 'MC',
      audio: 'assets/sounds/MC.mp3',
      imagen: 'https://rs529.pbsrc.com/albums/dd335/Assassin_SoulDagger/Metal%20Slug/007.gif~c200'
    },
    {
      nombre: 'TY',
      audio: 'assets/sounds/TY.mp3',
      imagen: 'https://files.gamebanana.com/img/ico/sprays/prisoner-big.gif'
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
}
