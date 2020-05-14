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
  constructor(private router: Router, private actRoute: ActivatedRoute, private authSvc: AuthService) { }

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

}
