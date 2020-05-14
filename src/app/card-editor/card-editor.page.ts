import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.page.html',
  styleUrls: ['./card-editor.page.scss'],
})
export class CardEditorPage implements OnInit {
  coleccion: any;
  titulo = 'Modificar';
  nombreCarta;
  fotoLink;

  fotoFile;
  audioFile;

  constructor(private router: Router, private actRoute: ActivatedRoute, private authSvc: AuthService) {}

  ngOnInit() {
    this.coleccion = this.actRoute.snapshot.paramMap.get('col');
    let id = this.actRoute.snapshot.paramMap.get('id');

    if (id === 'Agregar') {
      // ESTO SE EJECUTA CUANDO ENTRAMOS A TRAVÉS DEL FAB
      this.titulo = id;
    } else {
      // ESTO SE EJECUTA CUANDO ENTRAMOS A TRAVÉS DE EDITAR
      this.authSvc.getComodin(id, this.coleccion).subscribe((data) => {
        this.nombreCarta = data.payload.data()['nombre'];
        this.fotoLink = data.payload.data()['fotoLink'];
      });
    }
  }

  cargarFoto(event) {
    if (event.target.files.length > 0) {
      this.fotoFile = event.target.files[0];
    }
  }

  cargarAudio(event) {
    if (event.target.files.length > 0) {
      this.audioFile = event.target.files[0];
    }
  }

  async wardiola() {
    let urlimagen;
    console.log(this.nombreCarta);
    let subirIm = this.authSvc.subirFotoEnFirebase(this.coleccion, this.fotoFile, this.nombreCarta);
    await subirIm.then((res) => {
      res.ref.getDownloadURL().then((url) => {
        urlimagen = url;
      });
    });
    let subirAu = this.authSvc.subirAudioEnFirebase(this.coleccion, this.audioFile, this.nombreCarta);
    await subirAu.then((res) => {
      res.ref.getDownloadURL().then((url) => {
        this.authSvc.storeMetaInfoIm(res.metadata, urlimagen, url, this.coleccion).then(() => {});
      });
    });
  }
}
