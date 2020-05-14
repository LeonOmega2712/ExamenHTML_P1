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
  idCarta;

  nombreCartaViejo;
  constructor(private router: Router, private actRoute: ActivatedRoute, private authSvc: AuthService) {}

  ngOnInit() {
    this.coleccion = this.actRoute.snapshot.paramMap.get('col');
    this.idCarta = this.actRoute.snapshot.paramMap.get('id');

    if (this.idCarta === 'Agregar') {
      // ESTO SE EJECUTA CUANDO ENTRAMOS A TRAVÉS DEL FAB
      this.titulo = this.idCarta;
    } else {
      // ESTO SE EJECUTA CUANDO ENTRAMOS A TRAVÉS DE EDITAR
      this.authSvc.getComodin(this.idCarta, this.coleccion).subscribe((data) => {
        this.nombreCarta = data.payload.data()['nombre'];
        this.nombreCartaViejo = this.nombreCarta;
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
    let datoGato  = [];
    datoGato['uid'] = this.idCarta;
    datoGato['nombre'] = this.nombreCartaViejo;
    if (this.idCarta !== 'Agregar') {
      this.authSvc.borrarDeFirebase(datoGato, this.coleccion);
    }
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
    this.router.navigateByUrl('tabs-page/frm-main');
  }
}
