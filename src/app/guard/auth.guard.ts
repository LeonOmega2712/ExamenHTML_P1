import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router'; // se declara el router en los imports

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) { // se agrega el router al constructor
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.afAuth.authState.pipe(map(
        auth => {
          if(isNullOrUndefined(auth)){
            this.router.navigateByUrl('/home'); // en la función de rechazar, se hace un ruteo hacia el modulo /home
            return false;
          } else {
            return true;
          }
        }
      ));
  }
}
