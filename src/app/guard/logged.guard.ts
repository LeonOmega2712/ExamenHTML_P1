import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth'; // se agrega para hacer uso de logueo de firebase
import {map } from 'rxjs/operators'; // uso de procesos asíncronos y observables
// ↑↑↑ https://rxjs-dev.firebaseapp.com/guide/operators ↑↑↑
import { isNullOrUndefined } from 'util'; // para hacer uso de la funcion que menciona...
import { Router } from '@angular/router'; // se declara el router en los imports

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { // se agrega el router al constructor
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.afAuth.authState.pipe(map(
        auth => {
          if(auth){ // si está autenticado ...
            this.router.navigateByUrl('/tabs-page/frm-main'); // redirigelo de vuelta a frm-main
            return false;
          } else { // si no está autenticado...
            return true; // déjalo salir a home
          }
        }
      ));
  }
}
