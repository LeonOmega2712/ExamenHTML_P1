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
  constructor(private router: Router, private actRoute: ActivatedRoute, private authSvc: AuthService) { }

  ngOnInit() {
    this.coleccion = this.actRoute.snapshot.paramMap.get('col');
    let id = this.actRoute.snapshot.paramMap.get('id');

    if (id === 'Agregar') {
      this.titulo = id;
    }

  }

}
